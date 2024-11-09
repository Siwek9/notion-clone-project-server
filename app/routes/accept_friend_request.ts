import Express from "express";
import database from "../utils/database";
import { TypedRequestBody } from "../utils/TypedRequestBody";
import SessionStatus from "../statuses/SessionStatus";
import AcceptFriendRequestStatus from "../statuses/AcceptFriendRequestStatus";

export default async function send_friend_request(
    request: TypedRequestBody<{
        session_id: string;
        request_id: string;
    }>,
    response: Express.Response
) {
    if (
        typeof request.body.session_id !== "string" ||
        typeof request.body.request_id !== "string"
    ) {
        response.send({
            success: false,
            code: AcceptFriendRequestStatus.InvalidData,
        });
        return;
    }

    const session_id = request.body.session_id;

    switch (await database.checkSession(session_id, request.ip!)) {
        case SessionStatus.SessionExpired:
            database.deleteSession(session_id);
            response.send({
                success: false,
                code: AcceptFriendRequestStatus.AuthorizationFailed,
            });
            return;
        case SessionStatus.SessionInvalid:
            response.send({
                success: false,
                code: AcceptFriendRequestStatus.AuthorizationFailed,
            });
            return;
        case SessionStatus.DatabaseError:
            response.send({
                success: false,
                code: AcceptFriendRequestStatus.DatabaseError,
            });
            return;
    }

    const userData = await database.getUserFromSession(session_id);

    if (userData == null) {
        response.send({
            success: false,
            code: AcceptFriendRequestStatus.DatabaseError,
        });
        return;
    }

    const friendRequest = await database.getFriendRequest(
        request.body.request_id
    );

    if (friendRequest == null) {
        response.send({
            success: false,
            code: AcceptFriendRequestStatus.DatabaseError,
        });
        return;
    }

    if (friendRequest.receiverID != userData.id) {
        response.send({
            success: false,
            code: AcceptFriendRequestStatus.AuthorizationFailed,
        });
        return;
    }

    if (!(await database.addFriend(friendRequest.inviterID, userData.id))) {
        response.send({
            success: false,
            code: AcceptFriendRequestStatus.DatabaseError,
        });
        return;
    } else {
        response.send({
            success: true,
            code: AcceptFriendRequestStatus.Yupii,
        });
        return;
    }
}
