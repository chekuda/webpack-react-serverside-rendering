import React from 'react'
import { shallow, mount } from 'enzyme'

import GoogleMap from 'google-map-react'
import SpotList from '../../../server/dummySpots'
import { App } from './App'

jest.mock('../Sidebar', () => 'side-bar')
jest.mock('../Spot', () => () => 'Spot')

jest.mock('google-map-react', () => ({ children }) => children)

describe('Given a App component', () => {
  describe('when first render', () => {
    const props = {
      mapState: {}
    }
    const component = shallow(<App { ...props } />)
    it('should render the googlemap-container', () => {
      expect(component.find('.googlemap-container').length).toBe(1)

    })
    it('should render all the spots inside googleMap plugin', () => {
      const newProps = {
        mapState: {
          continentSelected: 'europe',
        },
        setMapView: jest.fn(),
      }
      const expectedSpots = SpotList()[newProps.mapState.continentSelected] || []
      const comp = mount(<App { ...newProps }/>)

      expect(comp.find('Transition').length).toBe(expectedSpots.length)
    })
    it('should render sideBar component', () => {
      expect(component.find('side-bar').length).toBe(1)
    })
  })
})