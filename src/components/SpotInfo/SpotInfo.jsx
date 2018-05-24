import React, { Component, Fragment } from 'react'
import Transition from 'react-transition-group/Transition'

import Carousel from '../Carousel'

import './SpotInfo.css'

class SpotInfo extends Component {
  constructor(props){
    super(props)

    this.myInfo = React.createRef()
  }

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

  dummyClick = () => {
    return
  }

  onClosePreventBubble = (ev, id) => {
    const { onSpotClicked = this.dummyClick } = this.props

    ev.stopPropagation()
    onSpotClicked(id)
  }

  render() {
    const {
      spot,
      spotToRender,
      spotSelected = '',
      onClickClose,
      scrollMap,
      onOverSpot = this.dummyClick
    } = this.props

    const { dificulty = '', stars, text, imageList, maxAltitude, routes, id } = spot

    return (
      <Transition
        in={spotToRender}
        timeout={200}
        appear={true}
      >
      {
        status =>
        <div
        ref={this.myInfo}
        className={`spotInfo-container ${status} ${spotSelected}`}
        onClick={(ev) => this.onClosePreventBubble(ev, id)}
        onMouseOver={() => onOverSpot(id)}
        >
          <div className="close" onClick={onClickClose}>
            <i className="fa fa-close"></i>
          </div>
          <div className="slider">
            <Carousel spot={spot}/>
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