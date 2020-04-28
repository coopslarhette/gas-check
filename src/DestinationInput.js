import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'


function DestinationInput() {
  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">B</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="Enter you destination"
          aria-label="Destination"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
    </div>
  )
}

export default DestinationInput
