import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

// may want to change this to a class
function InputTemplate(props) {
  const {
    // TODO maybe switch to TS to avoid this
    // eslint-disable-nexxt-line react/prop-types
    placeholder, prepend, validationRegex, formIdentifier,
  } = props
  let inputFormNode

  return (
    <InputGroup style={{ marginLeft: 30, marginTop: 10 }} className="mb-3">
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
