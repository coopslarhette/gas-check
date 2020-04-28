import React from 'react'
import './InputArea.css'
import Row from 'react-bootstrap/Row'
import InputTemplate from './InputTemplate'

function InputArea() {
  const originInput = new InputTemplate({ placeholder: 'Enter you origin here.', prepend: 'A' })
  const destinationInput = new InputTemplate({ placeholder: 'Enter you destination here.', prepend: 'B' })
  const gasCostInput = new InputTemplate({ placeholder: 'Enter local cost of gas here.', prepend: '$' })
  const mpgInput = new InputTemplate({ placeholder: 'Enter you car\'s mpg here.', prepend: 'η' })

  return (
    <div>
      <Row>
        {originInput}
        {destinationInput}
      </Row>
      <Row>
        {gasCostInput}
        {mpgInput}
      </Row>
    </div>
  )
}

export default InputArea
