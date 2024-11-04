import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// import multer from "multer";
import database from "./app/routes/database.ts";
import register from "./app/routes/register.ts";
// const upload = multer({ dest: "uploads/" });
import log_in from "./app/routes/log_in.ts";

const app = express();

database.startConnection();

app.use(bodyParser.json());
app.use(cors());

app.post("/check-autorization", (req, res) => {
    console.log(req.body);
    res.send(JSON.stringify({ siema: "lol" }));
});

app.post("/log-in", log_in);

app.post("/register", register);

app.listen(8000, () => {
    console.log("Server started");
});
