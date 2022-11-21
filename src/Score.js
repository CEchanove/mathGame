import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from './images/Math_Zone_Logo.webp'

export default function Score(){
    const [user, setUser] = useState("")
    const [score, setScore] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        let user = localStorage.getItem("user")
        let score = localStorage.getItem("score")

        setUser(JSON.parse(user))
        setScore(JSON.parse(score))
    },[])

    function handleEnd(){
        localStorage.clear()
        navigate("/")
    }
    return(
        <main className="score">
            <img src={logo}/>
            <h1 className="anim_one">Well Done!</h1>
            <h1 className="anim_two">{user}</h1>
            <h1 className="anim_three">Your score is: <span>{score}</span></h1>
            <button onClick={() => handleEnd()}>Play again</button>
        </main>
    )
}