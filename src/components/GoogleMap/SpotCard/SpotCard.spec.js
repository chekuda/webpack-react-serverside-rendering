import React from 'react'
import { mount } from 'enzyme'

import SpotCard from './SpotCard'

describe('SpotCard', () => {
  describe('given the SpotCard component with the spots props', () => {
    const props = {
      spot: {
        dificulty: 1,
        stars: 2,
        text: 'dummy-text',
        maxAltitude: '200m',
        routes: [{ name: 'first', hours: 9 }, { name: 'second', hours: 8 }],
        id: 'uniqueId'
      },
      spotToRender: true
    }
    describe('when Im the spot to be rendered', () => {
      let component
      beforeEach(() => {
        component = mount(<SpotCard {...props}/>)
      })
      it('spotToRender will determinate if spot is rendered by transition', () => {
        expect(component.find('Transition').props().in).toBe(props.spotToRender)
      })
      it('spotCard markup should be rendered', () => {
        expect(component.find('.spotCard').length).toBe(1)
      })
      it('close button markup should be rendered', () => {
        expect(component.find('.close .fa.fa-close').length).toBe(1)
      })
      it('slider markup should be rendered', () => {
        expect(component.find('.slider').length).toBe(1)
        expect(component.find('Carousel').length).toBe(1)
      })
      it('should render an SpotInfo component per spot property but id', () => {
        const totalSpotInfo = component.find('SpotInfo')
        const minMaxRoutes = 2
        const totalSpotInfoExpected = Object.keys(props.spot).filter(s => s !== 'id')

        expect(totalSpotInfo.length).toBe(totalSpotInfoExpected.length + minMaxRoutes)
      })
    })
    describe('when the user click on spot rendered', () => {
      describe('and the callback spotClicked is passed', () => {
        const newProps = {
          ...props,
          onSpotClicked: jest.fn()
        }
        it('callback should be called with the spot id', () => {
          const component = mount(<SpotCard {...newProps}/>)

          component.find('.spotCard').simulate('click')

          expect(newProps.onSpotClicked).toHaveBeenCalledWith(newProps.spot.id)
        })
      })
    })
    describe('when the user hover on spot rendered', () => {
      describe('and the callback onOverSpot is passed', () => {
        const newProps = {
          ...props,
          onOverSpot: jest.fn()
        }
        it('callback should be called with the spot id', () => {
          const component = mount(<SpotCard {...newProps}/>)

          component.find('.spotCard').simulate('mouseOver')

          expect(newProps.onOverSpot).toHaveBeenCalledWith(newProps.spot.id)
        })
      })
    })
    describe('when the user click close on spot rendered', () => {
      describe('and the callback onCLickClose is passed', () => {
        const newProps = {
          ...props,
          onClickClose: jest.fn()
        }
        it('callback should be called', () => {
          const component = mount(<SpotCard {...newProps}/>)

          component.find('.close').simulate('click')

          expect(newProps.onClickClose).toHaveBeenCalled()
        })
      })
    })
    describe('when the transtion has ended', () => {
      describe('and the spot is the one selected', () => {
        describe('and the spotCard instance is the one within the map', () => {
          it('callback to fit spotCard in the map is called', () => {
            const newProps = {
              ...props,
              spotSelected: 'selected',
              fitInMap: true,
              fitSpotCardOnMap: jest.fn()
            }

            const mockTarget = {
              target: {
                getBoundingClientRect: () => {}
              }
            }

            const component = mount(<SpotCard {...newProps}/>)
            component.instance().transitionHasEnded(mockTarget)

            expect(newProps.fitSpotCardOnMap).toHaveBeenCalled()
          })
        })
      })
    })
  })
})
