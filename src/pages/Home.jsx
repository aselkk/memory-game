import {useState} from 'react'
import { Link } from "react-router-dom";
import { Button, Modal } from 'antd';

function Home() {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [inputData, setInputData] = useState('')
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard'))
    // const [name, turns, time] = leaderboard

    const getUser = () => {
        leaderboard?.map((leader) => {
            // const [username, turns, time] = leader
            // console.log(username, turns, time);
            // console.log(leader);
            // const username = leader.name
            // console.log(username);
        })
    }
    getUser()

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleChange = e => {
        setInputData(e.target.value);
    }

    const handleClick = () => {
        localStorage.setItem('username', inputData)
        console.log(inputData);
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
                            style={ inputData ? {} : {backgroundColor: 'gray', cursor:'not-allowed'}} 
                            disabled={inputData ? true : false} 
                            className='bttn bttn--start' >
                                <Link style={ inputData ? {} : {backgroundColor: 'gray', color: 'black', cursor:'not-allowed'}}  onClick={handleClick}  to={inputData ? "game" : '/'} >start the game</Link>
                        </button>
                        <button className='bttn bttn--leaderboard' onClick={showModal}>leaderboard</button>
                    </div>
                    <Modal title="leaderboard" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <ol>
                            {leaderboard ? leaderboard?.map((el,index) => (
                                <li key={index}>
                                    <p>{el.username}: <span className="">{el.points}</span></p>
                                    
                                </li>
                            )) : <h3 style={{textAlign: 'center'}}>there is no players yet! <br/> be the first one!</h3>}
                        </ol>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default Home;