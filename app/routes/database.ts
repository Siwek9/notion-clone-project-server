import mysql from "mysql";
import UserData from "../utils/UserData";
import AddUserStatus from "../utils/AddUserStatus";

var connection: mysql.Connection;
var connected = false;

export default {
    startConnection() {
        connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "notion_clone_project",
        });

        connection.connect(function (err) {
            if (err) {
                throw err;
            } else {
                console.log("Connected with database.");
                connected = true;
            }
        });
    },
    // addNewUser(
    //     login: string,
    //     email: string,
    //     password: string,
    //     repeatedPassword: string
    // ): boolean {

    //     return true;
    // },
    // ifUserExists(login: string, email): boolean {
    //     var query = `SELECT COUNT(*) FROM users WHERE name = '${login}' or email = '${email}'`;
    //     return true;
    // },
    async getUserData(
        loginOrEmail: string,
        passwordSHA256: string
    ): Promise<null | UserData> {
        return new Promise(async (resolve) => {
            if (!connected) return resolve(null);

            var query = `SELECT * FROM users WHERE (name = ${connection.escape(
                loginOrEmail
            )} or email = '${loginOrEmail}') and password = '${passwordSHA256}'`;

            connection.query(query, (err, result) => {
                if (err) {
                    console.log("database error");
                    console.log(err);
                    return resolve(null);
                }

                if (result?.length == 0) {
                    return resolve(null);
                }

                const data = result[0];

                var userData = new UserData(
                    data["name"],
                    data["email"],
                    data["profile_picture"],
                    data["description"]
                );
                return resolve(userData);
            });
        });
    },
};
