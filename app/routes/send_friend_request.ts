import Express from "express";
import database from "../utils/database";
import { TypedRequestBody } from "../utils/TypedRequestBody";
import SessionStatus from "../statuses/SessionStatus";
import SendFriendRequestStatus from "../statuses/SendFriendRequestStatus";
// import GetNotesStatus from "../statuses/GetNotesStatus";

export default async function send_friend_request(
    request: TypedRequestBody<{
        session_id: string;
        loginOrEmail: string;
    }>,
    response: Express.Response
) {
    if (
        typeof request.body.session_id !== "string" ||
        typeof request.body.loginOrEmail !== "string"
    ) {
        response.send({
            success: false,
            code: SendFriendRequestStatus.InvalidData,
        });
        return;
    }

    const session_id = request.body.session_id;

    switch (await database.checkSession(session_id, request.ip!)) {
        case SessionStatus.SessionExpired:
            database.deleteSession(session_id);
            response.send({
                success: false,
                code: SendFriendRequestStatus.AuthorizationFailed,
            });
            return;
        case SessionStatus.SessionInvalid:
            response.send({
                success: false,
                code: SendFriendRequestStatus.AuthorizationFailed,
            });
            return;
        case SessionStatus.DatabaseError:
            response.send({
                success: false,
                code: SendFriendRequestStatus.DatabaseError,
            });
            return;
    }

    const userData = await database.getUserFromSession(session_id);

    if (userData == null) {
        response.send({
            success: false,
            code: SendFriendRequestStatus.DatabaseError,
        });
        return;
    }

    const userToSendRequest = await database.getUserData(
        request.body.loginOrEmail
    );

    if (userToSendRequest == null) {
        response.send({
            success: true,
            code: SendFriendRequestStatus.Yupii,
        });
        return;
    }

    await database.sendFriendRequest(userData.id, userToSendRequest.id);
}
