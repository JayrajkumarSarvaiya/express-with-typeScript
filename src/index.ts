import Joi from "joi";
const express = require("express");
const morgan = require("morgan");
import helmet from "helmet";
const config = require("config");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // render the static file into the browser, for that we have to pass "folderName" as a params

app.use(helmet());

//Configuration
console.log("App name : " + config.get("name"));
console.log("Mail server : " + config.get("mail.host"));
console.log("Mail password : " + config.get("mail.password"));

// run this command `export NODE_ENV=production` to set env as a "production" its by default "development"
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan added...");
}

interface Genre {
  id: number;
  name: string;
}

const genres: Genre[] = [
  { id: 1, name: "Action" },
  { id: 2, name: "Romance" },
  { id: 3, name: "Horror" },
];

function validateGenre(genre: any) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(genre);
}

//get API
app.get("/api/genres", (req: any, res: any) => {
  res.send(genres);
});

//post API
app.post("/api/genres", (req: any, res: any) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const gener: Genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(gener);
  res.send(gener);
});

//put API
app.put("/api/genres/:id", (req: any, res: any) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id, 10));
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});

//delete API
app.delete("/api/genres/:id", (req: any, res: any) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id, 10));
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

app.listen(3000, () => console.log(`Listening on port 3000...`));
