import React from 'react'
import ReactDOM, { unmountComponentAtNode } from 'react-dom'
import renderer from 'react-test-renderer'
import { render } from '@testing-library/react'
import InputTemplate from '../input/InputTemplate'

describe('Input template component', () => {
  let validateChange: (formIdentifier: string, isValid: boolean) => void
  let validity: boolean
  let div: HTMLDivElement
  let storeInputValue: (formValue: string | number, formIdentifier: string) => void
  let values: { origin: string, destination: string, mpg: number, gasPrice: number }

  beforeEach(() => {
    div = document.createElement('div')
    document.body.appendChild(div)
    validateChange = (_: string, isValid: boolean): void => {
      validity = isValid
    }
    values = {
      origin: '', destination: '', mpg: 0, gasPrice: 0,
    }
    storeInputValue = (formValue, formIdentifier) => {
      values[formIdentifier] = formValue
    }
  })

  afterEach(() => {
    unmountComponentAtNode(div)
    div.remove()
  })

  it('renders without crashing', () => {
    ReactDOM.render(<InputTemplate
      placeholder="Test"
      prepend="A"
      validateChange={validateChange}
      validationRegex={/.*/}
      formIdentifier="test"
      storeInputValue={storeInputValue}
    />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('renders all parts correctly', () => {
    const tree = renderer
      .create(<InputTemplate
        placeholder="Test"
        prepend="A"
        validateChange={validateChange}
        validationRegex={/.*/}
        formIdentifier="test"
        storeInputValue={storeInputValue}
      />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('calls on function in isValidInput with a false boolean when input is empty', () => {
    ReactDOM.render(<InputTemplate
      placeholder="Test"
      prepend="A"
      validateChange={validateChange}
      validationRegex={/.+/}
      formIdentifier="test"
      storeInputValue={storeInputValue}
    />, div)

    expect(validity).toBeFalsy()
    ReactDOM.unmountComponentAtNode(div)
  })

  // replace with act()
  const setup = () => {
    const utils = render(<InputTemplate
      placeholder="Test"
      prepend="A"
      validateChange={validateChange}
      validationRegex={/test/}
      formIdentifier="test"
      storeInputValue={storeInputValue}
    />)
    console.log(utils.baseElement)
    return utils
  }

  // it('calls on function in isValidInput with a true boolean when input is valid', () => {
  //   // const input = setup()
  //   const div = document.createElement('div')
  //   ReactDOM.render(<InputTemplate
  //     placeholder="Test"
  //     prepend="A"
  //     isValidInput={validateChange}
  //     validationRegex={/.+/}
  //     formIdentifier="test"
  //   />, div)
  //
  //   console.log(div)
  //   // fireEvent.change(input, { target: { value: '23' } })
  //   expect(validity).toBeTruthy()
  // })
})
