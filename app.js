const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.get("/", (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.render("index", { name });
  } else {
    res.redirect("/hello");
  }
});

app.get("/cards", (req, res) => {
  res.render("cards", {
    prompt: "Who is buried in Grant's tomb?",
    hint: "Think about whose tomb it is.",
  });
});

app.get("/hello", (req, res) => {
  if (req.cookies.username) {
    res.redirect("/");
  } else {
    res.render("hello");
  }
});

app.post("/hello", (req, res) => {
  res.cookie("username", req.body.username);
  res.redirect("/");
});

app.post("/goodbye", (req, res) => {
    res.clearCookie("username");
    res.redirect("/hello");
});

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});


app.use ((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render("error", err)
  
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
