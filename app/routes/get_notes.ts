import Express from "express";
import database from "../utils/database";
import { TypedRequestBody } from "../utils/TypedRequestBody";
import SessionStatus from "../statuses/SessionStatus";
import GetNotesStatus from "../statuses/GetNotesStatus";

export default async function get_notes(
    request: TypedRequestBody<{
        session_id: string;
    }>,
    response: Express.Response
) {
    if (typeof request.body.session_id !== "string") {
        response.send({ success: false, code: GetNotesStatus.InvalidData });
        return;
    }

    const session_id = request.body.session_id;

    switch (await database.checkSession(session_id, request.ip!)) {
        case SessionStatus.SessionExpired:
            database.deleteSession(session_id);
            response.send({
                success: false,
                code: GetNotesStatus.AuthorizationFailed,
            });
            return;
        case SessionStatus.SessionInvalid:
            response.send({
                success: false,
                code: GetNotesStatus.AuthorizationFailed,
            });
            return;
        case SessionStatus.DatabaseError:
            response.send({
                success: false,
                code: GetNotesStatus.DatabaseError,
            });
            return;
    }

    const userData = await database.getUserFromSession(session_id);

    if (userData == null) {
        response.send({
            success: false,
            code: GetNotesStatus.DatabaseError,
        });
        return;
    }

    const notes = await database.getNotes(userData.id);

    if (notes == null) {
        response.send({
            success: false,
            code: GetNotesStatus.DatabaseError,
        });
        return;
    } else {
        response.send({
            success: true,
            code: GetNotesStatus.Yupii,
            data: {
                notes: notes,
            },
        });
        return;
    }
}
