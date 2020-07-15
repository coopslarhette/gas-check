import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { render } from '@testing-library/react'
import InputTemplate from '../InputTemplate'

describe('Input template component', () => {
  let validateChange: (string, boolean) => void
  let validity: boolean
  beforeEach(() => {
    validateChange = (_: string, isValid: boolean): void => {
      validity = isValid
    }
  })

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<InputTemplate
      placeholder="Test"
      prepend="A"
      isValidInput={validateChange}
      validationRegex={/.*/}
      formIdentifier="test"
    />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('renders all parts correctly', () => {
    const tree = renderer
      .create(<InputTemplate
        placeholder="Test"
        prepend="A"
        isValidInput={validateChange}
        validationRegex={/.*/}
        formIdentifier="test"
      />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('calls on function in isValidInput with a false boolean when input is empty', () => {
    const div = document.createElement('div')
    ReactDOM.render(<InputTemplate
      placeholder="Test"
      prepend="A"
      isValidInput={validateChange}
      validationRegex={/.+/}
      formIdentifier="test"
    />, div)

    expect(validity).toBeFalsy()
    ReactDOM.unmountComponentAtNode(div)
  })

  const setup = () => {
    const utils = render(<InputTemplate
      placeholder="Test"
      prepend="A"
      isValidInput={validateChange}
      validationRegex={/test/}
      formIdentifier="test"
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
