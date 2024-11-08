import Express from "express";
import database from "../utils/database";
import LogoutStatus from "../utils/LogoutStatus";
import { TypedRequestBody } from "../utils/TypedRequestBody";

export default async function log_out(
    request: TypedRequestBody<{
        session_id: string;
    }>,
    response: Express.Response
) {
    console.log(request.body);
    if (typeof request.body.session_id !== "string") {
        response.send({ success: false, code: LogoutStatus.DatabaseError });
        return;
    }

    const session_id = request.body.session_id;

    if (await database.deleteSession(session_id)) {
        response.send({
            success: true,
            code: LogoutStatus.Yupii,
        });
    } else {
        response.send({
            success: false,
            code: LogoutStatus.DatabaseError,
        });
        return;
    }
}
