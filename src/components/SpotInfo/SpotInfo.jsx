import React, { Component, Fragment } from 'react'
import Transition from 'react-transition-group/Transition'

import './SpotInfo.css'

class SpotInfo extends Component {
  drawStars(stars = 0) {
    const arrayStars = Array(stars).fill(1)
    return (
      <div className="area stars">
        {stars}
        {
          arrayStars.map((ele, index) => (
          <i key={index} className="fa fa-star" aria-hidden="true"></i>
          ))
        }
      </div>
    )
  }

  render() {
    const { element, spotSelected, onSpotClicked } = this.props
    const { dificulty = '', stars, text, imageList, maxAltitude, routes } = element

    return (
      <Transition
        in={spotSelected}
        timeout={200}
        appear={true}
      >
      {
        status =>
        <div className={`spotInfo ${status}`}>
          <div className="close" onClick={onSpotClicked}>
            <i className="fa fa-close"></i>
          </div>
          <div className="slider">
            <img className="slide" src={imageList[0]} />
          </div>
          <div className="info">
            <div className="area name">{text}</div>
            <div className="area">Max-hight: {maxAltitude}</div>
            <div className="area">Routes: {routes}</div>
            <div className="rates">
              {this.drawStars(stars)}
              <div className='area dificulty'>
                <i className={`fa fa-signal ${dificulty}`}></i>
              </div>
            </div>
          </div>
        </div>
      }
      </ Transition>
    )
  }
}

export default SpotInfo