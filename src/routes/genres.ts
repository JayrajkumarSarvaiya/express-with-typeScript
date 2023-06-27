const express = require("express");
const router = express.Router();
import Joi from "joi";

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

router.get("/", (req: any, res: any) => {
  res.send(genres);
});

//post API
router.post("/", (req: any, res: any) => {
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
router.put("/:id", (req: any, res: any) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id, 10));
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});

//delete API
router.delete("/:id", (req: any, res: any) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id, 10));
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

module.exports = router;
