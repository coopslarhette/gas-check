/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import './InputArea.css'
import Row from 'react-bootstrap/Row'
import InputTemplate from './InputTemplate'

function InputArea() {
  return (
    <div>
      <Row className="flex-block">
        <div className="inputRow">
          <InputTemplate {...{ placeholder: 'Enter your origin.', prepend: 'A' }} />
          <InputTemplate {...{ placeholder: 'Enter your destination.', prepend: 'B' }} />
        </div>
      </Row>
      <Row>
        <div className="inputRow">
          <InputTemplate class="input" {...{ placeholder: 'Enter local cost of gas here.', prepend: '$' }} />
          <InputTemplate class="input" {...{ placeholder: 'Enter you car\'s mpg here.', prepend: 'η' }} />
        </div>
      </Row>
    </div>
  )
}

export default InputArea
