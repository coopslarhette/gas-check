import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

// may want to change this to a class
function InputTemplate(props) {
  // TODO
  // eslint-disable-next-line react/prop-types
  const { placeholder, prepend } = props
  return (
    <InputGroup style={{ marginLeft: 30, marginTop: 10 }} className="mb-3">
      <InputGroup.Prepend>
        <InputGroup.Text id="basic-addon1">{prepend}</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        placeholder={placeholder}
        aria-label="Input"
        aria-describedby="basic-addon1"
      />
    </InputGroup>
  )
}

export default InputTemplate
