import React from 'react'
import './App.css'
import GaugeNavBar from './GaugeNavBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'

function App() {
  return (
    <div className="App">
      <Container>
        <GaugeNavBar/>
      </Container>
    </div>
  )
}

export default App
