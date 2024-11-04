import AddUserStatus from "../utils/AddUserStatus";
import { TypedRequestBody } from "../utils/TypedRequestBody";

function ValidateUserData(): AddUserStatus {
    return AddUserStatus.Yupii;
}

export default function register(
    request: TypedRequestBody<{
        login: string;
        email: string;
        password: string;
        repeatPassword: string;
    }>,
    response: Express.Response
) {
    if (
        typeof request.body.login === "string" &&
        typeof request.body.email === "string" &&
        typeof request.body.password === "string" &&
        typeof request.body.repeatPassword === "string"
    ) {
    }
}
