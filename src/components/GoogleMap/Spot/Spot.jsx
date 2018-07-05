import React from 'react'

import SpotCard from '../SpotCard'
import SpotLabel from '../SpotLabel'

if (process.browser) {
  require('./Spot.scss')
}

const Spot = ({
  spot,
  status,
  fitSpotCardOnMap,
  spotSelected,
  spotHovered,
  handleSpotSeleted,
  handleSpotHovered,
  handleSpotUnselected
}) => {
  return (
    <div className="spot-container"
      onClick={() => handleSpotSeleted(spot.id)}
    >
      <SpotCard
        spot={spot}
        spotToRender={spotSelected === spot.id }
        spotSelected={spot.id === spotSelected ? 'selected' : ''}
        fitInMap={true}
        isHovered={false}
        fitSpotCardOnMap={fitSpotCardOnMap}
        onClickClose={handleSpotUnselected}
      />
      <SpotLabel
        spot={spot}
        spotHovered={spotHovered}
        onOverSpot={handleSpotHovered}
        status={status}
      />
    </div>
  )
}

export default Spot
