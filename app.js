const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const mainRouter = require("./routes");
const cardRoutes = require("./routes/cards");

app.use(mainRouter);
app.use("/cards", cardRoutes);

app.use('/static', express.static("public"));

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render("error", err);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
