import React from 'react'

import './Sidebar.css'

const Sidebar = ({ spots = [], title, onOverSpot, spotHovered, onSpotClicked }) =>
  <div className="side-panel">
    <h2 className="title">{title}</h2>
    <hr/>
    {
      spots.map((element, index) => {
        return (
          <div
            key={index}
            className={`list-sidebar ${spotHovered === index ? 'onover' : ''}`}
            onMouseOver={() => onOverSpot(element.id)}
            onMouseLeave={onOverSpot}
            onClick={() => onSpotClicked(element.id)}
          >
            {element.text}
          </div>
        )
      })
    }
  </div>

export default Sidebar