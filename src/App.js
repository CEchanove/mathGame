import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.scss'
import CardGame from './card_game/CardGame';
import Home from './Home';
import Login from './Login';
import Maths from './math_game/Maths';
import Score from './Score';

export default function App(){
    return(
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route path="/home" element={<Home />}/>
                    <Route path="/memory" element={<CardGame />}/>
                    <Route path="/math" element={<Maths />} />
                    <Route path="/score" element={<Score />}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}