import React from 'react'

import SpotCard from '../SpotCard'

import './Sidebar.css'

const Sidebar = ({
  spots = [],
  onOverSpot,
  spotHovered,
  onSpotClicked,
  spotSelected,
  fitSpotCardOnMap
}) =>
  <div className="sidebar-container">
    {
      spots.map((spot, index) => {
        return (
          <SpotCard
            key={spot.id}
            from='sidebar-container'
            spot={spot}
            spotToRender={true}
            spotSelected={spot.id === spotSelected ? 'selected' : ''}
            isHovered={spot.id === spotHovered ? 'onOver' : '' }
            onSpotClicked={onSpotClicked}
            onClickClose={onSpotClicked}
            onOverSpot={onOverSpot}
            fitSpotCardOnMap={fitSpotCardOnMap}
          />
        )
      })
    }
  </div>

export default Sidebar