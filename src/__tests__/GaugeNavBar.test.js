import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import GaugeNavBar from '../GaugeNavBar'

describe('Nav bar component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<GaugeNavBar />, div)
  })

  it('renders all parts correctly', () => {
    const tree = renderer
      .create(<GaugeNavBar />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
