import React, { Component } from 'react'

import SpotInfo from '../SpotInfo'

import './Spot.css'

class Spot extends Component {
  render() {
    const {
      spot,
      spotHovered,
      onOverSpot,
      spotSelected,
      onSpotClicked,
      status
    } = this.props

    return (
      <div className="spot-container">
        <SpotInfo
          spot={spot}
          spotSelected={spotSelected === spot.id }
          onSpotClicked={onSpotClicked}
        />
        <div
          className={`spot ${status} ${spotHovered === spot.id ? 'onover' : ''}`}
          onMouseOver={() => onOverSpot(spot.id)}
          onMouseLeave={onOverSpot}
          onClick={() => onSpotClicked(spot.id)}
        >
          <div className="area stars">
            {spot.stars} <i className="fa fa-star" aria-hidden="true"></i>
          </div>
          <div className="area dificulty">
            <i className={`fa fa-signal ${spot.dificulty}`}></i>
          </div>
        </div>
      </div>
    )
  }
}

export default Spot