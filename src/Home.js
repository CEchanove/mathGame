import { useNavigate } from "react-router-dom"
import logo from "./images/Math_Zone_Logo.webp"
import axios from 'axios'

export default function Home() {
    const navigate = useNavigate()

    // function test() {
    //     axios.get("http://localhost:4022/game")
    //     .then((res) => {
    //         console.log(res.data)
    //     }).catch((err) => {
    //         console.log(err)
    //     })
    // }

    return(
        <main>
            <img src={logo} alt="Math Zone Logo"/>
            <h1>Welcome <span className="one">to the</span><span className="two"> math zone</span></h1>
            <div className="buttons">
            <button onClick={() => navigate("/memory")}>Memory Game</button>
            <button onClick={() => navigate("/math")}>Math Game</button>
            </div>
            {/* <button onClick={() => test()}>Test</button> */}
        </main>
    )
}