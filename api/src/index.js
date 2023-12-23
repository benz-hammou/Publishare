const express = require("express");
const cors = require("cors");
const connectDb = require("../config/dbConnect")
const user = require("../models/user");
const post = require("../models/post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: 'dist/uploads/' });
const fs = require("fs");
const PostModel = require("../models/post");
const path = require('path')

const salt = bcrypt.genSaltSync(10);
const secret = "jlchzihcighipefpzeghp";

connectDb()
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ credentials: true, origin: ["https://front-gffr.onrender.com", 'http://localhost:3000'] }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))



// REGISTER USER
app.post("/register", async (req, res) => {
  const { username, password /* , email */ } = req.body;
  try {
    const userDoc = await user.create({
      username,
      // email,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN USER
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await user.findOne({ username });
    const passwordOk = bcrypt.compareSync(password, userDoc.password);
    if (passwordOk) {
      // logged in

      // code pas bien compris !
      jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
        if (err) throw err;

        res.cookie("token", token, {sameSite: "none", secure: true}).json({
          id: userDoc._id,
          username,
        });
      });
    } else {
      res.status(401).json("wrong credentials (unauthorize)");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

// LOGOUT USER
app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

// CREATE NEW POST
app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  if (!token) {
    res.status(401)
    res.end()
  }

  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, content, summary /* category */ } = req.body;
    const postDoc = await post.create({
      title,
      content,
      summary,
      // category,
      cover: newPath,
      author: info.id,
    });

    res.json(postDoc);
  });
});

// UPDATE POST
app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;
    const postDoc = await post.findById(id);
    const isAutor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAutor) {
      return res.status(400).json("you are not the author");
    }
    await postDoc.updateOne({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });
    res.json(postDoc);
  });
});

// GET ALL POST
app.get("/post", async (req, res) => {
  try {
    res.json(
      await PostModel.find().populate("author").sort({ createAt: -1 }).limit(99)
    );
  } catch (error) {
    console.log(error);
  }
});

// GET ONE POST
app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await post.findById(id).populate("author");
  res.json(postDoc);
});

// DELETE POST
app.delete("/post/:id", async (req, res) => {
  const { id } = req.params;
  await post.deleteOne({ _id: id });
  res.end();
});

app.listen(PORT, console.log(`Server is running at ${PORT}`));
