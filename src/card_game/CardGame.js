import "./cardGame.scss";
import { useEffect, useState } from "react";
import Card from "./cards/Card";
import card1 from './images/card1.png'
import card2 from './images/card2.png'
import card3 from './images/card3.png'
import card4 from './images/card4.png'
import card5 from './images/card5.png'
import card6 from './images/card6.png'
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom'

//initial cards configuration make sure they are unmatched
const initialCards = [
  { src: card1, matched: false },
  { src: card2, matched: false },
  { src: card3, matched: false },
  { src: card4, matched: false },
  { src: card5, matched: false },
  { src: card6, matched: false },
];

export default function CardGame() {
  const [cards, setCards] = useState([]);
  const [turn, setTurn] = useState(0);
  const [matchTotal, setMatchTotal] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [startFlip, setStartFlip] = useState(true);
  const [widthAlert, setWidthAlert] = useState(false)
  const navigate = useNavigate()
  const [timer, setTimer] = useState("")
  const [minutes, setMinutes] = useState(0)


  //on screen load shows the cards and then flips them
  useEffect(() => {
    //calculates width of the window and sets alert on if is not portrait
    if (window.innerWidth < window.innerHeight){
      setWidthAlert(true)
      //sets alert off if user has not closed it in 5 seconds
      setTimeout(() => {
        setWidthAlert(false)
      },5000)
    } 
    setTimeout(() => {
      setStartFlip(false);
    }, 1500);
    //checks if the 2 choices match
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
    setInterval(() => {
      let now = new Date().getTime()
      let seconds = Math.floor((now % (1000 * 60)) / 1000);
      if (seconds === 59){
        setMinutes(minutes+1)
      }
      setTimer(seconds)
    },1000)

  }, [choiceOne, choiceTwo]);


  //function to shuffle the cards randomising the order
  function shuffleCards() {
    const shuffledCards = [...initialCards, ...initialCards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurn(0);
    setDisabled(false);
    setMatchTotal(0);
    setStartFlip(true);
    setTimeout(() => {
      setStartFlip(false);
    }, 1000);
  }

  //checks the card choice
  function handleChoice(card) {
    choiceOne
      ? choiceOne.id !== card.id && setChoiceTwo(card)
      : setChoiceOne(card);
  }

  //function to reset the turn
  function resetTurn() {
    setChoiceOne(null);
    setChoiceTwo(null);
    //counts the turns (score)
    setTurn((prevTurn) => prevTurn + 1);
    setDisabled(false);
  }

  function handleFinish() {
    localStorage.setItem("score", JSON.stringify(turn))
    navigate("/score")
  }

  return (
    <main className="container">
      {widthAlert ? (
        <Alert variant="filled" severity="warning" sx={{position: "absolute", width: "80vw", margin: "auto", top: "20vw"}}>
        This game is better played on landscape
        <CloseIcon sx={{color: "#fff", position: "relative", top: "2%", right: "2%"}} onClick={setWidthAlert(false)}/>
      </Alert>
      ):(
        <></>
      )}
      <button className="btn" onClick={() => shuffleCards()}>Start Game</button>
      <h2>Game Started {minutes}m: {timer}s ago</h2>
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
      {matchTotal === 6 ? (
        <div className="all-matched">
          <h2>Well Done!</h2>

          <button onClick={()=> handleFinish()}>Score</button>
        </div>
      ):(
        <></>
      )}
    </main>
  );
}

