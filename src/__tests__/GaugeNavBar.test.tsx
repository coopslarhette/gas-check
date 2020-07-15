import React from 'react'
import ReactDOM, { unmountComponentAtNode } from 'react-dom'
import renderer from 'react-test-renderer'
import GaugeNavBar from '../GaugeNavBar'

describe('Nav bar component', () => {
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
    ReactDOM.render(<GaugeNavBar />, div)
  })

  it('renders all parts correctly', () => {
    const tree = renderer
      .create(<GaugeNavBar />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
