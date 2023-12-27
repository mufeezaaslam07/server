const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const session = require("express-session");

const configurePassport = require("./config/passport");

dotenv.config();
const passport = require("passport");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
configurePassport();

// Routes
app.use("/api/auth", authRoutes);

app.get("/main", (req, res) => {
  res.send("Deplyment successfull");
});

// Protected routes
app.use(
  "/api/tasks",
  passport.authenticate("jwt", { session: false }),
  taskRoutes
);

mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

const PORT = 5800;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
