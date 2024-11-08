import Express from "express";
import database from "../utils/database";
import { TypedRequestBody } from "../utils/TypedRequestBody";
import CreateNoteStatus from "../utils/CreateNoteStatus";
import SessionStatus from "../utils/SessionStatus";

export default async function create_note(
    request: TypedRequestBody<{
        session_id: string;
        note_title: string;
        note_content: string;
    }>,
    response: Express.Response
) {
    if (
        typeof request.body.session_id !== "string" ||
        typeof request.body.note_title !== "string" ||
        typeof request.body.note_content !== "string"
    ) {
        response.send({ success: false, code: CreateNoteStatus.InvalidData });
        return;
    }

    var session_id = request.body.session_id;
    var note_title = request.body.note_title;
    var note_content = request.body.note_content;

    switch (await database.checkSession(session_id, request.ip!)) {
        case SessionStatus.SessionExpired:
            database.deleteSession(session_id);
            response.send({
                success: false,
                code: CreateNoteStatus.AuthorizationFailed,
            });
            return;
        case SessionStatus.SessionInvalid:
            response.send({
                success: false,
                code: CreateNoteStatus.AuthorizationFailed,
            });
            return;
        case SessionStatus.DatabaseError:
            response.send({
                success: false,
                code: CreateNoteStatus.DatabaseError,
            });
            return;
    }
    const userData = await database.getUserFromSession(session_id);

    if (userData == null) {
        response.send({
            success: false,
            code: CreateNoteStatus.DatabaseError,
        });
        return;
    }

    var noteID = await database.createNote(note_title, note_content);
    if (noteID == null) {
        response.send({
            success: false,
            code: CreateNoteStatus.DatabaseError,
        });
        return;
    }

    if (await database.setNoteOwner(noteID, userData.id)) {
        response.send({
            success: true,
            code: CreateNoteStatus.Yupii,
            data: {
                noteID: noteID,
            },
        });
        return;
    } else {
        response.send({
            success: false,
            code: CreateNoteStatus.DatabaseError,
        });
        return;
    }
}
