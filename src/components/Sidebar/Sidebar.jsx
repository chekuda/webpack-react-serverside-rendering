import React from 'react'

import './Sidebar.css'

const Sidebar = ({ spots = [], title, onOverSpot, spotSelected }) =>
  <div className="side-panel">
    <h2 className="title">{title}</h2>
    <hr/>
    {
      spots.map((element, index) => {
        return (
          <div
            key={index}
            className={`list-sidebar ${spotSelected === index ? 'selected' : ''}`}
            onMouseOver={() => onOverSpot(index)}
            onMouseLeave={onOverSpot}
          >
            {element.text}
          </div>
        )
      })
    }
  </div>

export default Sidebar