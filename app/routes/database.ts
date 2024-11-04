import mysql from "mysql";
import crypto from "crypto";
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
    async startNewSession(
        user_id: number,
        ip_address: string
    ): Promise<string | null> {
        return new Promise(async (resolve) => {
            if (!connected) return resolve(null);

            var query = `DELETE FROM user_session WHERE ip_address = '${ip_address}'`;
            connection.query(query, (err) => {
                if (err) {
                    console.log("database error");
                    console.log(err);
                    return resolve(null);
                }
                const id = crypto.randomUUID();

                var date = new Date();
                date.setDate(date.getDate() + 1);

                var query = `INSERT INTO user_session VALUES ('${id}', '${ip_address}', ${user_id}, '${date
                    .toISOString()
                    .slice(0, 19)
                    .replace("T", " ")}')`;

                connection.query(query, (err) => {
                    if (err) {
                        console.log("database error");
                        console.log(err);
                        return resolve(null);
                    }
                    return resolve(id);
                });
            });
        });
    },
    async checkSession(
        session_id: string,
        ip_adress: string
    ): Promise<boolean> {
        return new Promise(async (resolve) => {});
    },
    async deleteSession(session_id: string): Promise<boolean> {
        return new Promise(async (resolve) => {
            if (!connected) return resolve(false);

            var query = `DELETE FROM user_session WHERE session_id = ${connection.escape(
                session_id
            )}`;

            connection.query(query, (err) => {
                if (err) {
                    console.log("database error");
                    console.log(err);
                    return resolve(false);
                }
                return resolve(true);
            });
        });
    },
    async addNewUser(
        login: string,
        email: string,
        passwordSHA256: string
    ): Promise<boolean> {
        return new Promise(async (resolve) => {
            if (!connected) return resolve(false);

            var query = `INSERT INTO users(name, email, password) VALUES (${connection.escape(
                login
            )},${connection.escape(email)},'${passwordSHA256}')`;

            connection.query(query, (err) => {
                if (err) {
                    console.log("database error");
                    console.log(err);
                    return resolve(false);
                }
                return resolve(true);
            });
        });
    },
    async isEmailUsed(email: string): Promise<boolean | null> {
        return new Promise(async (resolve) => {
            if (!connected) return resolve(null);

            var query = `SELECT COUNT(*) AS amount FROM users WHERE email = ${connection.escape(
                email
            )}`;

            connection.query(query, (err, result) => {
                if (err) {
                    console.log("database error");
                    console.log(err);
                    return resolve(null);
                }

                if (result?.length == 0) {
                    return resolve(null);
                } else {
                    if (result[0]["amount"] > 0) {
                        return resolve(true);
                    } else {
                        return resolve(false);
                    }
                }
            });
            // return true;
        });
    },
    async isLoginUsed(login: string): Promise<boolean | null> {
        return new Promise(async (resolve) => {
            if (!connected) return resolve(null);

            var query = `SELECT COUNT(*) FROM users WHERE name = ${connection.escape(
                login
            )}`;

            connection.query(query, (err, result) => {
                if (err) {
                    console.log("database error");
                    console.log(err);
                    return resolve(null);
                }

                if (result?.length == 0) {
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            });
            // return true;
        });
    },
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
                    data["id"],
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
