import React from 'react'

import './Spot.css'

const Spot = ({ text, spotSelected, onOverSpot, index }) => (
  <div
    className={`spot-container ${spotSelected === index ? `selected` : ''}`}
    onMouseOver={() => onOverSpot(index)}
    onMouseLeave={onOverSpot}
  >
    {text}
  </div>
)

export default Spot