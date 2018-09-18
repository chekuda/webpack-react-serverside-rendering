import React from 'react'
import { shallow } from 'enzyme'

import Spot from './Spot'

describe('Given a spot component', () => {
  const props = {
    spot: { id: 'first' },
    spotState: {}
  }
  it('should render an spot container markup', () => {
    const component = shallow(<Spot {...props}/>)

    expect(component.find('.spot-container').length).toBe(1)
  })
  it('should render a SporCard', () => {
    const component = shallow(<Spot {...props}/>)

    expect(component.find('SpotCard').length).toBe(1)
  })
  it('should render a spotLabel', () => {
    const component = shallow(<Spot {...props}/>)

    expect(component.find('SpotLabel').length).toBe(1)
  })
  describe('and spot container is clicked', () => {
    it('spotSelection should be called with the rigtht Id', () => {
      const newProps = {
        ...props,
        handleSpotSeleted: jest.fn()
      }
      const component = shallow(<Spot {...newProps} />)

      component.find('.spot-container').simulate('click')

      expect(newProps.handleSpotSeleted).toHaveBeenCalledWith(newProps.spot.id)
    })
  })
  describe('when rendering the spotCard', () => {
    describe('and spot selected match with the current spot instance', () => {
      it('should say to spotCard to render the current spot', () => {
        const newProps = {
          ...props,
          spotSelected: 'first'
        }
        const component = shallow(<Spot {...newProps}/>)

        expect(component.find('SpotCard').props().spotToRender).toBe(true)
        expect(component.find('SpotCard').props().spotSelected).toBe('selected')
      })
    })
    describe('and spot selected doesnt match with the current spot instance', () => {
      it('should say to spotCard to not render the current spot', () => {
        const newProps = {
          ...props,
          spotSelected: 'second'
        }
        const component = shallow(<Spot {...newProps}/>)

        expect(component.find('SpotCard').props().spotToRender).toBe(false)
        expect(component.find('SpotCard').props().spotSelected).toBe('')
      })
    })
  })
})
