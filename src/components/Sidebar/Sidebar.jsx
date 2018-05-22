import React from 'react'

import SpotInfo from '../SpotInfo'

import './Sidebar.css'

const Sidebar = ({ spots = [], title, onOverSpot, spotHovered, onSpotClicked, spotSelected }) =>
  <div className="sidebar-container">
    {
      spots.map((spot, index) => {
        return (
          <SpotInfo
            key={index}
            spot={spot}
            spotSelected={true}
            onSpotClicked={onSpotClicked}
          />
        )
      })
    }
  </div>

export default Sidebar