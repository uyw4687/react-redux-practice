import React from 'react'
import { mount } from 'enzyme'
import ArticleEdit from './ArticleEdit'
import { getMockStore } from '../../test-utils/mocks'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

const stubInitialState = {
    articles: [
        { id: 1, author_id: 1, title: 'Let\'s', content: 'eateateateateateateateateateateateateateateat\nplayplayplayplayplayplayplayplayplayplayplayplay\ndrinkdrinkndrinkdrinkndrinkdrinkndrinkdrinkndrink' },
        { id: 2, author_id: 1, title: 'Movie', content: 'yeah watch movie' },
    ],
    comments: [
        { id: 1, author_id: 1, article_id: 1, content: 'eat yeahhh' },
        { id: 2, author_id: 2, article_id: 1, content: 'drive!!!!' },
    ],
    users: [
        { id: 1, email: 'swpp@snu.ac.kr', password: 'iluvswpp', name: 'BJH', logged_in: false },
        { id: 2, email: '2', password: '1', name: 'OSK', logged_in: false },
    ]
}
const mockStore = getMockStore(stubInitialState)

describe('<Article />', () => {
    let articleEdit
    let mockOnBack = jest.fn()

    beforeEach(() => {
        articleEdit = (
            <Provider store={mockStore}>
                <BrowserRouter>
                    <ArticleEdit id={1} currentUserId={1} onBack={mockOnBack} />
                </BrowserRouter>
            </Provider>
        )
    })
    it('should render without errors', () => {
        const component = mount(articleEdit)
        let wrapper = component.find('.ArticleEdit')
        expect(wrapper.length).toBe(1)
    })
    it('handle preview', () => {
        const component = mount(articleEdit)
        let wrapper = component.find('#preview-tab-button')
        wrapper.simulate('click')
        wrapper = component.find('#back-edit-article-button')
        wrapper.simulate('click')
    })
    it('should stay', () => {
        const title = 'TEST_TITLE'
        const content = 'TEST_CONTENT'
        window.confirm = jest.fn(() => true)
        const component = mount(articleEdit)
        let wrapper = component.find('#article-title-input')
        wrapper.simulate('change', { target: { value: title } })
        wrapper = component.find('#article-content-input')
        wrapper.simulate('change', { target: { value: content } })
        wrapper = component.find('#preview-tab-button')
        wrapper.simulate('click')
        wrapper = component.find('#write-tab-button')
        wrapper.simulate('click')
        wrapper = component.find('#back-edit-article-button')
        wrapper.simulate('click')
    })
    it('should go back', () => {
        const title = 'TEST_TITLE'
        const content = 'TEST_CONTENT'
        window.confirm = jest.fn(() => false)
        const component = mount(articleEdit)
        let wrapper = component.find('#article-title-input')
        wrapper.simulate('change', { target: { value: title } })
        wrapper = component.find('#article-content-input')
        wrapper.simulate('change', { target: { value: content } })
        wrapper = component.find('#back-edit-article-button')
        wrapper.simulate('click')
    })
    it('should handle blank inputs', () => {
        const title = ''
        const content = ''
        window.confirm = jest.fn(() => false)
        const component = mount(articleEdit)
        let wrapper = component.find('#article-title-input')
        wrapper.simulate('change', { target: { value: title } })
        wrapper = component.find('#article-content-input')
        wrapper.simulate('change', { target: { value: content } })
        wrapper = component.find('#back-edit-article-button')
        wrapper.simulate('click')
    })
    it('should handle all branches', () => {
        const content = 'TEST_CONTENT'
        window.confirm = jest.fn(() => true)
        const component = mount(articleEdit)
        let wrapper = component.find('#article-content-input')
        wrapper.simulate('change', { target: { value: content } })
        wrapper = component.find('#back-edit-article-button')
        wrapper.simulate('click')
    })
})