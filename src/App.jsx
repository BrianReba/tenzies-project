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
    setCount(prevCount => prevCount + 1)
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ?
          die :
          generateNewDie()
      }))
    } else {
      setCount(prevCount => prevCount = 0)
      setDice(allNewDice())
      setTenzies(false)
    }
  }
  
  const holdDice = id => {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? { ...die, isHeld: !die.isHeld } : die
    }))
  }

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [count, setCount] = useState(0)
  
 
  console.log(dice)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)

    if (allHeld && allSameValue) { 
      setTenzies(true)
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
    <main className='bg-[#635985] h-[35rem] container max-w-3xl flex flex-col justify-around items-center p-8 rounded-1xl
    '>
      {tenzies && <Confeti />}
      {tenzies && (
        <>
          <h3 className='text-[#ee0000f8] font-bold m-0 text-3xl'>
            You won in {count} rolls!
          </h3>
        </>
      )}
      <h1 className='text-5xl m-0 text-white font-bold'>Tenzies</h1>
      <p className='font-light text-center mt-0 text-2xl text-white'>Roll until all numbers are the same. 
      Click each number to freeze it at its current value between rolls.</p>
      <div className='grid-rows-2 grid-cols-5 grid gap-5 mb-3'>
        {diceElements} 
      </div>
      <button
        onClick={rollDice}
        className='h-16 w-[20rem] bg-[#5035ffbd] hover:bg-[#4c32f8] text-white text-3xl hover:text-4xl cursor-pointer rounded-md border-none'
      >
        {tenzies ? 'New Game' : 'Roll'}
      </button>
    </main>
  )
}
