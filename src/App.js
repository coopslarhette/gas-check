import React from 'react'
import './App.css'
import Container from 'react-bootstrap/Container'
import GaugeNavBar from './GaugeNavBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import InputOutputArea from './InputOutputArea'

export default function App() {
  return (
    <div className="App">
      <Container>
        <GaugeNavBar/>
        <div id="flex">
          <InputOutputArea/>
          {/* <Map/> */}
        </div>

      </Container>
    </div>
  )
}
