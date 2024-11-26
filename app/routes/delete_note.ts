import Express from "express";
import database from "../utils/database";
import { TypedRequestBody } from "../utils/TypedRequestBody";
import CreateNoteStatus from "../statuses/CreateNoteStatus";
import SessionStatus from "../statuses/SessionStatus";
import NoteOwnership from "../utils/NoteOwnership";

export default async function delete_note(
    request: TypedRequestBody<{
        session_id: string;
        note_id: string;
    }>,
    response: Express.Response
) {
    if (
        typeof request.body.session_id !== "string" ||
        typeof request.body.note_id !== "string"
    ) {
        response.send({ success: false, code: CreateNoteStatus.InvalidData });
        return;
    }

    const session_id = request.body.session_id;
    const note_id = request.body.note_id;

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

    const ownership = await database.checkNoteOwnerShip(userData.id, note_id);

    if (ownership != NoteOwnership.Owner) {
        response.send({
            success: false,
            code: CreateNoteStatus.AuthorizationFailed,
        });
        return;
    }

    if (!(await database.deleteNote(note_id))) {
        response.send({
            success: false,
            code: CreateNoteStatus.DatabaseError,
        });
        return;
    }
    response.send({
        success: true,
        code: CreateNoteStatus.Yupii,
    });
    return;

    // const noteID = await database.createNote(note_title, note_content);
    // if (noteID == null) {
    //     response.send({
    //         success: false,
    //         code: CreateNoteStatus.DatabaseError,
    //     });
    //     return;
    // }

    // if (await database.setNoteOwner(noteID, userData.id)) {
    //     response.send({
    //         success: true,
    //         code: CreateNoteStatus.Yupii,
    //         data: {
    //             noteID: noteID,
    //         },
    //     });
    //     return;
    // } else {
    //     response.send({
    //         success: false,
    //         code: CreateNoteStatus.DatabaseError,
    //     });
    //     return;
    // }
}
