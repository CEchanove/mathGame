import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './App.scss'

export default function Login(){
    const [user, setUser] = useState()
    const navigate = useNavigate()

    //handles the user name
    const handleUser = () => {
        localStorage.setItem("user", JSON.stringify(user))
        navigate("/home")
    }

    return(
        <main className="login">
            <h1>Welcome to the Math Zone</h1>
            <h6>What's your name?</h6>
            <input type="text" onChange={(e) => setUser(e.target.value)}/>
            <button onClick={()=> handleUser()}>Let's Play!</button>
        </main>
    )
}