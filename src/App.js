import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.scss'
import CardGame from './card_game/CardGame';
import Home from './Home';
import Maths from './math_game/Maths';

export default function App(){
    return(
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Home />}/>
                    <Route path="/memory" element={<CardGame />}/>
                    <Route path="/math" element={<Maths />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}