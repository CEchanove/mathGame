import { useNavigate } from "react-router-dom"
import {useState, useEffect} from 'react'
import logo from "./images/Math_Zone_Logo.webp"

export default function Home() {
    const navigate = useNavigate()
    const [user, setUser] = useState()

    //onload gets the user name
    useEffect(() => {
        let user = localStorage.getItem("user")
        setUser(JSON.parse(user))
    })


    return(
        <main>
            <img src={logo} alt="Math Zone Logo"/>
            <h1>{user}</h1>
            <h1>Welcome <span className="one">to the</span><span className="two"> math zone</span></h1>
            <div className="buttons">
            <button onClick={() => navigate("/memory")}>Memory Game</button>
            <button onClick={() => navigate("/math")}>Math Game</button>
            </div>
        </main>
    )
}