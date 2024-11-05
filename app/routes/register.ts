import Express from "express";
import AddUserStatus from "../utils/AddUserStatus";
import database from "../utils/database";
import { encode } from "html-entities";
import { TypedRequestBody } from "../utils/TypedRequestBody";
import crypto from "crypto";
import UserData from "../utils/UserData";
import bigosRecipe from "../utils/bigosRecipe";

export default async function register(
    request: TypedRequestBody<{
        login: string;
        email: string;
        password: string;
        repeatPassword: string;
    }>,
    response: Express.Response
) {
    if (
        typeof request.body.login !== "string" ||
        typeof request.body.email !== "string" ||
        typeof request.body.password !== "string" ||
        typeof request.body.repeatPassword !== "string"
    ) {
        response.send({ success: false, code: AddUserStatus.InvalidData });
        return;
    }

    if (request.body.password !== request.body.repeatPassword) {
        response.send({
            success: false,
            code: AddUserStatus.PasswordsNotTheSame,
        });
        return;
    }

    var loginRegex = /([A-Za-z0-9_]){5,30}/g;
    var login = encode(request.body.login);
    if (!loginRegex.test(login)) {
        response.send({ success: false, code: AddUserStatus.NameInvalid });
        return;
    }

    var emailRegex =
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;
    var email = encode(request.body.email);
    if (!emailRegex.test(email)) {
        response.send({ success: false, code: AddUserStatus.EmailInvalid });
        return;
    }

    var passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/g;
    var password = request.body.password;
    if (!passwordRegex.test(password)) {
        response.send({ success: false, code: AddUserStatus.PasswordInvalid });
        return;
    }

    var check = await database.isEmailUsed(email);
    if (check == null) {
        response.send({ success: false, code: AddUserStatus.DatabaseError });
        return;
    }
    if (check) {
        response.send({ success: false, code: AddUserStatus.EmailInUse });
        return;
    }

    var check = await database.isLoginUsed(login);
    if (check == null) {
        response.send({ success: false, code: AddUserStatus.DatabaseError });
        return;
    }
    if (check) {
        response.send({ success: false, code: AddUserStatus.NameInUse });
        return;
    }

    var passwordSHA256 = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");

    var newUser = await database.addNewUser(login, email, passwordSHA256);
    if (newUser == null) {
        response.send({ success: false, code: AddUserStatus.DatabaseError });
        return;
    }

    var note_id = await database.createNote(bigosRecipe);
    if (note_id != null) {
        database.setNoteOwner(note_id, newUser.id);
    }

    var session_id = database.startNewSession(newUser!.id, request.ip);

    response.send({
        success: true,
        code: AddUserStatus.Yupii,
        data: {
            session_id: session_id,
        },
    });
}
