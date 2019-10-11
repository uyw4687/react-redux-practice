import React from 'react'
import { shallow } from 'enzyme'
import ArticleListItem from './ArticleListItem'

describe('<ArticleListItem />', () => {
    it('should render without errors', () => {
        const component = shallow(<ArticleListItem />)
        const wrapper = component.find('.ArticleListItem')
        expect(wrapper.length).toBe(1)
    })
    it('should handle clicks', () => {
        const mockOnClick = jest.fn(id => {})
        const component = shallow(<ArticleListItem onClick={mockOnClick} />)
        const wrapper = component.find('.title-button')
        wrapper.simulate('click')
        expect(mockOnClick).toHaveBeenCalledTimes(1)
    }) 
})