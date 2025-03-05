import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const App = () => {

  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [char, setChar] =  useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = () => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (number) str += "0123456789"
    if (char) str += "!@#$%^&*_+"

    for (let i =  1; i <= length; i++) {
      let char = Math.floor (Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }

  const copyToClip = () => {
    console.log('ref', passwordRef);
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  
  }

  useEffect(() => {
    passwordGenerator()},
  [length, number, char])

  const passwordRef = useRef(null)

  console.log('pass', password);

  return (
    <>

    <div className='w-fit max-w-lg px-5 py-3 my-8 mx-auto bg-gray-700 rounded-lg text-white' >
      
      <h1 className='text-center text-white my-3 '>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input 
      type="text"
      value = {password}
      className='bg-white outline-none placeholder:text-gray-500 w-full py-1 px-3 text-black '
      placeholder='password'
      ref={passwordRef}
      />

      <button 
      onClick={copyToClip}
      className='outline-none bg-blue-700 text-white px-3 py-0.5 font-medium cursor-pointer'>Copy</button>
      </div>


    <div className='flex items-center text-sm gap-x-4'>

    <div className='flex items-center gap-x-2'>
    <input 
      type="range" 
      min={8} 
      max={30} 
      className='cursor-pointer' 
      value = {length}
      onChange={(e) => setLength(e.target.value)}
      />
    <label>Length: {length} </label>
    </div>
    
    <div className='flex items-center gap-x-1'>
      <input
        type="checkbox"
        defaultChecked= {number}
        id='numberInput'
        onChange={() => {
          setNumber((prev) => !prev)
        }}
      />
      <label htmlFor='numberInput'>Numbers</label>
    </div>

    <div className='flex items-center gap-x-1'>
    <input 
      type="checkbox" 
      defaultChecked={char}
      id='characterInput'
      onChange={() => {
        setChar((prev) => !prev)
      }}
    />
    <label htmlFor=''characterInput>Characters</label>
    </div>

    </div>
    </div>
      
    </>
  )
}



export default App

