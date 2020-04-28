import React from 'react'
import './GaugeNavBar.css'
import Navbar from 'react-bootstrap/Navbar'
import NavbarBrand from 'react-bootstrap/NavbarBrand'

function GaugeNavBar() {
  return (
    <div className="GaugeNavBar">
      <Navbar>
        <NavbarBrand href="https://coopslarhette.github.io/gauge/">
          Gauge
        </NavbarBrand>
        <div className="ml-auto">
          <a href="https://github.com/coopslarhette">
            <img alt={'github page'} src="../public/github-logo.png"/>
          </a>
        </div>
      </Navbar>
    </div>
  )
}

export default GaugeNavBar
