import React from 'react';
import back from '../assets/images/black.jpeg'

const CardItem = ({card, handleChoice, flipped}) => {
    return (
        <div className="card">
            <div className={ flipped ? 'flipped' : ' '}>
                <img 
                    className='front' 
                    src={card.img} 
                    alt="card-front" />
                <img 
                    className='back' 
                    src={back} 
                    alt="card-front"
                    onClick={() => handleChoice(card)} 
                />
            </div>
        </div>
    );
};

export default CardItem;