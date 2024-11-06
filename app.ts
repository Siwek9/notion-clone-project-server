import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";
import EditNotesHandler from "./app/utils/EditNotesHandler";
import database from "./app/utils/database";
import register from "./app/routes/register";
import log_in from "./app/routes/log_in";
import log_out from "./app/routes/log_out";
import check_session from "./app/routes/check_session";
import create_note from "./app/routes/create_note";
import get_notes from "./app/routes/get_notes";
import read_note from "./app/routes/read_note";

const app = express();
app.use(cors());
app.use(bodyParser.json());
const server = createServer(app);

database.startConnection();

const io = new Server(server, {
    cors: {},
});

io.on("connection", (socket) => {
    console.log("start connection");
    socket.on("open_note", (session_id, note_id) =>
        EditNotesHandler.onOpenNote(io, socket, session_id, note_id)
    );
    socket.on("edit_note", (session_id, note_id, note_content) =>
        EditNotesHandler.onNoteEdited(
            io,
            socket,
            session_id,
            note_id,
            note_content
        )
    );
    socket.on("close_note", (session_id, note_id) =>
        EditNotesHandler.onCloseNote(io, socket, session_id, note_id)
    );
});

setInterval(EditNotesHandler.saveToDatabase, 10000);

app.post("/create-note", create_note);

app.post("/get-notes", get_notes);
app.post("/read-note", read_note);
app.post("/delete-note", () => {});
app.post("/get-profile-data", () => {});

app.post("/check-session", check_session);

app.post("/log-in", log_in);

app.post("/register", register);

app.post("/log-out", log_out);

server.listen(8000, "0.0.0.0", () => {
    console.log("Server started");
});
