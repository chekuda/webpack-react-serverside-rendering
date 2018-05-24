import React, { Component } from 'react'

import SpotInfo from '../SpotInfo'

import './Spot.css'

class Spot extends Component {
  constructor(props) {
    super(props)

    this.mySpotInfo = React.createRef()
  }

  getSpotInfoDimensions(spotInfo) {
    const currentSpotInfo = spotInfo.current.myInfo.current
    return {
      bouding: currentSpotInfo.getBoundingClientRect(),
      clientHeight: currentSpotInfo.clientHeight
    }
  }

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
      <div className="spot-container"
        onClick={() => onSpotClicked(spot.id, spot.lat, spot.lng, this.getSpotInfoDimensions(this.mySpotInfo))}
      >
        <SpotInfo
          ref={this.mySpotInfo}
          spot={spot}
          spotToRender={spotSelected === spot.id }
          onClickClose={onSpotClicked}
          scrollMap={true}
        />
        <div
          className={`spot ${status} ${spotHovered === spot.id ? 'onover' : ''}`}
          onMouseOver={() => onOverSpot(spot.id)}
          onMouseLeave={onOverSpot}
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