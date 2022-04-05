import "./App.css";
import { useEffect, useState } from "react";
import Card from "./cards/Card";
import cone from "./images/Cone.svg";
import cupcake from "./images/Cupcake.svg";
import pancakes from "./images/Pancake.svg";
import pancakesB from "./images/pancakesBlack.png";
import slush from "./images/Slush.svg";
import slushB from "./images/slushCupBlack.png";
import Confetti from "react-dom-confetti";

const initialCards = [
  { src: cone, matched: false },
  { src: cupcake, matched: false },
  { src: pancakes, matched: false },
  { src: pancakesB, matched: false },
  { src: slush, matched: false },
  { src: slushB, matched: false },
];
const config = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: "124",
  dragFriction: "0.13",
  duration: "10000",
  stagger: "8",
  width: "18px",
  height: "14px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};

function App() {
  const [cards, setCards] = useState([]);
  const [turn, setTurn] = useState(0);
  const [matchTotal, setMatchTotal] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [startFlip, setStartFlip] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setStartFlip(false);
    }, 1000);
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setMatchTotal(matchTotal + 1);
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
    if (matchTotal === initialCards.length) {
      setShowConfetti(true);
    }
  }, [choiceOne, choiceTwo]);

  function shuffleCards() {
    //setCards(null)
    const shuffledCards = [...initialCards, ...initialCards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurn(0);
    setDisabled(false);
    setShowConfetti(false);
    setMatchTotal(0);
    setStartFlip(true);
    setTimeout(() => {
      setStartFlip(false);
    }, 1000);
  }

  function handleChoice(card) {
    choiceOne
      ? choiceOne.id !== card.id && setChoiceTwo(card)
      : setChoiceOne(card);
  }

  function resetTurn() {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurn((prevTurn) => prevTurn + 1);
    setDisabled(false);
  }

  return (
    <div className="container">
      <div className="btn" onClick={() => shuffleCards()}>
        <span>
          <b>Start Game</b>
        </span>
        <div className="d1"></div>
        <div className="d2"></div>
        <div className="d3"></div>
        <div className="d4"></div>
      </div>
      <div style={{ zIndex: "100" }}>
        <Confetti active={showConfetti} config={config} />
      </div>
      <div className="grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={
              card === choiceOne ||
              card === choiceTwo ||
              card.matched ||
              startFlip
            }
            disabled={disabled}
            matched={card.matched}
          />
        ))}
      </div>
      <p>Turns: {turn}</p>
      <p>Total: {matchTotal}</p>
    </div>
  );
}

export default App;
