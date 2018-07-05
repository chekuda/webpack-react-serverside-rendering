import React from 'react'
import { mount } from 'enzyme'

import SpotInfo from './SpotInfo'

describe('SpotInfo', () => {
  describe('given SpotInfo', () => {
    describe('when text is passed', () => {
      const text = 'mock-test'
      it('should render text as it is', () => {
        const component = mount(<SpotInfo text={text} />)

        expect(component.find('.area').text()).toBe(text)
      })
    })
    describe('when text is not passed', () => {
      it('should not render text', () => {
        const component = mount(<SpotInfo/>)

        expect(component.find('.area').text()).toBe('')
      })
    })
    describe('when description is passed', () => {
      const description = 'mock-description'
      describe('and text is passed', () => {
        const text = 'mock-test'
        it('should render description and text', () => {
          const component = mount(<SpotInfo text={text} description={description}/>)

          expect(component.find('.area').text()).toBe(`${description} ${text}`)
        })
      })
      describe('and text is not passed', () => {
        it('should not render neither description or text', () => {
          const component = mount(<SpotInfo description={description}/>)

          expect(component.find('.area').text()).toBe('')
        })
      })
    })
    describe('when a customized class is passed', () => {
      it('should be inlined to area class', () => {
        const customClasses = 'mock-custom-class'
        const component = mount(<SpotInfo customClasses={customClasses} />)

        expect(component.find('.area').hasClass(customClasses)).toBe(true)
      })
    })
    describe('when icons are passed', () => {
      const totalIcons = 3
      it('should render number of icons passed', () => {
        const component = mount(<SpotInfo totalIcons={totalIcons} />)

        expect(component.find('i').length).toBe(totalIcons)
      })
      describe('and custom class is passed for icons', () => {
        const iconClass = ['iconClass-1', 'iconClass-2']
        const component = mount(<SpotInfo totalIcons={totalIcons} iconClass={iconClass}/>)

        expect(component.find('i').get(0).props.className).toBe(iconClass.join(' '))
      })
    })
  })
})
