import React from 'react'
import { shallow } from 'enzyme'

import { Spot } from './Spot'

describe('Given a spot component', () => {
  const props = {
    spot: { id: 'first'},
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
        spotSelection: jest.fn()
      }
      const component = shallow(<Spot {...newProps} />)

      component.find('.spot-container').simulate('click')

      expect(newProps.spotSelection).toHaveBeenCalledWith({ spotSelected: newProps.spot.id })
      component.unmount()
    })
  })
  describe('and handleSpotHovered is called', () => {
    it('spotHovered should be called with the rigtht Id', () => {
      const newProps = {
        ...props,
        spotHovered: jest.fn()
      }
      const component = shallow(<Spot {...newProps} />)
      component.instance().handleSpotHovered(newProps.spot.id)

      expect(newProps.spotHovered).toHaveBeenCalledWith({ spotHovered: newProps.spot.id })
      component.unmount()
    })
  })
})