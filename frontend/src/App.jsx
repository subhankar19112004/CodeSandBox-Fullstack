import React from 'react'
import usePing from './hooks/apis/queries/usePing'

function App() {

  const { isLoading, data } = usePing();

  if(isLoading){
    return (
      <div>🔥</div>
    )
  }
  return (
    <div>App {data.message}</div>
  )
}

export default App