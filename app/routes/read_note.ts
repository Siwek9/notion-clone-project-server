import Express from "express";
import database from "../utils/database";
import { encode } from "html-entities";
import { TypedRequestBody } from "../utils/TypedRequestBody";
import crypto from "crypto";
import SessionStatus from "../utils/SessionStatus";
import ReadNoteStatus from "../utils/ReadNoteStatus";

export default async function read_note(
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
        response.send({ success: false, code: ReadNoteStatus.InvalidData });
        return;
    }

    var session_id = request.body.session_id;
    var node_id = request.body.note_id;

    switch (await database.checkSession(session_id, request.ip)) {
        case SessionStatus.SessionExpired:
            database.deleteSession(session_id);
            response.send({
                success: false,
                code: ReadNoteStatus.AuthorizationFailed,
            });
            return;
        case SessionStatus.SessionInvalid:
            response.send({
                success: false,
                code: ReadNoteStatus.AuthorizationFailed,
            });
            return;
        case SessionStatus.DatabaseError:
            response.send({
                success: false,
                code: ReadNoteStatus.DatabaseError,
            });
            return;
    }

    const userData = await database.getUserFromSession(session_id);

    if (userData == null) {
        response.send({
            success: false,
            code: ReadNoteStatus.DatabaseError,
        });
        return;
    }

    var note = await database.getNoteContent(node_id);

    if (note == null) {
        response.send({
            success: false,
            code: ReadNoteStatus.DatabaseError,
        });
        return;
    } else {
        response.send({
            success: true,
            code: ReadNoteStatus.Yupii,
            data: {
                noteContent: note,
            },
        });
        return;
    }
}
