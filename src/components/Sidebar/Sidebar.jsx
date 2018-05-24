import React from 'react'

import SpotInfo from '../SpotInfo'

import './Sidebar.css'

const Sidebar = ({
  spots = [],
  onOverSpot,
  spotHovered,
  onSpotClicked,
  spotSelected
}) =>
  <div className="sidebar-container">
    {
      spots.map((spot, index) => {
        return (
          <SpotInfo
            key={index}
            spot={spot}
            spotToRender={true}
            spotSelected={spot.id === spotSelected ? 'selected' : ''}
            isHovered={spot.id === spotHovered ? 'onOver' : '' }
            onSpotClicked={onSpotClicked}
            onClickClose={onSpotClicked}
            onOverSpot={onOverSpot}
          />
        )
      })
    }
  </div>

export default Sidebar