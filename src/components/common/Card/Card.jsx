import React, { Component } from 'react'
import classNames from 'classnames'

import Carousel from '../../common/Carousel'
import SpotInfo from '../../common/SpotInfo'

if (process.browser) {
  require('./Card.scss')
}

class Card extends Component {
  render() {
    const {
      element,
      customClasses,
      handleOnClick,
      onOver,
      onClose
    } = this.props

    return (
      <div
          className={classNames(customClasses)}
          onClick={ev => handleOnClick(ev, element.id)}
          onMouseOver={() => onOver(element.id)}
        >
          <div className='close' onClick={onClose}>
            <i className='fa fa-close'></i>
          </div>
          <div className='slider'>
            <Carousel slides={element.slides}/>
          </div>
          {
            element.info && element.info.length > 0 &&
              <div className='info'>
              {
                element.info.map((ele, index) =>
                  <SpotInfo
                    key={index}
                    text={ele.text}
                    customClasses={ele.customClasses}
                    description={ele.description}
                  />
                )
              }
              {
                element.rate && element.rate.length > 0 &&
                 <div className='rates'>
                  {
                    element.rate.map((ele, index) =>
                      <SpotInfo
                        key={index}
                        text={ele.text}
                        customClasses={ele.customClasses}
                        description={ele.description}
                        totalIcons={ele.totalIcons}
                        iconClass={ele.iconClass}
                      />
                    )
                  }
                  </div>
                }
                </div>
              //   <SpotInfo text={text} customClasses='font-20'/>
              //   { maxAltitude && <SpotInfo text={maxAltitude} description='Max-hight:'/> }
              //   { routes.length && <SpotInfo text={routes.length} description='Routes:'/> }
              //   {/* { this.maxHours !== 0 && <SpotInfo text={maxHours} description='Max hours:'/> }
              //   { this.minHours !== 0 && <SpotInfo text={minHours} description='Min hours:'/> } */}
              //   <div className='rates'>
              //     { stars && <SpotInfo text={stars} customClasses='stars' totalIcons={stars} iconClass={'fa fa-star'}/> }
              //     { dificulty && <SpotInfo totalIcons={1} customClasses='font-20' iconClass={  dificulty]}/> }
              //   </div>
              // </div>
          }
        </div>
    )
  }
}

export default Card
