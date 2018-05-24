import React, { Component } from 'react'

import SpotCard from '../SpotCard'

import './SpotLabel.css'

const SpotLabel = ({
  spot,
  spotHovered,
  onOverSpot,
  status
}) => (
    <div
        className={`spotLabel ${status} ${spotHovered === spot.id ? 'onover' : ''}`}
        onMouseOver={() => onOverSpot(spot.id)}
        onMouseLeave={onOverSpot}
      >
      <div className="area stars">
        {spot.stars} <i className="fa fa-star" aria-hidden="true"></i>
      </div>
      <div className="area dificulty">
        <i className={`fa fa-signal ${spot.dificulty}`}></i>
      </div>
    </div>
  )

export default SpotLabel