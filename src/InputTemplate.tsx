import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import './InputTemplate.css'

type Props = {
  placeholder: string
  prepend: string
  validationRegex: RegExp
  formIdentifier: string
  validateChange: (formIdentifier: string, isValid: boolean) => void
  storeInputValue: (formValue: string, formIdentifier: string) => void
}

function InputTemplate(props: Props): JSX.Element {
  const {
    placeholder, prepend, validationRegex, formIdentifier,
  } = props
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
          props.validateChange(formIdentifier, validationRegex.test(inputFormNode.value))
          props.storeInputValue(inputFormNode.value, formIdentifier)
        }}
      />
    </InputGroup>
  )
}

export default InputTemplate
