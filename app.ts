import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import database from "./app/utils/database.ts";
import register from "./app/routes/register.ts";
import log_in from "./app/routes/log_in.ts";
import log_out from "./app/routes/log_out.ts";
import check_session from "./app/routes/check_session.ts";
import create_note from "./app/routes/create_note.ts";
import get_notes from "./app/routes/get_notes.ts";

const app = express();

database.startConnection();

app.use(bodyParser.json());
app.use(cors());

app.post("/create-note", create_note);

app.post("/get-notes", get_notes);
app.post("/read-note", () => {});
app.post("/delete-note", () => {});
app.post("/get-profile-data", () => {});

app.post("/check-session", check_session);

app.post("/log-in", log_in);

app.post("/register", register);

app.post("/log-out", log_out);

app.listen(8000, "0.0.0.0", () => {
    console.log("Server started");
});
