import React, { Component } from 'react'
import GoogleMap from 'google-map-react'
import { fitBounds } from 'google-map-react/utils'
import Transition from 'react-transition-group/Transition'

import Spot from '../components/Spot'
import Sidebar from '../components/Sidebar'
import SpotInfo from '../components/SpotInfo'
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

  handleSpotHovered = (id) => {
    this.setState({
      spotHovered: id
    })
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
          <div className="col-xs-8 col-8 googlemap-container" ref={this.mapContainer}>
          <GoogleMap
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
            onChange={this.setSpotsToRender}
          >
          {
            this.allSpots.map((spot, index) => (
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
          <div className="col-xs-4 col-4">
            <Sidebar
              title='Hikes'
              spotSelected={this.state.spotSelected}
              spots={this.state.spotsToRender}
              onOverSpot={this.handleSpotHovered}
              spotHovered={this.state.spotHovered}
              onSpotClicked={this.handleSpotSeleted}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App
