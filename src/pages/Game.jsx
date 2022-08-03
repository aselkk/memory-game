import React, {useState, useEffect} from 'react';
import { Button, Modal } from 'antd';
import { Link } from "react-router-dom";
import CardItem from '../components/CardItem';
import sunflower from '../assets/images/sunflower.jpeg'
import grumpy from '../assets/images/grumpy.jpeg'
import blackccat from '../assets/images/blackccat.jpeg'
import seacat from '../assets/images/seacat.jpeg'
import duckie from '../assets/images/duckie.jpeg'
import frog from '../assets/images/frog.jpeg'
import img from '../assets/images/img.jpeg'
import kittens from '../assets/images/kittens.jpeg'
import cute from '../assets/images/cute.jpeg'
import legs from '../assets/images/legs.jpeg'
import fox from '../assets/images/fox.jpeg'
import hearthead from '../assets/images/hearthead.jpeg'
import bear from '../assets/images/bear.jpeg'
import wadamelon from '../assets/images/wadamelon.jpeg'

const cardImages = [
    {'img': blackccat, matched: false},
    {'img': frog, matched: false},
    {'img': duckie, matched: false},
    {'img': sunflower, matched: false},
    {'img': grumpy, matched: false},
    {'img': seacat, matched: false},
    {'img': img, matched: false},
    {'img': kittens, matched: false},
    {'img': cute, matched: false},
    {'img': legs, matched: false},
    {'img': fox, matched: false},
    {'img': hearthead, matched: false},
    {'img': bear, matched: false},
    {'img': wadamelon, matched: false},
]

const Game = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const username = localStorage.getItem('username')
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [time, setTime] = useState(0)
    const [correct, setCorrect] = useState(0)
    const [intervalchik, setIntervalchik] = useState()

    const shuffleCards = () => {
        clearInterval(intervalchik)
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({...card, id: Math.random()}))

        setCards(shuffledCards)
        setTurns(0)
        setTime(0)
        setCorrect(0)
        setChoiceOne(null)
        setChoiceTwo(null)
        setIsModalVisible(false);
        setIntervalchik(
            setInterval(() => {
                setTime(prev => prev + 1)
            }, 1000)
        )
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
                            setCorrect(prev => prev + 1)
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
        if(correct > 0 && correct == cards.length){
            endGame()
            setTimeout(() => {
                showModal() 
            }, 1100);
            
        }
    }, [choiceTwo])

    const resetChoices = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prev => prev + 1)
    }

    const secondsToTime = (e) => {
        const 
        m = Math.floor(e % 3600 / 60).toString().padStart(2,'0'),
        s = Math.floor(e % 60).toString().padStart(2,'0');
        
        return m + ':' + s;
    }

    const createUser = () => {
        const user = {
            'username': username,
            'points': (turns * time),
            'turns': turns,
            'time': time
        }
        let leaderboard = JSON.parse(localStorage.getItem('leaderboard'))

        if (leaderboard) {
            leaderboard.push(user)
            localStorage.setItem('leaderboard', JSON.stringify(leaderboard))
        } else {
            leaderboard = []
            leaderboard.push(user)
            localStorage.setItem('leaderboard', JSON.stringify(leaderboard))
        }
    }

    const endGame = () => {
        createUser()
        clearInterval(intervalchik)
    }

    const showModal = () => {
        setIsModalVisible(true);
        clearInterval(intervalchik)
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <section id='game'>
            <div className="container">
                <div className="gameplay__top">
                    <div className="top__left">
                        <button onClick={shuffleCards} className="bttn"> restart </button>
                        <button className="bttn">
                            <Link style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}} to='/'> main page </Link>
                        </button>
                    </div>
                    <div className="top__center">
                        <h2>have fun, {username}!</h2>
                    </div>
                    <div className="top__right">
                        <h4>Flips: {turns}</h4>
                        <h4>time: { secondsToTime(time) }</h4>
                    </div>
                </div>
                <div className="card-grid">
                    {cards.map(card => (
                        <CardItem 
                            key={card.id} 
                            card={card}
                            handleChoice={handleChoice} 
                            flipped={ card === choiceOne || card === choiceTwo || card.matched }
                            matched = { card.matched }
                        />
                    ))}
                </div>
                    <Modal 
                        title={`good job, ${username}!`} 
                        visible={isModalVisible} 
                        onOk={handleOk} 
                        onCancel={handleCancel}>
                            <div>
                                <Button type='primary' style={{ background: "rgb(127 82 186 / 98%)", border: "none", marginRight: '10px' }} onClick={shuffleCards} className="bttn"> play again </Button>
                                <Button type='primary' style={{ background: "rgb(127 82 186 / 98%)", border: "none" }} className="bttn"><Link to='/'> main page </Link></Button>    
                            </div>
                            <p style={{ textAlign: 'center', marginTop: '10px' }}> turns: { turns } </p>
                            <p style={{ textAlign: 'center', marginTop: '10px' }}> time: { time } </p>
                            <p style={{ textAlign: 'center', marginTop: '10px' }}> total score: { turns * time } </p>
                    </Modal>
            </div>
        </section>
    );
};

export default Game;