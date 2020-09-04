import React, { useEffect, useState } from 'react'
import './InputArea.css'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import InputTemplate from './InputTemplate'

type PropTypes = {
  handleClick: (inputInfo: {
    origin: string; destination: string; mpg: number; gasPrice: number;
  }) => void;
}

function InputArea({ handleClick }: PropTypes): JSX.Element {
  const [validators, setValidators] = useState({
    origin: false,
    destination: false,
    gasPrice: false,
    mpg: false,
  })

  const [inputValues, setInputValues] = useState({
    origin: '',
    destination: '',
    mpg: 0,
    gasPrice: 0,
  })

  let buttonNodeRef

  useEffect(() => {
    buttonNodeRef.disabled = !(validators.origin && validators.origin && validators.gasPrice
      && validators.mpg)
  })

  const storeValidity = (formIdentifier: string, isValid: boolean): void => {
    setValidators({ ...validators, [formIdentifier]: isValid })
  }

  const storeInputValue = (formValue: number | string, formIdentifier: string): void => {
    setInputValues({ ...inputValues, [formIdentifier]: formValue })
  }

  return (
    <div className="flex-block">
      <Row>
        <div className="inputRow">
          <InputTemplate
            placeholder="Enter your origin."
            prepend="A"
            validateChange={storeValidity}
            storeInputValue={storeInputValue}
            validationRegex={/[a-z0-9]+/i}
            formIdentifier="origin"
          />
          <InputTemplate
            placeholder="Enter your destination."
            prepend="B"
            validateChange={storeValidity}
            storeInputValue={storeInputValue}
            validationRegex={/[a-z0-9]+/i}
            formIdentifier="destination"
          />
        </div>
      </Row>
      <Row>
        <div className="inputRow">
          <InputTemplate
            placeholder="Enter local cost of gas here."
            prepend="$"
            validateChange={storeValidity}
            storeInputValue={storeInputValue}
            validationRegex={/^\d(\.\d{1,2})?$/}
            formIdentifier="gasPrice"
          />
          <InputTemplate
            placeholder="Enter you car's mpg here."
            prepend="η"
            validateChange={storeValidity}
            storeInputValue={storeInputValue}
            validationRegex={/^\d{1,3}(\.\d+)?$/}
            formIdentifier="mpg"
          />
        </div>
      </Row>
      <Button
        size="lg"
        ref={(ref): void => {
          buttonNodeRef = ref
        }}
        onClick={(): void => handleClick(inputValues)}
      >
        Compute Cost!
      </Button>
    </div>
  )
}

export default InputArea
