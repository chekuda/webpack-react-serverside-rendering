import React, { Component } from 'react'

import SpotCard from '../SpotCard'
import SpotLabel from '../SpotLabel'

import './Spot.css'

class Spot extends Component {
  constructor(props) {
    super(props)

    this.mySpotCard = React.createRef()
  }

  getSpotInfoDimensions(spotInfo) {
    const currentSpotInfo = spotInfo.current.myCard.current
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
        onClick={() => onSpotClicked(spot.id, spot.lat, spot.lng, this.getSpotInfoDimensions(this.mySpotCard))}
      >
        <SpotCard
          ref={this.mySpotCard}
          spot={spot}
          spotToRender={spotSelected === spot.id }
          onClickClose={onSpotClicked}
          isHovered={false}
          scrollMap={true}
        />
        <SpotLabel
          spot={spot}
          spotHovered={spotHovered}
          onOverSpot={onOverSpot}
          status={status}
        />
      </div>
    )
  }
}

export default Spot