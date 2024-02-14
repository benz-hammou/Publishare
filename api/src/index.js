const express = require("express");
const cors = require("cors");
const connectDb = require("../config/dbConnect");
const user = require("../models/user");
const post = require("../models/post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var multer = require("multer");
var upload = multer({
  limits: {
    fieldNameSize: 25 * 1024 * 1024,
    fieldSize: 25 * 1024 * 1024,
  },
});
const imageService = require("./services/imagesService");
const PostModel = require("../models/post");

const salt = bcrypt.genSaltSync(10);
const secret = "jlchzihcighipefpzeghp";

connectDb();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    credentials: true,
    origin: ["https://front-gffr.onrender.com", "http://localhost:3000"],
  })
);
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));
app.use(upload.array());

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
    console.log(username, password);
    const userDoc = await user.findOne({ username });
    const passwordOk = bcrypt.compareSync(password, userDoc.password);
    if (passwordOk) {
      jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
        if (err) throw err;
        res.json({
          id: userDoc._id,
          username,
          token,
        });
      });
    } else {
      res.status(401).json("wrong credentials (unauthorize)");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET USER
app.get("/profile", (req, res) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.split(" ")?.[1];
    console.log(typeof token);
    if (token === "null") {
      res.status(401);
      console.log("no token");
      return res.end();
    } else {
      console.log(token);
      jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// LOGOUT USER
app.post("/logout", (req, res) => {
  res.json("ok");
});

// CREATE NEW POST
app.post("/post", async (req, res) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.split(" ")?.[1];
    if (!token) {
      res.status(401);
      return res.end();
    } else {
      console.log(token);
      jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { title, content, summary, file, filename, category } = req.body;
        const imageRespons = await imageService.upload(filename, file);
        const postDoc = await post.create({
          title,
          content,
          summary,
          category,
          cover: imageRespons,
          author: info.id,
        });
        res.json(postDoc);
      });
    }
  } catch (err) {
    const { token } = req.headers;
    console.log(token);
    res.status(500).json(err);
  }
});

// UPDATE POST
app.put("/post", async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.split(" ")?.[1];
  console.log(token);
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content, file, filename, category } = req.body;
    const postDoc = await post.findById(id);
    const coverName = postDoc.cover.split("/")[4];
    let imageRespons;
    if (file) {
      imageRespons = await imageService.upload(filename, file);
      await imageService.remove(coverName);
    }

    const isAutor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAutor) {
      return res.status(400).json("You are not the author");
    }
    await postDoc.updateOne({
      title,
      category,
      summary,
      content,
      cover: imageRespons ? imageRespons : postDoc.cover,
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
  const postDoc = await post.findById(id);
  const coverName = postDoc.cover.split("/")[4];
  await imageService.remove(coverName);
  await post.deleteOne({ _id: id });
  res.end();
});

app.listen(PORT, console.log(`Server is running at ${PORT}`));
