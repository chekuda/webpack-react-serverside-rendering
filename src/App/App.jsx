import React, { Component } from 'react'
import GoogleMap from 'google-map-react'
import { fitBounds } from 'google-map-react/utils'
import Transition from 'react-transition-group/Transition'

import Spot from '../components/Spot'
import Sidebar from '../components/Sidebar'
import SpotList from '../../server/dummySpots'
import getOffset from '../helpers'

import './App.css'

const DefaultProps = {
  center: {
    lat: 8.41,
    lng: 10.84
  },
  zoom: 6
}

const getMin = (arr) => Math.min(...arr)
const getMax = (arr) => Math.max(...arr)


class App extends Component {
  constructor(props){
    super(props)

    this.continentSelected = this.props.continentSelected || 'europe'
    this.mapContainer = React.createRef()
    this.allSpots = SpotList()[this.continentSelected]
    this.defaultMapProps = this.setDefaultProps()
    this.hasBeenRendered = false // To avoid first googleMap rendering bounce
    this.state = {
      spotsToRender: this.allSpots,
      center: this.defaultMapProps.center,
      zoom: this.defaultMapProps.zoom,
      cachedSpotSelected: null
    }
    this.myMap = React.createRef()
    this.mySpot = React.createRef()
  }

  setDefaultProps() {
    if(this.allSpots.length) {
      return {
        center: {
          lat: this.allSpots[0].lat,
          lng: this.allSpots[0].lng
        },
        zoom: 6
      }
    }
    return DefaultProps
  }

  setFirstViewMap(spots, size) {
    const lat = spots.map(ele => ele.lat)
    const lng = spots.map(ele => ele.lng)

    const bounds = {
      nw: {
        lat: getMax(lat),
        lng: getMin(lng)
      },
      se: {
        lat: getMin(lat),
        lng: getMax(lng)
      }
    }

    return fitBounds(bounds, size)
  }

  componentDidMount(){
    const size = {
      width: this.mapContainer.current.offsetWidth,
      height: this.mapContainer.current.offsetHeight
    }
    const { zoom, center } = this.setFirstViewMap(this.state.spotsToRender, size)
    this.setState({
      center,
      zoom: zoom
    })
  }

  setSpotsToRender = ({ zoom, center, bounds }) => {
    if(!this.hasBeenRendered){
      this.hasBeenRendered = true
    } else {
      const newSpotsToRender = this.allSpots
        .filter(ele =>
          ele.lat < bounds.ne.lat &&
          ele.lat > bounds.se.lat &&
          ele.lng > bounds.nw.lng &&
          ele.lng < bounds.se.lng
        )

      this.setState({
        spotsToRender: newSpotsToRender
      })
    }
  }

  handleSpotHovered = (id) => {
    this.setState({
      spotHovered: id
    })
  }

  fitSpotCardOnMap = ({ top, right, left }) => {
    let nCenter = null
    const mapRightDistance = this.myMap.current.boundingRect_.right
    const mapLeftDistance = this.myMap.current.boundingRect_.left

    if(this.state.spotSelected !== this.state.cachedSpotSelected){
      const newRight = mapRightDistance - right
      const offsetHeight = top <= 20 ? top - 20 : 0
      const offSetRight = newRight <= 20 ? newRight - 20 : 0
      const offSetLeft = left <= 20 ? (left * -1) + mapLeftDistance + 20 : 0

      if(offsetHeight || offSetLeft || offSetRight) {
        const offSetWidth = offSetRight < 0 ? offSetRight : offSetLeft
        nCenter = getOffset(this.myMap.current.map_, offSetWidth, offsetHeight)
      }

      this.setState({
        cachedSpotSelected: this.state.spotSelected,
        center: nCenter
          ? {
            lat: nCenter.lat(),
            lng: nCenter.lng()
          }
          : this.state.center
      })
    }

  }

  handleSpotSeleted = (id) => {
     this.setState({
      spotSelected: id
     })
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-0 col-sm-8 googlemap-container" ref={this.mapContainer}>
          <GoogleMap
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
            center={this.state.center}
            onChange={this.setSpotsToRender}
            onChildMouseUp={this.isWithinBounds}
            ref={this.myMap}
          >
          { this.allSpots.map((spot, index) => (
              <Transition
                key={index}
                lat={spot.lat}
                lng={spot.lng}
                in={this.state.spotsToRender.includes(spot)}
                timeout={300}
                appear={true}
              >
                {
                  status =>(
                    <Spot
                      status={status}
                      spot={spot}
                      fitSpotCardOnMap={this.fitSpotCardOnMap}
                      spotSelected={this.state.spotSelected}
                      spotHovered={this.state.spotHovered}
                      onOverSpot={this.handleSpotHovered}
                      onSpotClicked={this.handleSpotSeleted}
                    />
                  )
                }
              </ Transition>
            ))
          }
          </GoogleMap>
          </div>
          <div className="col-xs-12 col-sm-4">
            <Sidebar
              title='Hikes'
              spotSelected={this.state.spotSelected}
              spots={this.state.spotsToRender}
              onOverSpot={this.handleSpotHovered}
              spotHovered={this.state.spotHovered}
              onSpotClicked={this.handleSpotSeleted}
              fitSpotCardOnMap={this.fitSpotCardOnMap}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App
