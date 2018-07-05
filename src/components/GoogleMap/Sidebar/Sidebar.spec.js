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
    })
  })
  describe('when spotsToRender have some lenght', () => {
    it('should render as many sportcards as spot passed', () => {
      const props = {
        sideBarState: {
          spotsToRender: [{ id: 'first' }, { id: 'second' }]
        }
      }
      const component = shallow(<Sidebar {...props} />)

      expect(component.find('SpotCard').length).toBe(props.sideBarState.spotsToRender.length)
    })
    describe('and spotSelected is passed', () => {
      it('should render the class selected on the right SpotCard', () => {
        const props = {
          sideBarState: {
            spotsToRender: [{ id: 'first' }, { id: 'second' }],
            spotSelected: 'first'
          }
        }
        const excpectedResult = props.sideBarState.spotsToRender.find(spot => spot.id === props.sideBarState.spotSelected)
        const component = shallow(<Sidebar {...props} />)

        const spotCards = component.find('SpotCard')
        const selected = spotCards.findWhere(card => card.props().spotSelected.includes('selected')).props().spot

        expect(selected).toEqual(excpectedResult)
      })
    })
    describe('and handleSpotHovered is called', () => {
      it('spotHovered should be called with the rigtht Id', () => {
        const props = {
          sideBarState: {
            spotsToRender: [{ id: 'first' }, { id: 'second' }],
          },
          spotHovered: jest.fn()
        }
        const component = shallow(<Sidebar {...props} />)
        component.instance().handleSpotHovered(props.sideBarState.spotsToRender[0].id)

        expect(props.spotHovered).toHaveBeenCalledWith({ spotHovered: props.sideBarState.spotsToRender[0].id })
      })
    })
  })
})
