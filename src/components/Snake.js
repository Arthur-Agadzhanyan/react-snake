import React from 'react';

export default ({snakeDots}) => {
  return (
    <div>
      {snakeDots.map((dot, i) => {
        const style = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`,
          background: snakeDots.length >= 12 && snakeDots.length <= 21  ? '#000' : '#00dd37',
        }
        return (
          <div className="snake-dot" key={i} style={style}></div>
        )
      })}
    </div>
  )
}