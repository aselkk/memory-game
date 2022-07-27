import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import CardItem from '../components/CardItem';
import sunflower from '../assets/images/sunflower.jpeg'
import heart from '../assets/images/heart.jpeg'
import blackccat from '../assets/images/blackccat.jpeg'
import seacat from '../assets/images/seacat.jpeg'
import duckie from '../assets/images/duckie.jpeg'
import frog from '../assets/images/frog.jpeg'
import img from '../assets/images/img.jpeg'
import kittens from '../assets/images/kittens.jpeg'
import cute from '../assets/images/cute.jpeg'
import rainbow from '../assets/images/rainbow.jpeg'
import fox from '../assets/images/fox.jpeg'
import hearthead from '../assets/images/hearthead.jpeg'
import quokka from '../assets/images/quokka.jpeg'
import wadamelon from '../assets/images/wadamelon.jpeg'

const cardImages = [
    {'img': sunflower, matched: false},
    {'img': heart, matched: false},
    {'img': blackccat, matched: false},
    {'img': seacat, matched: false},
    {'img': duckie, matched: false},
    {'img': frog, matched: false},
    {'img': img, matched: false},
    {'img': kittens, matched: false},
    {'img': cute, matched: false},
    {'img': rainbow, matched: false},
    {'img': fox, matched: false},
    {'img': hearthead, matched: false},
    {'img': quokka, matched: false},
    {'img': wadamelon, matched: false},
    
]

const Game = () => {
    const username = localStorage.getItem('username')
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)

    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({...card, id: Math.random()}))
        setCards(shuffledCards)
        setTurns(0)
        setChoiceOne(null)
        setChoiceTwo(null)
    }

    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    useEffect(() => {
        shuffleCards()
    },[])

    useEffect(() => {
        if(choiceOne && choiceTwo) {

            if(choiceOne.img === choiceTwo.img) {
                setCards(prev => {
                    return prev.map(card => {
                        if (card.img === choiceOne.img) {
                            return {...card, matched: true}
                        } else {
                            return card
                        }
                    })
                })
                resetChoices()
            } else {
                setTimeout(() => {
                    resetChoices()    
                }, 700);
            }
        }
    }, [choiceTwo])

    const resetChoices = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prev => prev + 1)
    }

    return (
        <section id='game'>
            <div className="container">
                <div className="gameplay__top">
                    <div className="top__left">
                        <button onClick={shuffleCards} className="bttn"> restart the game </button>
                        <button className="bttn"><Link to='/'> main page </Link></button>
                        
                    </div>
                    <div className="top__center">
                        <h2>have fun, {username}!</h2>
                    </div>
                    <div className="top__right">
                        <h3>Flips: {turns}</h3>
                        <h3>time: --:--</h3>
                    </div>
                </div>
                <div className="card-grid">
                    {cards.map(card => (
                        <CardItem 
                            key={card.id} 
                            card={card}
                            handleChoice={handleChoice} 
                            flipped={card === choiceOne || card === choiceTwo || card.matched}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Game;