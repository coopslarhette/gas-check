import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import './InputTemplate.css'

type PropTypes = {
  placeholder: string; prepend: string; validationRegex: RegExp; formIdentifier: string;
  validateChange: (formIdentifier: string, isValid: boolean) => void;
  storeInputValue: (formValue: string, formIdentifier: string) => void;
}

function InputTemplate({
  placeholder, prepend, validationRegex, formIdentifier, validateChange, storeInputValue,
}: PropTypes): JSX.Element {
  let inputFormNode

  return (
    <InputGroup className="mb-3">
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
        onChange={(): void => {
          validateChange(formIdentifier, validationRegex.test(inputFormNode.value))
          storeInputValue(inputFormNode.value, formIdentifier)
        }}
      />
    </InputGroup>
  )
}

export default InputTemplate
