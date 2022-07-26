import React from 'react';

const Leaderboard = () => {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard'))

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

    return (
        <ol>
            <div className="">
                <p style={{width: '40%'}}>username:</p>
                <p style={{width: '20%'}}>turns:</p>
                <p style={{width: '20%'}}>time:</p>
                <p style={{width: '20%'}}>points</p>
            </div>
            {leaderboard ? filteredByScore?.map((el,index) => (
                <li key={index}>
                    <p style={{width: '40%'}}>{el.username}</p>
                    <p style={{width: '20%'}}>{el.turns}</p>
                    <p style={{width: '20%'}}>{el.time}</p>
                    <p style={{width: '20%'}}>{el.points}</p>
                </li>
            )) : <h3 style={{textAlign: 'center'}}>there is no players yet! <br/> be the first one!</h3>}
        </ol>
    )
}

export default Leaderboard;