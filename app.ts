import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// import multer from "multer";
import database from "./app/routes/database.ts";
import register from "./app/routes/register.ts";
// const upload = multer({ dest: "uploads/" });
import log_in from "./app/routes/log_in.ts";
import log_out from "./app/routes/log_out.ts";

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

app.post("/log-out", log_out);

app.listen(8000, "0.0.0.0", () => {
    console.log("Server started");
});
