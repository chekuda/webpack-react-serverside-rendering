import React, { Component } from 'react'
import Transition from 'react-transition-group/Transition'

import Card from '../../common/Card'
import { getMin, getMax } from '../../../utils/math'

if (process.browser) {
  require('./SpotCard.scss')
}

class SpotCard extends Component {
  constructor(props) {
    super(props)

    this.myCard = React.createRef()
    this.transitionHasEnded = this.transitionHasEnded.bind(this)
    this.maxHours = this.props.spot && getMax(this.props.spot.routes.map(({ hours = 0 }) => hours))
    this.minHours = this.props.spot && getMin(this.props.spot.routes.map(({ hours = 0 }) => hours))
  }

  componentDidMount() {
    this.myCard.current.addEventListener('transitionend', this.transitionHasEnded, false)
  }

  componentWillUnmount() {
    this.myCard.current.removeEventListener('transitionend', this.transitionHasEnded, false)
  }

  noop = () => {}

  onClickPreventBubble = (ev, id) => {
    const { onSpotClicked = this.noop } = this.props

    ev.stopPropagation()
    onSpotClicked(id)
  }

  transitionHasEnded = ({ target }) => {
    const { fitSpotCardOnMap, spotSelected, fitInMap } = this.props

    if (spotSelected === 'selected' && fitInMap) {
      fitSpotCardOnMap(target.getBoundingClientRect())
    }
  }

  setCardDetails() {
    const { spot } = this.props
    if (!spot) return []

    return Object.keys(spot).reduce((acc, ele) => {
      switch (ele) {
        case 'title':
          return { ...acc, info: acc.info.concat({ text: spot[ele], customClasses: 'font-20' }) }
        case 'maxHight':
          return { ...acc, info: acc.info.concat({ text: spot[ele], description: 'Max-hight' }) }
        case 'routes':
          return {
            ...acc,
            info: acc.info.concat(
              { text: spot[ele].length, description: 'Routes' },
              // { text: this.maxHours, description: 'Max hours:' },
              // { text: this.minHours, description: 'Min hours:' }
            )
          }
        case 'stars':
          return {
            ...acc,
            rate: acc.rate.concat({
              text: spot[ele], customClasses: ele, totalIcons: spot[ele], iconClass: 'fa fa-star'
            })
          }
        case 'dificulty':
          return { ...acc, rate: acc.rate.concat({ customClasses: 'font-20', totalIcons: 1, iconClass: ['fa', 'fa-signal', spot[ele]] }) }
        case 'imageList':
          return { ...acc, slides: spot[ele] }
        case 'id':
          return { ...acc, id: spot[ele] }
        default:
          return acc
      }
    }, { info: [], rate: [] })
  }

  render() {
    const {
      spotToRender,
      spotSelected = '',
      onClickClose,
      onOverSpot = this.noop,
      isHovered
    } = this.props

    return (
      <Transition
        in={spotToRender}
        timeout={200}
        appear={true}
      >
      {
        status =>
        <div ref={this.myCard} className='spotCard-card'>
          <Card
            customClasses={['spotCard', status, spotSelected, isHovered]}
            handleOnClick={this.onClickPreventBubble}
            onOver={onOverSpot}
            onClose={onClickClose}
            element={this.setCardDetails()}
          />
        </div>
      }
      </ Transition>
    )
  }
}

export default SpotCard
