import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'


function InputTemplate(props) {
  const { placeholder, prepend } = props
  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">{prepend}</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder={placeholder}
          aria-label="Input"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
    </div>
  )
}

export default InputTemplate
