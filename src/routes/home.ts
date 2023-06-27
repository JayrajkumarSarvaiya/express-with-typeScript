const express = require("express");
const router = express.Router();

router.get("/", (req: any, res: any) => {
  res.render("index", {
    // call the PUG and set their variable's value
    title: "Express-Typescript-App",
    message: "This is Express App with Typescript !",
  });
});

module.exports = router;
