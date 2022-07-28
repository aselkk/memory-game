import {useState} from 'react'
import { Link } from "react-router-dom"
import { Button, Modal } from 'antd'

function Home() {

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [inputData, setInputData] = useState('')
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard'))

    const showModal = () => {
        setIsModalVisible(true)
    }

    const handleOk = () => {
        setIsModalVisible(false)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const handleChange = e => {
        setInputData(e.target.value)
    }

    const handleClick = () => {
        localStorage.setItem('username', inputData)
    }

    let filteredByName = []
    leaderboard?.forEach((player) => {
        if (filteredByName.length) {
            const res = filteredByName.findIndex((item) => item.username === player.username)
            if (res >= 0) {
                if (player.points < filteredByName[res].points) {
                    filteredByName.splice(res, 1)
                    filteredByName.push(player)
                }
            } else {
                filteredByName.push(player)
            }
        } else {
            filteredByName.push(player)
        }
    })

    const filteredByScore = filteredByName.sort((sameName, filteredByName) =>  sameName.points - filteredByName.points)
    console.log(filteredByScore);


    return (
        <div>
            <div className="container">
                <div id="home">
                    <h1>Welcome to the Memory Game ! </h1>
                    <form action="">
                        <label htmlFor="name">please, enter your name</label>
                        <input 
                            name='name'
                            id='username'
                            className='username'
                            type="text"
                            onChange={handleChange}
                            value={inputData}
                        />
                    </form>
                    <div className="bttns">
                        <button
                            style={ inputData ? {} : {backgroundColor: 'gray', cursor:'not-allowed'}} 
                            disabled={inputData ? true : false} 
                            className='bttn bttn--start' >
                                <Link style={ inputData ? {} : {backgroundColor: 'gray', color: 'black', cursor:'not-allowed'}}  onClick={handleClick}  to={inputData ? "game" : '/'} >start the game</Link>
                        </button>
                        <button className='bttn bttn--leaderboard' onClick={showModal}>leaderboard</button>
                    </div>
                    <Modal title="leaderboard" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <ol>
                            {leaderboard ? filteredByScore?.map((el,index) => (
                                <li key={index}>
                                    <p>{el.username}: <span className="">{el.points}</span></p>
                                    
                                </li>
                            )) : <h3 style={{textAlign: 'center'}}>there is no players yet! <br/> be the first one!</h3>}
                        </ol>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default Home