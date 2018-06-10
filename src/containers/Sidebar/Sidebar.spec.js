import React from 'react'
import { shallow } from 'enzyme'

import { Sidebar } from './Sidebar'

describe('Given a sidebar component', () => {
  describe('when no spots are passed', () => {
    it('should render none Spotcards', () => {
      const props = {
        sideBarState: {}
      }
      const component = shallow(<Sidebar {...props} />)

      expect(component.find('SpotCard').length).toBe(0)
      component.unmount()
    })
  })
  describe('when spots have some lenght', () => {
    it('should render as many sportcards as spot passed', () => {
      const props = {
        spots: [{ id: 'first'}, { id: 'second'}],
        sideBarState: {}
      }
      const component = shallow(<Sidebar {...props} />)

      expect(component.find('SpotCard').length).toBe(props.spots.length)
      component.unmount()
    })
    describe('and spotSelected is passed', () => {
      it('should render the class selected on the right SpotCard', () => {
        const props = {
          spots: [{ id: 'first'}, { id: 'second'}],
          sideBarState: {
            spotSelected: 'first'
          }
        }
        const excpectedResult = props.spots.find(spot => spot.id === props.sideBarState.spotSelected)
        const component = shallow(<Sidebar {...props} />)

        const spotCards = component.find('SpotCard')
        const selected = spotCards.findWhere(card => card.props().spotSelected.includes('selected')).props().spot

        expect(selected).toEqual(excpectedResult)
        component.unmount()
      })
    })
    describe('and handleSpotHovered is called', () => {
      it('spotHovered should be called with the rigtht Id', () => {
        const props = {
          spots: [{ id: 'first'}, { id: 'second'}],
          sideBarState: {},
          spotHovered: jest.fn()
        }
        const component = shallow(<Sidebar {...props} />)
        component.instance().handleSpotHovered(props.spots[0].id)

        expect(props.spotHovered).toHaveBeenCalledWith({ spotHovered: props.spots[0].id })
        component.unmount()
      })
    })
  })
})