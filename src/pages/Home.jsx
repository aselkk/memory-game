import {useState} from 'react'
import { Link } from "react-router-dom"
import { Modal } from 'antd'
import Leaderboard from '../components/Leaderboard'

function Home() {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [inputData, setInputData] = useState('')

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
                            style={ inputData ? {} : { backgroundColor: 'gray', cursor:'not-allowed' } } 
                            disabled={ inputData ? true : false } 
                            className='bttn bttn--start' >
                                <Link style={ inputData ? {} : { backgroundColor: 'gray', color: 'black', cursor:'not-allowed' }}  onClick={handleClick}  to={inputData ? "game" : '/'} >start the game</Link>
                        </button>
                        <button className='bttn bttn--leaderboard' onClick={showModal}>leaderboard</button>
                    </div>
                    <Modal 
                        title="leaderboard" 
                        visible={isModalVisible} 
                        onOk={handleOk} 
                        onCancel={handleCancel}>
                            <Leaderboard/>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default Home