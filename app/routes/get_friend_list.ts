import Express from "express";
import database from "../utils/database";
import { TypedRequestBody } from "../utils/TypedRequestBody";
import SessionStatus from "../statuses/SessionStatus";
import GetFriendListStatus from "../statuses/GetFriendListStatus";

export default async function get_profile_data(
    request: TypedRequestBody<{
        session_id: string;
    }>,
    response: Express.Response
) {
    if (typeof request.body.session_id !== "string") {
        response.send({
            success: false,
            code: GetFriendListStatus.InvalidData,
        });
        return;
    }

    const session_id = request.body.session_id;

    switch (await database.checkSession(session_id, request.ip!)) {
        case SessionStatus.SessionExpired:
            database.deleteSession(session_id);
            response.send({
                success: false,
                code: GetFriendListStatus.AuthorizationFailed,
            });
            return;
        case SessionStatus.SessionInvalid:
            response.send({
                success: false,
                code: GetFriendListStatus.AuthorizationFailed,
            });
            return;
        case SessionStatus.DatabaseError:
            response.send({
                success: false,
                code: GetFriendListStatus.DatabaseError,
            });
            return;
    }

    const userData = await database.getUserFromSession(session_id);

    if (userData == null) {
        response.send({
            success: false,
            code: GetFriendListStatus.DatabaseError,
        });
        return;
    }

    const friends = await database.getFriends(userData.id);
    console.log(friends);
    response.send({
        success: true,
        code: GetFriendListStatus.Yupii,
        data: {
            friends: friends,
        },
    });
    return;
}
