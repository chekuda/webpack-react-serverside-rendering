import React, { Component, Fragment } from 'react'
import GoogleMap from 'google-map-react'
import { fitBounds } from 'google-map-react/utils'
import Transition from 'react-transition-group/Transition'
import { connect } from 'react-redux'

import Spot from '../../components/GoogleMap/Spot'
import Sidebar from '../../components/GoogleMap/Sidebar'
import { getOffset, spotsWithinBounds } from '../../utils/map'
import { getMax, getMin } from '../../utils/math'
import { spotSelection, setMapView, spotsToRender, spotHovered } from '../../redux/reducers/map'

export class CustomGoogleMap extends Component {
  constructor(props) {
    super(props)

    this.continentSelected = this.props.mapState.continentSelected
    this.state = {
      allSpots: this.props.allSpots[this.continentSelected] || [],
      cachedSpotSelected: null
    }
    this.mapContainer = React.createRef()
    this.myMap = React.createRef()
    this.mySpot = React.createRef()
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

  componentDidMount() {
    if (this.state.allSpots.length === 0) return

    const { setMapView, spotsToRender } = this.props

    const size = {
      width: this.mapContainer.current.offsetWidth,
      height: this.mapContainer.current.offsetHeight
    }
    const { zoom, center } = this.setFirstViewMap(this.state.allSpots, size)

    setMapView({ center, zoom })
    spotsToRender({ spots: this.state.allSpots })
  }

  setSpotsToRender = ({ bounds }) => {
    const { spotsToRender } = this.props
    const newSpotsToRender = spotsWithinBounds(bounds, this.state.allSpots)

    spotsToRender({
      spots: newSpotsToRender
    })
  }

  fitSpotCardOnMap = ({ top, right, left }) => {
    const { setMapView, mapState } = this.props
    let nCenter = ''
    const mapRightDistance = this.myMap.current.boundingRect_.right
    const mapLeftDistance = this.myMap.current.boundingRect_.left

    if (mapState.spotSelected !== this.state.cachedSpotSelected) {
      const newRight = mapRightDistance - right
      const offsetHeight = top <= 20 ? top - 20 : 0
      const offSetRight = newRight <= 20 ? newRight - 20 : 0
      const offSetLeft = left <= 20 ? (left * -1) + mapLeftDistance + 20 : 0

      if (offsetHeight || offSetLeft || offSetRight) {
        const offSetWidth = offSetRight < 0 ? offSetRight : offSetLeft
        const nCenterCoors = getOffset(this.myMap.current.map_, offSetWidth, offsetHeight)
        nCenter = {
          lat: nCenterCoors.lat(),
          lng: nCenterCoors.lng()
        }
      }

      setMapView({
        center: nCenter
      })

      this.setState({
        cachedSpotSelected: mapState.spotSelected
      })
    }
  }

  handleSpotSeleted = (id) => {
    const { spotSelection } = this.props

    spotSelection({ spotSelected: id })
  }

  handleSpotHovered = (id) => {
    const { spotHovered } = this.props

    spotHovered({ spotHovered: id })
  }

  handleSpotUnselected = () => {
    const { spotSelection } = this.props

    spotSelection({ spotSelected: null })
  }

  render() {
    const {
      center,
      zoom,
      spotsToRender,
      spotSelected,
      spotHovered
    } = this.props.mapState

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-0 col-sm-8 googlemap-container" ref={this.mapContainer}>
          {
            spotsToRender &&
              <GoogleMap
                defaultCenter={center}
                defaultZoom={zoom}
                center={center}
                onChange={this.setSpotsToRender}
                ref={this.myMap}
              >
              {
                spotsToRender.map(spot => (
                  <Transition
                    key={spot.id}
                    lat={spot.lat}
                    lng={spot.lng}
                    in={spotsToRender.includes(spot)}
                    timeout={300}
                    appear={true}
                  >
                    {
                      status => (
                        <Spot
                          status={status}
                          spot={spot}
                          spotSelected={spotSelected}
                          spotHovered={spotHovered}
                          fitSpotCardOnMap={this.fitSpotCardOnMap}
                          handleSpotSeleted={this.handleSpotSeleted}
                          handleSpotHovered={this.handleSpotHovered}
                          handleSpotUnselected={this.handleSpotUnselected}
                        />
                      )
                    }
                  </ Transition>
                  )
                )
              }
              </GoogleMap>
          }
          </div>
          <div className="col-xs-12 col-sm-4">
            <Sidebar
              title='Hikes'
              fitSpotCardOnMap={this.fitSpotCardOnMap}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  spotSelection: spot => dispatch(spotSelection(spot)),
  setMapView: data => dispatch(setMapView(data)),
  spotHovered: spot => dispatch(spotHovered(spot)),
  spotsToRender: spots => dispatch(spotsToRender(spots))
})

const mapStateToProps = ({ map, spots }) => ({
  mapState: map,
  allSpots: spots
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomGoogleMap)
