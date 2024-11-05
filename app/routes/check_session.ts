import Express from "express";
import database from "../utils/database";
import { TypedRequestBody } from "../utils/TypedRequestBody";
import SessionStatus from "../utils/SessionStatus";

export default async function check_session(
    request: TypedRequestBody<{
        session_id: string;
    }>,
    response: Express.Response
) {
    if (typeof request.body.session_id !== "string") {
        response.send({ success: false, code: SessionStatus.SessionInvalid });
        return;
    }
    var session_status = await database.checkSession(
        request.body.session_id,
        request.ip
    );
    switch (session_status) {
        case 0:
            await database.renewSession(request.body.session_id);
            response.send({
                success: true,
                code: SessionStatus.Yupii,
            });
            return;
        case SessionStatus.SessionExpired:
            await database.deleteSession(request.body.session_id);
            response.send({
                success: false,
                code: SessionStatus.SessionExpired,
            });
            return;
        case SessionStatus.SessionInvalid:
            response.send({
                success: false,
                code: SessionStatus.SessionInvalid,
            });
            return;
        case SessionStatus.DatabaseError:
            response.send({
                success: false,
                code: SessionStatus.DatabaseError,
            });
            return;
    }
}
