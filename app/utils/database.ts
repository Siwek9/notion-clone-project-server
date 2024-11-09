import mysql from "mysql";
import crypto from "crypto";
import UserData from "./UserData";
import SessionStatus from "../statuses/SessionStatus";
import Note from "./Note";
import NoteOwnership from "./NoteOwnership";
import FriendRequest from "./FriendRequest";

let connection: mysql.Connection;
let connected = false;

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
    async getFriends(user_id: number): Promise<Array<{
        name: string;
        profile_picture: string;
    }> | null> {
        return new Promise((resolve) => {
            if (!connected) return resolve(null);
            const query = `SELECT name, profile_picture FROM users WHERE id IN (SELECT user1_id FROM user_friends WHERE user2_id = ${user_id}) OR id IN (SELECT user2_id FROM user_friends WHERE user1_id = ${user_id})`;
            connection.query(query, (err, result) => {
                if (err) {
                    console.log("database error");
                    console.log(err);
                    return resolve(null);
                }

                if (result.lenght == 0) {
                    return resolve(null);
                }

                const toReturn = Array<{
                    name: string;
                    profile_picture: string;
                }>();
                result.forEach(
                    (element: { name: string; profile_picture: string }) => {
                        toReturn.push(element);
                    }
                );
                return resolve(result);
            });
        });
    },
    async getUsersFromFriendRequest(receiver_id: number): Promise<Array<{
        name: string;
        profile_picture: string;
        request_id: string;
    }> | null> {
        return new Promise((resolve) => {
            if (!connected) return resolve(null);
            const query = `SELECT users.name, users.profile_picture, request.request_id FROM users, (SELECT id AS request_id, user_inviting_id FROM friend_requests WHERE user_receiving_id = ${receiver_id}) AS request WHERE users.id = request.user_inviting_id`;
            connection.query(query, (err, result) => {
                if (err) {
                    console.log("database error");
                    console.log(err);
                    return resolve(null);
                }

                if (result.lenght == 0) {
                    return resolve(null);
                }

                const toReturn = Array<{
                    name: string;
                    profile_picture: string;
                    request_id: string;
                }>();
                result.forEach(
                    (element: {
                        name: string;
                        profile_picture: string;
                        request_id: string;
                    }) => {
                        toReturn.push(element);
                    }
                );
                return resolve(result);
            });
        });
    },
    async addFriend(user1_id: number, user2_id: number): Promise<boolean> {
        return new Promise((resolve) => {
            if (!connected) return resolve(false);

            const id = crypto.randomUUID();

            const query = `INSERT INTO friend_requests VALUES ('${id}',${user1_id},${user2_id})`;
            connection.query(query, (err) => {
                if (err) {
                    console.log("database error");
                    console.log(err);
                    return resolve(false);
                } else {
                    return resolve(true);
                }
            });
        });
    },
    async getFriendRequest(request_id: string): Promise<FriendRequest | null> {
        return new Promise((resolve) => {
            if (!connected) return resolve(null);
            const query = `SELECT * FROM friend_requests WHERE id = ${connection.escape(
                request_id
            )};`;
            connection.query(query, (err, result) => {
                if (err) {
                    console.log("database error");
                    console.log(err);
                    return resolve(null);
                }

                const content: {
                    id: string;
                    user_inviting_id: number;
                    user_receiving_id: number;
                    send_time: string;
                } = result[0];

                console.log(content);
                const friendRequest = new FriendRequest(
                    content.id,
                    content.user_inviting_id,
                    content.user_receiving_id,
                    content.send_time
                );

                return friendRequest;
            });
        });
    },
    async sendFriendRequest(
        user_inviting_id: number,
        user_receiving_id: number
    ): Promise<boolean> {
        return new Promise((resolve) => {
            if (!connected) return resolve(false);

            const id = crypto.randomUUID();
            const date = new Date();

            const formatedDate = date
                .toISOString()
                .slice(0, 19)
                .replace("T", " ");

            const query = `INSERT INTO friend_requests VALUES ('${id}',${user_inviting_id},${user_receiving_id},'${formatedDate}')`;
            connection.query(query, (err) => {
                if (err) {
                    console.log("database error");
                    console.log(err);
                    return resolve(false);
                } else {
                    return resolve(true);
                }
            });
        });
    },
    async checkNoteOwnerShip(
        user_id: number,
        note_id: string
    ): Promise<NoteOwnership | null> {
        return new Promise((resolve) => {
            if (!connected) return resolve(null);
            const query = `SELECT owner, can_modify FROM user_note_relations WHERE id_user = ${user_id} AND id_note = ${connection.escape(
                note_id
            )}`;
            connection.query(query, (err, result) => {
                if (err) {
                    console.log("database error");
                    console.log(err);
                    return resolve(null);
                } else {
                    if (result.length == 0) {
                        return resolve(NoteOwnership.CannotAnything);
                    } else {
                        if (result[0]["owner"]) {
                            return resolve(NoteOwnership.Owner);
                        } else if (result[0]["can_modify"]) {
                            return resolve(NoteOwnership.CanWrite);
                        } else {
                            return resolve(NoteOwnership.CanRead);
                        }
                    }
                }
            });
        });
    },
    async setNoteOwner(note_id: string, user_id: number): Promise<boolean> {
        return new Promise((resolve) => {
            if (!connected) return resolve(false);
            const query = `INSERT INTO user_note_relations(id_user, id_note, owner, can_modify) VALUES (${user_id},${connection.escape(
                note_id
            )},1,1)`;
            connection.query(query, (err) => {
                if (err) {
                    console.log("database error");
                    console.log(err);
                    return resolve(false);
                } else {
                    return resolve(true);
                }
            });
        });
    },
    async createNote(
        noteTitle: string,
        noteContent: string
    ): Promise<string | null> {
        return new Promise((resolve) => {
            if (!connected) return resolve(null);

            const id = crypto.randomUUID();
            const date = new Date();

            const formatedDate = date
                .toISOString()
                .slice(0, 19)
                .replace("T", " ");

            const query = `INSERT INTO notes VALUES ('${id}', ${connection.escape(
                noteTitle
            )}, ${connection.escape(
                noteContent
            )}, '${formatedDate}', '${formatedDate}')`;

            connection.query(query, (err) => {
                if (err) {
                    console.log("database error");
                    console.log(err);
                    return resolve(null);
                } else {
                    return resolve(id);
                }
            });
        });
    },
    async getNoteContent(noteID: string): Promise<string | null> {
        return new Promise((resolve) => {
            if (!connected) return resolve(null);
            const query = `SELECT content FROM notes WHERE id = ${connection.escape(
                noteID
            )}`;
            connection.query(query, (err, result) => {
                if (err) {
                    console.log("database error");
                    console.log(err);
                    return resolve(null);
                }

                if (result.length == 0) {
                    return resolve(null);
                } else {
                    return resolve(result[0]["content"]);
                }
            });
        });
    },
    async modifyNote(noteID: string, noteContent: string): Promise<boolean> {
        return new Promise((resolve) => {
            if (!connected) return resolve(false);

            const date = new Date();

            const formatedDate = date
                .toISOString()
                .slice(0, 19)
                .replace("T", " ");

            const query = `UPDATE notes SET content='${noteContent}', modification_time='${formatedDate}' WHERE id='${noteID}'`;

            connection.query(query, (err) => {
                if (err) {
                    console.log("database error");
                    console.log(err);
                    return resolve(false);
                } else {
                    return resolve(true);
                }
            });
        });
    },
    // async deleteNote(noteID: string) {
    //     return new Promise(async (resolve) => {
    //         if (!connected) return resolve(false);
    //     });
    // },
    async getNotes(userID: number): Promise<Array<Note> | null> {
        return new Promise((resolve) => {
            if (!connected) return resolve(null);
            const query = `SELECT id, title, create_time, modification_time FROM notes WHERE id IN (SELECT id_note FROM user_note_relations WHERE id_user = ${userID});`;
            connection.query(query, (err, result) => {
                if (err) {
                    console.log("database error");
                    console.log(err);
                    return resolve(null);
                }

                const toReturn = Array<Note>();
                result.forEach(
                    (element: {
                        id: string;
                        title: string;
                        create_time: string;
                        modification_time: string;
                    }) => {
                        toReturn.push(
                            new Note(
                                element.id,
                                element.title,
                                element.create_time,
                                element.modification_time,
                                undefined
                            )
                        );
                    }
                );
                return resolve(toReturn);
            });
        });
    },
    async startNewSession(
        user_id: number,
        ip_address: string
    ): Promise<string | null> {
        return new Promise((resolve) => {
            if (!connected) return resolve(null);

            const query = `DELETE FROM user_session WHERE ip_address = '${ip_address}'`;
            connection.query(query, (err) => {
                if (err) {
                    console.log("database error");
                    console.log(err);
                    return resolve(null);
                }
                const id = crypto.randomUUID();

                const date = new Date();
                date.setDate(date.getDate() + 1);

                const query = `INSERT INTO user_session VALUES ('${id}', '${ip_address}', ${user_id}, '${date
                    .toISOString()
                    .slice(0, 19)
                    .replace("T", " ")}')`;

                connection.query(query, (err) => {
                    if (err) {
                        console.log("database error");
                        console.log(err);
                        return resolve(null);
                    } else {
                        return resolve(id);
                    }
                });
            });
        });
    },
    async renewSession(session_id: string): Promise<void> {
        return new Promise((resolve) => {
            if (!connected) return resolve();

            const date = new Date();
            date.setDate(date.getDate() + 1);

            const query = `UPDATE user_session SET expiration_date = '${date
                .toISOString()
                .slice(0, 19)
                .replace("T", " ")}' WHERE session_id = ${connection.escape(
                session_id
            )}`;

            connection.query(query, (err) => {
                if (err) {
                    console.log("database error");
                    console.log(err);
                }
                return resolve();
            });
        });
    },
    async checkSession(
        session_id: string,
        ip_adress: string
    ): Promise<SessionStatus> {
        return new Promise((resolve) => {
            if (!connected) return resolve(SessionStatus.DatabaseError);

            const query = `SELECT * FROM user_session WHERE session_id = ${connection.escape(
                session_id
            )} AND ip_address = '${ip_adress}'`;

            connection.query(query, (err, result) => {
                if (err) {
                    console.log("database error");
                    console.log(err);
                    return resolve(SessionStatus.DatabaseError);
                }
                if (result.length == 0) {
                    return resolve(SessionStatus.SessionInvalid);
                } else {
                    const expirationDate = new Date(
                        result[0]["expiration_date"]
                    );
                    const dateNow = new Date();
                    if (expirationDate < dateNow) {
                        return resolve(SessionStatus.SessionExpired);
                    } else {
                        return resolve(SessionStatus.Yupii);
                    }
                }
            });
            return resolve(SessionStatus.Yupii);
        });
    },
    async deleteSession(session_id: string): Promise<boolean> {
        return new Promise((resolve) => {
            if (!connected) return resolve(false);

            const query = `DELETE FROM user_session WHERE session_id = ${connection.escape(
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
    ): Promise<UserData | null> {
        return new Promise((resolve) => {
            if (!connected) return resolve(null);
            let query = `INSERT INTO users(name, email, password) VALUES (${connection.escape(
                login
            )},${connection.escape(email)},'${passwordSHA256}')`;

            connection.query(query, (err) => {
                if (err) {
                    console.log("database error");
                    console.log(err);
                    return resolve(null);
                }

                query = `SELECT * FROM users WHERE name=${connection.escape(
                    login
                )}`;
                connection.query(query, (err, result) => {
                    if (err) {
                        console.log("database error");
                        console.log(err);
                        return resolve(null);
                    }

                    if (result.length == 0) {
                        return resolve(null);
                    }

                    const data = result[0];
                    const userData = new UserData(
                        data["id"],
                        data["name"],
                        data["email"],
                        data["profile_picture"],
                        data["description"]
                    );
                    return resolve(userData);
                });
            });
        });
    },
    async isEmailUsed(email: string): Promise<boolean | null> {
        return new Promise((resolve) => {
            if (!connected) return resolve(null);

            const query = `SELECT COUNT(*) AS amount FROM users WHERE email = ${connection.escape(
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
        return new Promise((resolve) => {
            if (!connected) return resolve(null);

            const query = `SELECT COUNT(*) FROM users WHERE name = ${connection.escape(
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
    async getUserFromSession(session_id: string): Promise<null | UserData> {
        return new Promise((resolve) => {
            if (!connected) return resolve(null);
            const query = `SELECT * FROM users WHERE id = (SELECT user_id FROM user_session WHERE session_id = ${connection.escape(
                session_id
            )})`;

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

                const userData = new UserData(
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
    async getUserData(loginOrEmail: string): Promise<null | UserData> {
        return new Promise((resolve) => {
            if (!connected) return resolve(null);

            const query = `SELECT * FROM users WHERE (name = ${connection.escape(
                loginOrEmail
            )} or email = ${connection.escape(loginOrEmail)})`;

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

                const userData = new UserData(
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
    async getUserDataWithPassword(
        loginOrEmail: string,
        passwordSHA256: string
    ): Promise<null | UserData> {
        return new Promise((resolve) => {
            if (!connected) return resolve(null);

            const query = `SELECT * FROM users WHERE (name = ${connection.escape(
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

                const userData = new UserData(
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
