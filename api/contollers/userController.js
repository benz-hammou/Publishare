

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