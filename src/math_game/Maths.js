import { useState } from "react";
import './maths.scss'
import { useNavigate } from "react-router-dom";

export default function Maths() {
  const [answers, setAnswers] = useState([]);
  //score variable
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showSubmit, setShowSubmit] = useState(false)
  //Color variable to change with score
  const [color, setColor] = useState("#f25749")
  const navigate = useNavigate()

  //array of questions and right answer to iterate through the game
  const questions = [
    {
      questionText: "5 + 4 =",
      answerOptions: [
        {
            answerText: 9,
          isCorrect: true,
        },
        {
            answerText: 7,
          isCorrect: false,
        },
        {
            answerText: 10,
          isCorrect: false,
        },
        {
            answerText: 8,
          isCorrect: false,
        },
      ],
    },
    {
      questionText: "2 + 3 =",
      answerOptions: [
        {
            answerText: 6,
          isCorrect: false,
        },
        {
            answerText: 8,
          isCorrect: false,
        },
        {
            answerText: 5,
          isCorrect: true,
        },
        {
            answerText: 8,
          isCorrect: false,
        },
      ],
    },
    {
      questionText: "3 + 5 =",
      answerOptions: [
        {
            answerText: 9,
          isCorrect: false,
        },
        {
            answerText: 8,
          isCorrect: true,
        },
        {
            answerText: 10,
          isCorrect: false,
        },
        {
            answerText: 6,
          isCorrect: false,
        },
      ],
    },
    {
      questionText: "8 - 2 =",
      answerOptions: [
        {
            answerText: 4,
          isCorrect: false,
        },
        {
            answerText: 6,
          isCorrect: true,
        },
        {
            answerText: 5,
          isCorrect: false,
        },
        {
            answerText: 7,
          isCorrect: false,
        },
      ],
    },
    {
      questionText: "1 + 9 =",
      answerOptions: [
        {
            answerText: 9,
          isCorrect: true,
        },
        {
            answerText: 7,
          isCorrect: false,
        },
        {
            answerText: 12,
          isCorrect: false,
        },
        {
            answerText: 10,
          isCorrect: true,
        },
      ],
    },
    {
      questionText: "7 - 3 =",
      answerOptions: [
        {
            answerText: 5,
          isCorrect: false,
        },
        {
            answerText: 3,
          isCorrect: false,
        },
        {
            answerText: 4,
          isCorrect: true,
        },
        {
            answerText: 6,
          isCorrect: false,
        },
      ],
    },
  ];

  //function that finds the index of the question and compares to the array of questions to find answer
  const handleAnswerOptionClick = (answerOption, question) => {
    const findQuestion = (element) => element.questionText == question;
    var index = questions.findIndex(findQuestion);
    const found = questions[index].answerOptions.find(
      (element) => element.isCorrect == true
    );
    setAnswers([
      ...answers,
      {
        questionText: question,
        answerText: answerOption.answerText,
        isCorrect: answerOption.isCorrect,
        correctAnswer: found.answerText,
      },
    ]);
    if (answerOption.isCorrect) {
      //contains the score
      setScore(score + 1);
    }

    //function to move to the next question
    const nextQuestion = currentQuestion + 1;
    //checks if it is the last question
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      setShowSubmit(true)
      //calculates if the score is half or more
      if(score >= questions.length/2){
        setColor("#0da64f")
      }
    }
  };

  function handleFinish() {
    localStorage.setItem("score", JSON.stringify(score))
    navigate("/score")
  }

  return (
    <main className="container">
      <h1>Math Game</h1>
      {showScore ? (
        <div className="score-section">
          <p>
            You scored: <span style={{color: color}}>{score}</span> out of {questions.length}
          </p>
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="question-text">
              {questions[currentQuestion].questionText}
            </div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].answerOptions.map((answerOption) => (
              <button
                onClick={() =>
                  handleAnswerOptionClick(
                    answerOption,
                    questions[currentQuestion].questionText
                  )
                }
              >
                {answerOption.answerText}
              </button>
            ))}
          </div>
        </>
      )}
      {showSubmit ? (
        <button className="score-button" onClick={()=> handleFinish()}>Score</button>
      ):(
        <></>
      )}
    </main>
  );
}
