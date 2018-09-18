import React from 'react'
import { mount, shallow } from 'enzyme'

import Carousel from './Carousel'

describe('Carousel', () => {
  describe('given Carousel component', () => {
    describe('when slides has some length', () => {
      let props
      beforeEach(() => {
        props = {
          spot: {
            imageList: ['first-test-url', 'second-test-url', 'third-test-url']
          }
        }
      })
      it('should display the carousel as a flex', () => {
        const component = shallow(<Carousel {...props}/>)

        const componentStyle = component.get(0).props.style

        expect(componentStyle).toEqual({ display: 'flex' })
      })
      it('should render controls', () => {
        const component = shallow(<Carousel {...props}/>)

        expect(component.find('.controls').length).toBe(1)
        expect(component.find('.arrows').length).toBe(1)
        expect(component.find('.left').length).toBe(1)
        expect(component.find('.right').length).toBe(1)
      })
      it('it should render the slide in the initialState slide', () => {
        const component = mount(<Carousel {...props}/>)

        const slides = component.find('Transition')

        const currentSlide = slides.findWhere(slide => slide.props().in).props()

        const { slideSelected } = component.state()

        expect(currentSlide.children().props.style.backgroundImage).toBe(`url(${props.spot.imageList[slideSelected]})`)
      })
    })
    describe('when slides has non slide', () => {
      const props = {
        spot: {
          imageList: []
        }
      }
      it('should not display the carousel', () => {
        const component = shallow(<Carousel {...props}/>)

        const componentStyle = component.get(0).props.style

        expect(componentStyle).toEqual({ display: 'none' })
      })
    })
  })
  describe('given the controls rendered', () => {
    const props = {
      spot: {
        imageList: ['first-test-url', 'second-test-url', 'third-test-url']
      }
    }
    describe('when the user is hovering controls', () => {
      it('should render onOver class in controls markup', () => {
        const component = shallow(<Carousel {...props}/>)

        expect(component.find('.left.onOver').length).toBe(0)
        expect(component.find('.right.onOver').length).toBe(0)

        component.find('.carousel').simulate('mouseOver')

        expect(component.find('.right.onOver').length).toBe(1)
        expect(component.find('.left.onOver').length).toBe(1)
      })
    })
    describe('and the user is stop hovering controls', () => {
      it('should render remove onOver class in controls markup', () => {
        const component = shallow(<Carousel {...props}/>)

        component.find('.carousel').simulate('mouseOver')

        expect(component.find('.right.onOver').length).toBe(1)
        expect(component.find('.left.onOver').length).toBe(1)

        component.find('.carousel').simulate('mouseLeave')

        expect(component.find('.left.onOver').length).toBe(0)
        expect(component.find('.right.onOver').length).toBe(0)
      })
    })
    describe('and slideSelected is the first one in the list', () => {
      let component
      beforeEach(() => {
        component = mount(<Carousel {...props}/>)
        component.setState({ slideSelected: 0 })
      })

      describe('and the user click on right control', () => {
        const slideKeySpected = props.spot.imageList.length - 1

        it('the slide displayed should and the be the last one in the list', () => {
          component.find('.fa-angle-right').simulate('click')

          const currentSlide = component.find('Transition')
            .findWhere(slide => slide.props().in).get(0).key

          expect(currentSlide).toBe(`${slideKeySpected}`)
        })
        it('the slideSelected should be the last one in the list', () => {
          component.find('.fa-angle-right').simulate('click')

          expect(component.state().slideSelected).toBe(slideKeySpected)
        })
      })
      describe('and the user click on left control', () => {
        it('the slide displayed should and the be the next one in the list', () => {
          component.find('.fa-angle-left').simulate('click')

          const currentSlide = component.find('Transition')
            .findWhere(slide => slide.props().in).get(0).key

          expect(currentSlide).toBe('1')
        })
        it('the slideSelected should be the next one in the list', () => {
          component.find('.fa-angle-left').simulate('click')

          expect(component.state().slideSelected).toBe(1)
        })
      })
    })
    describe('and the slideSelected is the last one in the list', () => {
      let component
      beforeEach(() => {
        component = mount(<Carousel {...props}/>)
        component.setState({ slideSelected: props.spot.imageList.length - 1 })
      })
      describe('and the user click on right control', () => {
        const slideKeySpected = props.spot.imageList.length - 2
        it('the slide displayed should be one before in the list', () => {
          component.find('.fa-angle-right').simulate('click')

          const currentSlide = component.find('Transition')
            .findWhere(slide => slide.props().in).get(0).key
          expect(currentSlide).toBe(`${slideKeySpected}`)
        })
        it('the slideSelected should be one before in the list', () => {
          component.find('.fa-angle-right').simulate('click')

          expect(component.state().slideSelected).toBe(slideKeySpected)
        })
      })
    })
  })
})
