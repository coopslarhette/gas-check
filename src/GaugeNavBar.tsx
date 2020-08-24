import React from 'react'
import './GaugeNavBar.css'
import Navbar from 'react-bootstrap/Navbar'
import NavbarBrand from 'react-bootstrap/NavbarBrand'
import GitHubLogo from './img/github-logo.png'

function GaugeNavBar(): JSX.Element {
  return (
    <div className="GaugeNavBar">
      <Navbar>
        <NavbarBrand href="https://coopslarhette.github.io/gauge/">
          Gauge
        </NavbarBrand>
        <div className="ml-auto">
          <a href="https://github.com/coopslarhette">
            <img className="github-logo" alt="github page" src={GitHubLogo} />
          </a>
        </div>
      </Navbar>
    </div>
  )
}

export default GaugeNavBar
