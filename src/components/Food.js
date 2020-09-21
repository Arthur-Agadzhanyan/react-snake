import React from 'react';

const Food = ({dot,snakeDots}) => {
    const style ={
        left: `${dot[0]}%`,
        top: `${dot[1]}%`,
        background: snakeDots.length >= 12 && snakeDots.length <= 21 ? '#000' : 'red'
    }
    return (
        <div className='snake-food' style={style}></div>
    );
}

export default Food;
