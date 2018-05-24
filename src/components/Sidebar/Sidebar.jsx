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
            spotHovered={spotHovered}
            onSpotClicked={onSpotClicked}
            onClickClose={onSpotClicked}
            onOverSpot={onOverSpot}
          />
        )
      })
    }
  </div>

export default Sidebar