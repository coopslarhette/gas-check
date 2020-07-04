import React from 'react'
import './App.css'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import GaugeNavBar from './GaugeNavBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import InputOutputArea from './InputOutputArea'
import Map from './Map'

function App() {
  return (
    <div className="App">
      <Container>
        <GaugeNavBar />
        <Row className="interactionSpace">
          <Col sm={7}>
            <InputOutputArea />
          </Col>
          <Col sm={4}>
            <Map />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
