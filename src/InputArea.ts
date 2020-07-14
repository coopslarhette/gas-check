import React from 'react'
import './InputArea.css'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import InputTemplate from './InputTemplate'

function InputArea() {
  const validators = {
    origin: false,
    destination: false,
    gasCost: false,
    mpg: false,
  }

  let buttonNodeRef

  const validateChange = (formIdentifier, isValid) => {
    validators[formIdentifier] = isValid
    // TODO may be a better/more reacty place to put this
    buttonNodeRef.disabled = !(validators.origin && validators.origin && validators.gasCost
      && validators.mpg)
  }

  return (
    <div className="flex-block">
      <Row>
        <div className="inputRow">
          <InputTemplate
            placeholder="Enter your origin."
            prepend="A"
            isValidInput={validateChange}
            validationRegex={/[a-z0-9]+/i}
            formIdentifier="origin"
          />
          <InputTemplate
            placeholder="Enter your destination."
            prepend="B"
            isValidInput={validateChange}
            validationRegex={/[a-z0-9]+/i}
            formIdentifier="destination"
          />
        </div>
      </Row>
      <Row>
        <div className="inputRow">
          <InputTemplate
            class="input"
            placeholder="Enter local cost of gas here."
            prepend="$"
            isValidInput={validateChange}
            validationRegex={/^\d(\.\d{1,2})?$/}
            formIdentifier="gasCost"
          />
          <InputTemplate
            class="input"
            placeholder="Enter you car's mpg here."
            prepend="η"
            isValidInput={validateChange}
            validationRegex={/^\d{1,3}(\.\d+)?$/}
            formIdentifier="mpg"
          />
        </div>
      </Row>
      <Button
        size="lg"
        style={{
          '#53afed', border: '1 px #53afed', color: 'black', marginBottom: '15px',
        }}
        ref={(ref) => {
          // eslint-disable-next-line no-param-reassign
          buttonNodeRef = ref
        }}
        disabled
      >
        Compute Cost!
      </Button>
    </div>
  )
}

export default InputArea
