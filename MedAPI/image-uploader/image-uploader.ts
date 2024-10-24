const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());

const uploadDir = "../lancet-app/public/Avatars";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname); // Get the file extension
    const fileName = req.params.id + fileExtension; // Use `id` from the URL as the filename
    cb(null, fileName); // Save the file with the name: {id}.{extension}
  },
});

const upload = multer({ storage: storage });

app.post("/nserver/avatar/:id", upload.single("avatar"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const filePath = path.join(uploadDir, req.file.filename);
  res
    .status(200)
    .send({ message: "File uploaded successfully", filePath: filePath });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
