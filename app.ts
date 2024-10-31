import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/check-autorization", (req, res) => {
  console.log(req.body);
  res.send(JSON.stringify({ siema: "lol" }));
});

app.get("/", (req, res) => {
  res.send("loool");
});

app.listen(8000, () => {
  console.log("Server started");
});
