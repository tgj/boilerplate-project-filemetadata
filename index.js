var express = require("express");
var cors = require("cors");
require("dotenv").config();
const fs = require("fs");

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

const upload = require("./middleware/upload");

app.post("/api/fileanalyse", upload.single("upfile"), async (req, res) => {
  try {
    const { filename, originalname, mimetype, size } = req.file;
    const path = __dirname + "/uploads/" + filename;
    fs.unlinkSync(path);
    console.log(`Removed file at path: ${path}`);
    res.json({
      name: originalname,
      type: mimetype,
      size: size,
    });
  } catch (err) {
    console.error(err);
    res.json({ error });
  }
});

app.get("/health", (_, res) => {
  res.status(200).send("Ok");
});
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
