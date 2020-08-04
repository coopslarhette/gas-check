import React, { Component } from 'react'
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

class App extends Component<{}, MyState> {
  constructor(props) {
    super(props)
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      origin: '', destination: '', mpg: 0, gasPrice: 0,
    }
    this.handleComputeRequest = this.handleComputeRequest.bind(this)
  }

  handleComputeRequest(inputInfo: {
    origin: string; destination: string; mpg: number;
    gasPrice: number;
  }): void {
    this.setState({
      origin: inputInfo.origin,
      destination: inputInfo.destination,
      mpg: inputInfo.mpg,
      gasPrice: inputInfo.gasPrice,
    })
  }

  render(): JSX.Element {
    const { origin, destination } = this.state
    return (
      <div className="App">
        <Container>
          <GaugeNavBar />
          {/* ideally we want this to wrap the map to the bottom aat 768px width as that's the
        smallest width the input boxes still render nicely at TODO will fix later probably ;) */}
          <Row className="interactionSpace">
            <Col sm={7}>
              <InputArea handleClick={this.handleComputeRequest} />
              {/*  output area */}
            </Col>
            <Col sm={5}>
              <Map
                request={{ origin, destination, travelMode: 'DRIVING' }}
              />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default App
