import React, { Component } from 'react'
import GoogleMap from 'google-map-react'
import { fitBounds } from 'google-map-react/utils'

import Spot from '../components/Spot'
import Sidebar from '../components/Sidebar'
import SpotList from '../../server/dummySpots.json'

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
    this.allSpots = SpotList[this.continentSelected]
    this.hasBeenRendered = false // To avoid first googleMap rendering bounce
    this.state = {
      spotsToRender: this.allSpots,
      center: DefaultProps.center,
      zoom: DefaultProps.zoom
    }
  }

  setFirstViewMap() {
    const lat = this.state.spotsToRender.map(ele => ele.lat)
    const lng = this.state.spotsToRender.map(ele => ele.lng)

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
    const size = {
      width: this.mapContainer.current.offsetWidth,
      height: this.mapContainer.current.offsetHeight
    }

    const { center, zoom } = fitBounds(bounds, size)
    this.setState({
      center,
      zoom: zoom - 1 // Fittin the makers
    })
  }

  componentDidMount(){
    this.setFirstViewMap()
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

  setSpotSelected = (index) => {
    this.setState({
      spotSelected: index
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-8 gm-container" ref={this.mapContainer}>
          <GoogleMap
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
            onChange={this.setSpotsToRender}
          >
          {
            this.state.spotsToRender.map((element, index) => {
              return(
                <Spot
                  key={index}
                  defaultAnimation={process.browser && window.google.maps.Animation.DROP}
                  lat={element.lat}
                  lng={element.lng}
                  text={element.text}
                  index={index}
                  spotSelected={this.state.spotSelected}
                  onOverSpot={this.setSpotSelected}

                />
              )
            })
          }
          </GoogleMap>
          </div>
          <div className="col-4">
            <Sidebar
              title='Hikes'
              spots={this.state.spotsToRender}
              onOverSpot={this.setSpotSelected}
              spotSelected={this.state.spotSelected}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App
