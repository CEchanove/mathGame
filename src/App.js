import './App.css';
import {useEffect, useState} from 'react';
import Card from './cards/Card';
import cone from './images/Cone.svg';
import cupcake from './images/Cupcake.svg';
import pancakes from './images/Pancake.svg';
import pancakesB from './images/pancakesBlack.png';
import slush from './images/Slush.svg';
import slushB from './images/slushCupBlack.png';

const initialCards = [
  { "src": cone, matched: false },
  { "src": cupcake, matched: false },
  { "src": pancakes, matched: false },
  { "src": pancakesB, matched: false },
  { "src": slush, matched: false },
  { "src": slushB, matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turn, setTurn] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(true);
  const [startFlip, setStartFlip] = useState(true);


  useEffect(() => {
    setTimeout(() => {
      setStartFlip(false)
    }, 1000)
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  },[choiceOne, choiceTwo]);

  function shuffleCards() {
    //setCards(null)
    const shuffledCards = [...initialCards, ...initialCards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards);
    setTurn(0);
    setDisabled(false)
    setStartFlip(true)
    setTimeout(() => {
      setStartFlip(false)
    }, 1000);
  }

  function handleChoice(card) {
    choiceOne ? (
      choiceOne.id !== card.id &&
      setChoiceTwo(card))
      : setChoiceOne(card)
  }

  function resetTurn() {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurn(prevTurn => prevTurn + 1)
    setDisabled(false)
  }

  return (
    <div className='container'>
      <button onClick={shuffleCards}>Start Game</button>
      <div className="grid">
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched || startFlip}
            disabled={disabled}
            matched={card.matched}
          />
        ))}
      </div>
      <p>Turns: {turn}</p>
    </div>
  );
}

export default App;
