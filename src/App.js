import React from 'react'
import './App.css'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import GaugeNavBar from './GaugeNavBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import InputOutputArea from './InputOutputArea'
import Map from './Map'

function App() {
  return (
    <div className="App">
      <Container>
        <GaugeNavBar/>
        <div id="flex">
          <Col sm={7}>
            <InputOutputArea/>
          </Col>
          <Col sm={5}>
            <Map/>
          </Col>
        </div>
      </Container>
    </div>
  )
}

export default App
