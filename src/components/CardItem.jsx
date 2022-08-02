import React from 'react';
import back from '../assets/images/black.jpeg'

const CardItem = ({card, handleChoice, flipped , matched}) => {
    return (
        <div className="card">
            <div className={ flipped ? 'flipped' : ' '}>
                <img 
                    className='front' 
                    style={matched ? {opacity: '0', transitionDelay: '.7s'} : {}}
                    src={card.img} 
                    alt="card-front" />
                <img 
                    style={matched ?  {opacity: '0', transitionDelay: '.7s'} : {}}
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