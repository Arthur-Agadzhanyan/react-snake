import React from 'react';

export default ({snakeDots}) => {
  function getColor() {
    if(snakeDots.length >= 12 && snakeDots.length <= 21){
      return '#000'
    }  
    else{
      return '#00dd37'
    }
  }
  
  return (
    <div>
      {snakeDots.map((dot, i) => {
        const style = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`,
          background: getColor(),
        }
        return (
          <div className="snake-dot" key={i} style={style}></div>
        )
      })}
    </div>
  )
}