import React from 'react'
import ReactDOM, { unmountComponentAtNode } from 'react-dom'
import renderer from 'react-test-renderer'
import App from '../App'

describe('App component', () => {
  let div: HTMLDivElement
  beforeEach(() => {
    div = document.createElement('div')
    document.body.appendChild(div)
  })

  afterEach(() => {
    unmountComponentAtNode(div)
    div.remove()
  })

  it('renders without crashing', () => {
    ReactDOM.render(<App />, div)
  })

  it('renders all parts correctly', () => {
    const tree = renderer
      .create(<App />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
