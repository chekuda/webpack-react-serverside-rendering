import React, { Component, Fragment } from 'react'
import Transition from 'react-transition-group/Transition'

import './SpotInfo.css'

class SpotInfo extends Component {
  render() {
    const { element, spotSelected, onSpotClicked } = this.props
    const { dificulty = '', stars, text, imageList } = element
    return (
      <Transition
        in={spotSelected}
        timeout={100}
        appear={true}
      >
      {
        status =>
        <div className={`spotInfo ${status}`}>
          <div className="close" onClick={onSpotClicked}>
            <i class="fa fa-close"></i>
          </div>
          <div className="slider">
            <img className="slide" src={imageList[0]} />
          </div>
          <div className="info">
            <div className="name">{text}</div>
            <div className="rate">
              <div className="stars"><i className="fa fa-star" aria-hidden="true"></i></div>
              <div className={`dificulty ${dificulty}`}><i className={`fa fa-signal ${dificulty}`}></i></div>
            </div>
          </div>
        </div>
      }
      </ Transition>
    )
  }
}

export default SpotInfo