import React from 'react'
import { shallow } from 'enzyme'

import SpotLabel from './SpotLabel'

describe('SpotLabel', () => {
  describe('given the SpotLabel component', () => {
    describe('when spot with id, stars and dificulty is passed by props', () => {
      const props = {
        spot: {
          id: 'random-Id',
          stars: 1,
          dificulty: 2
        }
      }
      const component = shallow(<SpotLabel {...props}/>)
      it('should render the spotLabel within markup', () => {
        expect(component.find('.spotLabel').length).toBe(1)
      })
      it('should render the stars area within markup', () => {
        expect(component.find('SpotInfo').findWhere(ele => ele.props().customClasses === 'stars').length).toBe(1)
      })
      it('should render the dificulty area within markup', () => {
        expect(component.find('SpotInfo').findWhere(ele => ele.props().customClasses === 'dificulty').length).toBe(1)
      })
    })
    describe('when star of spot is no passed by props', () => {
      const props = {
        spot: {
          id: 'random-Id'
        }
      }
      const component = shallow(<SpotLabel {...props}/>)
      it('spot is rendered with not stars markup', () => {
        expect(component.find('.spotLabel').length).toBe(1)
        expect(component.find('SpotInfo').findWhere(ele => ele.props().customClasses === 'stars').length).toBe(0)
      })
    })
    describe('when dificulty of spot is no passed by props', () => {
      const props = {
        spot: {
          id: 'random-Id'
        }
      }
      const component = shallow(<SpotLabel {...props}/>)
      it('spot is rendered with not stars markup', () => {
        expect(component.find('.spotLabel').length).toBe(1)
        expect(component.find('SpotInfo').findWhere(ele => ele.props().customClasses === 'dificulty').length).toBe(0)
      })
    })
    describe('when spot hovered passed', () => {
      describe('and its the same as the spot id passed by props', () => {
        const props = {
          spot: {
            id: 'random-Id'
          },
          spotHovered: 'random-Id'
        }
        const component = shallow(<SpotLabel {...props}/>)
        it('spotLabel should have class onover', () => {
          expect(component.find('.spotLabel.onover').length).toBe(1)
        })
      })
      describe('and its different of the spot id passed by props', () => {
        const props = {
          spot: {
            id: 'random-Id'
          },
          spotHovered: 'different'
        }
        const component = shallow(<SpotLabel {...props}/>)
        it('spotLabel should have class onover', () => {
          expect(component.find('.spotLabel.onover').length).toBe(0)

        })
      })
    })
    describe('when the status is passed', () => {
      const props = {
        spot: {
          id: 'random-Id'
        },
        status: 'entered'
      }
      const component = shallow(<SpotLabel {...props}/>)
      it('status should be added to the classlist of spotLabel', () => {
        expect(component.find(`.spotLabel.${props.status}`).length).toBe(1)
      })
    })
    describe('when user hover the spot', () => {
      const props = {
        spot: {
          id: 'random-Id'
        },
        onOverSpot: jest.fn()
      }
      const component = shallow(<SpotLabel {...props}/>)
      it('callback onOverSpot should be called with the spot id', () => {
        component.find('.spotLabel').simulate('mouseOver')

        expect(props.onOverSpot).toHaveBeenCalledWith(props.spot.id)
      })
    })
    describe('when user stop hovering the spot', () => {
      const props = {
        spot: {
          id: 'random-Id'
        },
        onOverSpot: jest.fn()
      }
      const component = shallow(<SpotLabel {...props}/>)
      it('callback onOverSpot should be called with undefined', () => {
        component.find('.spotLabel').simulate('mouseLeave')

        expect(props.onOverSpot).toHaveBeenCalledWith(undefined)
      })
    })
  })
})
