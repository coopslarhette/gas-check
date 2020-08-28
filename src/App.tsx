import React, { useState } from 'react'
import './App.css'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'
import GaugeNavBar from './GaugeNavBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import Map from './Map'
import InputArea from './input/InputArea'

function App() {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [mpg, setMpg] = useState(0)
  const [gasPrice, setGasPrice] = useState(0)
  const [resultComponent, setResultComponent] = useState((<div />))

  function handleComputeRequest(inputInfo: {
    origin: string; destination: string; mpg: number;
    gasPrice: number;
  }): void {
    // can probably restructure this/do some memoization here
    setOrigin(inputInfo.origin)
    setDestination(inputInfo.destination)
    setMpg(inputInfo.mpg)
    setGasPrice(inputInfo.gasPrice)
  }

  /* eslint-disable react/jsx-one-expression-per-line */
  function generateResultDiv(distance: number, duration: string): void {
    const metersToMilesConversion = 0.000621371
    const distanceInMiles = distance * metersToMilesConversion
    const totalCost = Math.round((distanceInMiles / mpg) * gasPrice)
    const component = (
      <Alert variant="success" className="result-div">
        <h4>
          {/* eslint-disable-next-line max-len */}
          Your trip will use approximately ${totalCost} worth of gas and should take about {duration}.
        </h4>
      </Alert>
    )
    setResultComponent(component)
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
            {resultComponent}
          </Col>
          <Col sm={5}>
            <Map
              origin={origin}
              destination={destination}
              handleComputeResult={generateResultDiv}
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
