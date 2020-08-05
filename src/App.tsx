import React, { useState } from 'react'
import './App.css'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import GaugeNavBar from './GaugeNavBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import Map from './Map'
import InputArea from './InputArea'

type MyState = {
  origin: string; destination: string; mpg: number; gasPrice: number;
}

function App() {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [mpg, setMpg] = useState(0)
  const [gasPrice, setGasPrice] = useState(0)

  function handleComputeRequest(inputInfo: {
    origin: string; destination: string; mpg: number;
    gasPrice: number;
  }): void {
    setOrigin(inputInfo.origin)
    setDestination(inputInfo.destination)
    setMpg(inputInfo.mpg)
    setGasPrice(inputInfo.gasPrice)
  }

  function buildResultDiv(totalCost: number, duration: string) {
    // build and insert result div here
  }

  function handleComputeResult(distance: number, duration: string) {
    const totalCost = (distance / mpg) * gasPrice
    buildResultDiv(totalCost, duration)
  }

  return (
    <div className="App">
      <Container>
        <GaugeNavBar />
        {/* ideally we want this to wrap the map to the bottom aat 768px width as that's the
        smallest width the input boxes still render nicely at TODO will fix later probably ;) */}
        <Row className="interactionSpace">
          <Col sm={7}>
            <InputArea handleClick={handleComputeRequest} />
            {/*  output area */}
          </Col>
          <Col sm={5}>
            <Map
              origin={origin}
              destination={destination}
              handleComputeResult={handleComputeResult}
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
