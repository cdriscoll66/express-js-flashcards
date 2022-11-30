const express = require("express");
const router = express.Router();
const { data } = require("../flashcardData.json");
const { cards } = data;



router.get("/", (req, res) => {
    const numOfCards = cards.length;
    const flashcardId = Math.floor(Math.random() * numOfCards);


    res.redirect('/cards/' + flashcardId + '?side=question');

})

router.get("/:id", (req, res) => {
  const { side } = req.query;
  const { id } = req.params;
  const text = cards[id][side];
  const { hint } = cards[id];
  const sideToShow = side === "question" ? "answer" : "question";
  const sideToShowDisplay = sideToShow.charAt(0).toUpperCase() + sideToShow.slice(1);
  const name = req.cookies.username;

  if (!side) {
    return res.redirect(`/cards/${id}?side=question`);
  }


  const templateData = { id, text, side, sideToShow, sideToShowDisplay, hint, name };

  res.render("cards", templateData);
});

module.exports = router;
