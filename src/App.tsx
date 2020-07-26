import React from 'react'
import './App.css'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import GaugeNavBar from './GaugeNavBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import Map from './Map'
import InputArea from './InputArea'

function App(): JSX.Element {
  let request: { origin: string; destination: string; travelMode: string } | null = null

  const startMapRequest = (origin: string, destination: string): void => {
    request = {
      origin,
      destination,
      travelMode: 'DRIVING',
    }
  }
  return (
    <div className="App">
      <Container>
        <GaugeNavBar />
        {/* ideally we want this to wrap the map to the bottom aat 768px width as that's the
        smallest width the input boxes still render nicely at TODO will fix later probably */}
        <Row className="interactionSpace">
          <Col sm={7}>
            <InputArea handleClick={startMapRequest} />
            {/*  output area */}
          </Col>
          <Col sm={5}>
            <Map request={request} />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
