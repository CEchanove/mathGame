import './Card.css';
import logo from '../images/tubbees_slush_logo.webp'

export default function Card(props) {

    function handleChoice() {
        if (!props.disabled)
            props.handleChoice(props.card);
    }

    return (
        <div className='card'>
            <div className={`${props.flipped ? "flipped" : ""} ${props.card.matched ? "matched" : ''}`}>
                <img  className="front" src={props.card.src} alt="card front"/>
                <img className='back' src={logo} alt="card back logo" onClick={() => handleChoice()} />
            </div>
        </div>
    );
}
