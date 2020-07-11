import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import './InputTemplate.css'

function InputTemplate(props) {
  const {
    // TODO maybe switch to TS to avoid this
    // eslint-disable-next-line react/prop-types
    placeholder, prepend, validationRegex, formIdentifier,
  } = props
  let inputFormNode

  return (
    <InputGroup className="mb-3 input-group">
      <InputGroup.Prepend>
        <InputGroup.Text id="basic-addon1">{prepend}</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        placeholder={placeholder}
        aria-label="Input"
        aria-describedby="basic-addon1"
        ref={(ref) => {
          inputFormNode = ref
        }}
        onChange={() => {
          // eslint-disable-next-line react/prop-types
          props.isValidInput(formIdentifier, validationRegex.test(inputFormNode.value))
        }}
      />
    </InputGroup>
  )
}

export default InputTemplate
