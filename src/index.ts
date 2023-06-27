import Joi from "joi";
import helmet from "helmet";

const express = require("express");
const morgan = require("morgan");
const config = require("config");
const genres = require("./routes/genres");
const home = require("./routes/home");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // render the static file into the browser, for that we have to pass "folderName" as a params
app.use(helmet());
app.use("/api/genres", genres);
app.use("/", home);

//set the PUG into the enviroment
app.set("view engine", "pug");
app.set("views", "./views");

//Configuration
console.log("App name : " + config.get("name"));
console.log("Mail server : " + config.get("mail.host"));
console.log("Mail password : " + config.get("mail.password"));

// run this command `export NODE_ENV=production` to set env as a "production" its by default "development"
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan added...");
}

app.listen(3000, () => console.log(`Listening on port 3000...`));
