import Express from "express";
import LoginStatus from "../utils/LoginStatus";
import database from "./database";
import { encode } from "html-entities";
import { TypedRequestBody } from "../utils/TypedRequestBody";
import crypto from "crypto";

export default async function log_in(
    request: TypedRequestBody<{
        loginOrEmail: string;
        password: string;
    }>,
    response: Express.Response
) {
    console.log(request.body);
    if (
        typeof request.body.loginOrEmail !== "string" ||
        typeof request.body.password !== "string"
    ) {
        response.send({ success: false, code: LoginStatus.InvalidData });
        return;
    }

    var loginOrEmail = encode(request.body.loginOrEmail);
    var passwordSHA256 = crypto
        .createHash("sha256")
        .update(request.body.password)
        .digest("hex");

    const userData = await database.getUserData(loginOrEmail, passwordSHA256);
    if (userData == null) {
        response.send({
            success: false,
            code: LoginStatus.InvalidData,
        });
        return;
    }
    var session_id = await database.startNewSession(userData!.id, request.ip);

    response.send({
        success: true,
        code: LoginStatus.Yupii,
        data: {
            session_id: session_id,
        },
    });
}
