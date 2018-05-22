import React, { Component } from 'react'

import './Carousel.css'


class Carousel extends Component {
  constructor(props){
    super(props)

    this.slides = this.props.spot.imageList || []
    this.state = {
      slideSelected: 0,
      onOverClass: ''
    }
  }

  handleChangeSlide = (index) => {
    let newSlide = this.state.slideSelected + index

    switch(newSlide) {
      case this.slides.length:
        newSlide = 0
        break
      case -1:
        newSlide = this.slides.length -1
        break
    }

    this.setState({
      slideSelected: newSlide
    })
  }

  displayShadow = () => {
    this.setState({
      onOverClass: 'onOver'
    })
  }

  removeShadow = () => {
    this.setState({
      onOverClass: ''
    })
  }

  render() {
    return(
      <div className="carousel-container"
        onMouseOver={this.displayShadow}
        onMouseLeave={this.removeShadow}
      >
        {
          this.slides.map((ele, index) =>
            this.state.slideSelected === index
            ? <div key={index} className="slide" style={{ backgroundImage: `url(${ele}`}}></div>
            : null
          )
        }
        {
          this.slides.length > 1 &&
            <div className="controls">
              <div className="arrows">
                <div className={`left ${this.state.onOverClass}`} >
                  <i className="fa fa-angle-left" aria-hidden="true" onClick={() => this.handleChangeSlide(1)}></i>
                </div>
                <div className={`right ${this.state.onOverClass}`}>
                  <i className="fa fa-angle-right" aria-hidden="true" onClick={() => this.handleChangeSlide(-1)}></i>
                </div>
              </div>
            </div>
        }
      </div>
    )
  }
}

export default Carousel
