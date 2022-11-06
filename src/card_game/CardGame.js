import "./cardGame.scss";
import { useEffect, useState } from "react";
import Card from "./cards/Card";
import Confetti from "react-dom-confetti";
import card1 from './images/card1.png'
import card2 from './images/card2.png'
import card3 from './images/card3.png'
import card4 from './images/card4.png'
import card5 from './images/card5.png'
import card6 from './images/card6.png'


//initial cards configuration
const initialCards = [
  { src: card1, matched: false },
  { src: card2, matched: false },
  { src: card3, matched: false },
  { src: card4, matched: false },
  { src: card5, matched: false },
  { src: card6, matched: false },
];

//confetti configuration
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

export default function CardGame() {
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
    }, 1500);
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
    <main className="container">
      <button className="btn" onClick={() => shuffleCards()}>Start Game</button>
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
      <div className="stats">
        <p>Turns: {turn}</p>
        <p>Total: {matchTotal}</p>
      </div>
    </main>
  );
}

