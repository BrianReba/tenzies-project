import React from 'react'

function Die(props) {

  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white"
  }  
  return (
    <div
        className="h-[4.3rem] w-[4.3rem] shadow-md flex justify-center items-center cursor-pointer rounded-md border-2 border-black"
        style={styles}
        onClick={props.holdDice}
    >
      <h2 className='text-4xl'>{props.value}</h2>
    </div>
  )
}

export default Die