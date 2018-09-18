import React from 'react'
import { shallow, mount } from 'enzyme'

import SpotList from '../../../server/dummySpots'
import { CustomGoogleMap } from './CustomGoogleMap'

jest.mock('../../components/GoogleMap/Sidebar', () => 'side-bar')
jest.mock('../../components/GoogleMap/Spot', () => () => 'Spot')

jest.mock('google-map-react', () => ({ children }) => children)

describe('Given a CustomGoogleMap component', () => {
  describe('when first render', () => {
    const props = {
      mapState: {},
      allSpots: []
    }
    const component = shallow(<CustomGoogleMap { ...props } />)
    it('should render the googlemap-container', () => {
      expect(component.find('.googlemap-container').length).toBe(1)
    })
    it('should render all the spots inside googleMap plugin', () => {
      const newProps = {
        ...props,
        allSpots: SpotList(),
        mapState: {
          continentSelected: 'europe'
        },
        setMapView: jest.fn(),
        spotsToRender: jest.fn()
      }
      const expectedSpots = props.allSpots[newProps.mapState.continentSelected] || []
      const comp = mount(<CustomGoogleMap { ...newProps }/>)

      expect(comp.find('Transition').length).toBe(expectedSpots.length)
    })
    it('should render sideBar component', () => {
      expect(component.find('side-bar').length).toBe(1)
    })
  })
})
