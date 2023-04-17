import { useEffect, useState } from 'react'
import Die from './components/Die'
import Confeti from 'react-confetti'

export default function App() {

  const generateNewDie = () => {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: Math.random()
    }
  }

  const allNewDice = () => {
    //Creates a new array of length 10, and the mapping function is called for each element
    return Array.from({ length: 10 }, () => generateNewDie())
  }

  const rollDice = () => {
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? die : generateNewDie()
    }))
  }
  
  const holdDice = id => {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? { ...die, isHeld: !die.isHeld } : die
    }))
  }

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  console.log(dice)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)

    if (allHeld && allSameValue) { 
      setTenzies(true)
      console.log('You won!')
    }
  }, [dice])

  
  const diceElements = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))
  
  
  return (
    <main className='bg-neutral-100 h-[35rem] container max-w-3xl flex flex-col justify-around items-center p-8 rounded-1xl
    '>
      {tenzies && <Confeti />}
      <h1 className='text-5xl m-0'>Tenzies</h1>
      <p className='font-normal text-center mt-0 text-2xl'>Roll until all dice are the same. 
      Click each die to freeze it at its current value between rolls.</p>
      <div className='grid-rows-2 grid-cols-5 grid gap-5 mb-3'>
        {diceElements} 
      </div>
      <button
        onClick={rollDice}
        className='h-16 w-[20rem] bg-[#5035FF] text-white text-3xl cursor-pointer rounded-md border-none'
      >
        {tenzies ? 'New Game' : 'Roll'}
      </button>
    </main>
  )
}
