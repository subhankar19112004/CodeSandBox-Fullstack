import React from 'react'

import Router from './router'
import { io } from 'socket.io-client'



function App() {

  const socket = io('http://localhost:3000')

  return (
    <Router/>
  )
}

export default App