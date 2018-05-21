import React, { Component } from 'react'
import Transition from 'react-transition-group/Transition'

import SpotInfo from '../SpotInfo'

import './Spot.css'

class Spot extends Component {
  render() {
    const { element, spotHovered, onOverSpot, spotSelected, onSpotClicked } = this.props

    return (
      <div className="spot-container">
      <SpotInfo
        element={element}
        spotSelected={spotSelected === element.id }
        onSpotClicked={onSpotClicked}
      />
      <Transition
        in={true}
        timeout={100}
        appear={true}
      >
      {
        status =>
        <div
          className={`spot ${status} ${spotHovered === element.id ? 'onover' : ''}`}
          onMouseOver={() => onOverSpot(element.id)}
          onMouseLeave={onOverSpot}
          onClick={() => onSpotClicked(element.id)}
        >
          {element.text}
        </div>
      }
      </ Transition>
    </div>
    )
  }
}

export default Spot