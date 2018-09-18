import React from 'react'
import classNames from 'classnames'

import SpotInfo from '../../common/SpotInfo'

if (process.browser) {
  require('./SpotLabel.scss')
}

const SpotLabel = ({
  spot,
  spotHovered,
  onOverSpot,
  status
}) => (
  <div
      className={classNames('spotLabel', status, spotHovered === spot.id && 'onover')}
      onMouseOver={() => onOverSpot(spot.id)}
      onMouseLeave={() => onOverSpot(undefined)}
    >
    {
      spot.stars &&
        <SpotInfo customClasses='stars' text={spot.stars} totalIcons={1} iconClass='fa fa-star'/>
    }
    {
      spot.dificulty &&
        <SpotInfo customClasses='dificulty' totalIcons={1} iconClass={['fa', 'fa-signal', spot.dificulty]}/>
    }
  </div>
)

export default SpotLabel
