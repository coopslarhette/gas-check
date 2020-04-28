import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'


function GasCostInput() {
  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="Enter local cost for a gallon of gas"
          aria-label="Destination"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
    </div>
  )
}

export default GasCostInput
