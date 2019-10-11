import React from 'react'
import { mount } from 'enzyme'
import Create from './Create'
import { getMockStore } from '../../test-utils/mocks'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import axios from 'axios'

jest.mock('../../containers/CreateButtons/CreateButtons', () => {
    return jest.fn(props => {
      return (
        <div className="spyCreateButtons">
            <button id='confirm-create-article-button' onClick={props.onConfirm} />
            <button id='preview-tab-button' onClick={props.onPreview} />
            <button id='write-tab-button' onClick={props.onWrite} />
        </div>)
    })
})

const stubInitialState = {
    articles: [
        { id: 1, author_id: 1, title: 'Let\'s', content: 'eateateateateateateateateateateateateateateat\nplayplayplayplayplayplayplayplayplayplayplayplay\ndrinkdrinkndrinkdrinkndrinkdrinkndrinkdrinkndrink' }
    ],
    comments: [
        { id: 1, author_id: 1, article_id: 1, content: 'eat yeahhh' }
    ],
    users: [
        { id: 1, email: 'swpp@snu.ac.kr', password: 'iluvswpp', name: 'BJH', logged_in: false }
    ]
}

const mockStore = getMockStore(stubInitialState)

describe('<Create />', () => {
    let create
    // let mockSetArticle = jest.fn()
    
    beforeEach(() => {
        create = (
            <Provider store={mockStore}>
                <BrowserRouter>
                    <Create currentUserId={1}/>
                </BrowserRouter>
            </Provider>
        )
        jest.spyOn(axios, 'post')
            .mockImplementation(url => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                        data: {}
                    }
                    resolve(result)
            })
        })
    })
    it('should render without errors', () => {
        const component = mount(create)
    })
    it(`should set state properly on title input`, () => {
        const title = 'TEST_TITLE'
        const component = mount(create)
        const wrapper = component.find('#article-title-input')
        wrapper.simulate('change', { target: { value: title } })
        const createInstance = component.find(Create.WrappedComponent).instance()
        expect(createInstance.state.title).toEqual(title)
        expect(createInstance.state.content).toEqual('')
    })
    it(`should set state properly on content input`, () => {
        const content = 'TEST_CONTENT'
        const component = mount(create)
        const wrapper = component.find('#article-content-input')
        wrapper.simulate('change', { target: { value: content } })
        const createInstance = component.find(Create.WrappedComponent).instance()
        expect(createInstance.state.content).toEqual(content)
        expect(createInstance.state.title).toEqual('')
    })
    it(`should onConfirm onPreview onWrite`, () => {
        const component = mount(create)
        const title = 'TEST_TITLE'
        let wrapper = component.find('#article-title-input')
        wrapper.simulate('change', { target: { value: title } })
        const content = 'TEST_CONTENT'
        wrapper = component.find('#article-content-input')
        wrapper.simulate('change', { target: { value: content } })
        wrapper = component.find('#confirm-create-article-button')
        wrapper.simulate('click')
        wrapper = component.find('#preview-tab-button')
        wrapper.simulate('click')
        wrapper = component.find('#write-tab-button')
        wrapper.simulate('click')
    })
    it(`should handle setProps`, () => {
        const component = mount(create)
        const title = 'TEST_TITLE'
        let wrapper = component.find(Create.WrappedComponent)
        wrapper.setProps({
            storedArticles: [],
            storedUsers: stubInitialState.users
        })
        wrapper.setProps({
            storedArticles: stubInitialState.articles,
            storedUsers: stubInitialState.users
        })
    })
})