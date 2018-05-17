import React, { Component } from 'react'
import GoogleMap from 'google-map-react'

import './App.css'

const AnyReactComponent = ({ text }) => (
  <div style={{
    color: 'white',
    background: 'red',
    padding: '15px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>
    {text}
  </div>
)

class App extends Component {
  constructor(props){
    super(props)
    this.center = {
      lat: 46.41,
      lng: 11.84
    }
    this.zoom = 6
  }
  render() {
    return (
      <div className="gm-container">
        <GoogleMap
          defaultCenter={this.center}
          defaultZoom={this.zoom}
        >
          <AnyReactComponent
            lat={46.4102}
            lng={11.8440}
            text={'Dolomites'}
          />
          <AnyReactComponent
            lat={46.4202}
            lng={12.8440}
            text={'Dolomites'}
          />
        </GoogleMap>
      </div>
    )
  }
}

export default App
