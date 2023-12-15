const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const user = require("./models/user");
const post = require("./models/post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");
const PostModel = require("./models/post");

const salt = bcrypt.genSaltSync(10);
const secret = "jlchzihcighipefpzeghp";

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose.connect(
  "mongodb+srv://mohamedbenhammo:admin@mycluster.oz2pupu.mongodb.net/?retryWrites=true&w=majority"
);

// REGISTER
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

// LOGIN
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
        res.cookie("token", token).json;
        res.cookie("token", token).json({
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

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

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
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, content, summary, /* category */ } = req.body;
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

app.get("/post", async (req, res) => {
  try {
    res.json(
      await PostModel.find().populate("author").sort({ createAt: -1 }).limit(20)
    );
  } catch (error) {
    console.log(error);
  }
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await post.findById(id).populate("author");
  res.json(postDoc);
});

app.delete("/post/:id", async (req, res) => {
  const { id } = req.params;
  await post.deleteOne({ _id: id });
  res.end();
});

app.listen(4000);
