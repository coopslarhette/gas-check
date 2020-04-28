import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'


function OriginInput() {
  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">A</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="Enter you origin"
          aria-label="Origin"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
    </div>
  )
}

export default OriginInput
