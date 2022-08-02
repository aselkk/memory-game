import {useState} from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Modal } from 'antd'
import Leaderboard from '../components/Leaderboard'

function Home() {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [inputData, setInputData] = useState('')
    const navigate = useNavigate();

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

    const handler = (e) => {
        if(e.key === 'Enter'){
            navigate('/game')
            localStorage.setItem('username', inputData)
            // alert('handler func')
        } else {
            return
        }
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
                            onKeyPress={inputData ? (e) => handler(e) : {}}
                        />
                    </form>
                    <div className="bttns">
                        <button
                            style={ inputData ? {} : { backgroundColor: 'gray', cursor:'not-allowed' } } 
                            disabled={ inputData ? true : false } 
                            className='bttn bttn--start'
                            >
                                <Link style={ inputData ? {display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'} : { backgroundColor: 'gray', color: 'black', cursor:'not-allowed'}}  
                            onClick={handleClick}  to={inputData ? "game" : '/'} >start the game</Link>
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