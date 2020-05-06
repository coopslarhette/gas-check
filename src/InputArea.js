/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import './InputArea.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputTemplate from './InputTemplate'

function InputArea() {
  return (
    <div>
      <Row className="flex-block">
        <Col>
          <InputTemplate {...{ placeholder: 'Enter your origin here.', prepend: 'A' }} />
        </Col>
        <Col>
          <InputTemplate {...{ placeholder: 'Enter your destination here.', prepend: 'B' }} />
        </Col>
      </Row>
      <Row>
        <Col>
          <InputTemplate {...{ placeholder: 'Enter local cost of gas here.', prepend: '$' }} />
        </Col>
        <Col>
          <InputTemplate {...{ placeholder: 'Enter you car\'s mpg here.', prepend: 'η' }} />
        </Col>
      </Row>
    </div>
  )
}

export default InputArea
