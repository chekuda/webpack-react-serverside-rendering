import React, { Component } from 'react'

import SpotCard from '../SpotCard'
import SpotLabel from '../SpotLabel'

import './Spot.css'

class Spot extends Component {
  constructor(props) {
    super(props)

    this.mySpotCard = React.createRef()
    this.state = {
      cachedSpotSelected: null
    }
  }

  render() {
    const {
      spot,
      spotHovered,
      onOverSpot,
      spotSelected,
      onSpotClicked,
      status,
      fitSpotCardOnMap
    } = this.props

    return (
      <div className="spot-container"
        onClick={() => onSpotClicked(spot.id)}
      >
        <SpotCard
          ref={this.mySpotCard}
          spot={spot}
          spotToRender={spotSelected === spot.id }
          spotSelected={spot.id === spotSelected ? 'selected' : ''}
          onClickClose={onSpotClicked}
          isHovered={false}
          scrollMap={true}
          from='spot-container'
          fitSpotCardOnMap={fitSpotCardOnMap}
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