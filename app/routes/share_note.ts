import Express from "express";
import database from "../utils/database";
import { TypedRequestBody } from "../utils/TypedRequestBody";
import ShareNoteStatus from "../statuses/ShareNoteStatus";
import SessionStatus from "../statuses/SessionStatus";
import ShareMode from "../utils/ShareMode";

export default async function share_note(
    request: TypedRequestBody<{
        session_id: string;
        friend_name: string;
        note_id: string;
        share_mode: ShareMode;
    }>,
    response: Express.Response
) {
    if (
        typeof request.body.session_id !== "string" ||
        typeof request.body.friend_name !== "string" ||
        typeof request.body.note_id !== "string"
    ) {
        response.send({ success: false, code: ShareNoteStatus.InvalidData });
        return;
    }

    const session_id = request.body.session_id;
    const friend_name = request.body.friend_name;
    const note_id = request.body.note_id;
    const share_mode = request.body.share_mode;

    switch (await database.checkSession(session_id, request.ip!)) {
        case SessionStatus.SessionExpired:
            database.deleteSession(session_id);
            response.send({
                success: false,
                code: ShareNoteStatus.AuthorizationFailed,
            });
            return;
        case SessionStatus.SessionInvalid:
            response.send({
                success: false,
                code: ShareNoteStatus.AuthorizationFailed,
            });
            return;
        case SessionStatus.DatabaseError:
            response.send({
                success: false,
                code: ShareNoteStatus.DatabaseError,
            });
            return;
    }
    const userData = await database.getUserFromSession(session_id);

    if (userData == null) {
        response.send({
            success: false,
            code: ShareNoteStatus.DatabaseError,
        });
        return;
    }

    const friends = await database.getFriends(userData.id);
    if (friends == null) {
        response.send({
            success: false,
            code: ShareNoteStatus.DatabaseError,
        });
        return;
    }

    if (friends.some((friend) => friend.name != friend_name)) {
        response.send({
            success: false,
            code: ShareNoteStatus.AuthorizationFailed,
        });
        return;
    }

    const friend_data = await database.getUserData(friend_name);
    if (friend_data == null) {
        response.send({
            success: false,
            code: ShareNoteStatus.AuthorizationFailed,
        });
        return;
    }

    if (
        await database.giveUserNotePrivilages(
            friend_data.id,
            note_id,
            share_mode
        )
    ) {
        response.send({
            success: true,
            code: ShareNoteStatus.Yupii,
        });
        return;
    } else {
        response.send({
            success: false,
            code: ShareNoteStatus.DatabaseError,
        });
        return;
    }
}
