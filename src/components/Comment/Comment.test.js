import React from 'react'
import { mount } from 'enzyme'
import Comment from './Comment'
import { getMockStore } from '../../test-utils/mocks'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import * as actionCreators from '../../store/actions/blog'
import axios from 'axios'

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

describe('<Comment />', () => {
    let comment, comment2, comment3
    let spy
    
    beforeEach(() => {
        comment = (
            <Provider store={mockStore}>
                <BrowserRouter>
                    <Comment content='abcabc'/>
                </BrowserRouter>
            </Provider>
        )
        comment2 = (
            <Provider store={mockStore}>
                <BrowserRouter>
                    <Comment isAuthor={true} />
                </BrowserRouter>
            </Provider>
        )
        comment3 = (
            <Provider store={mockStore}>
                <BrowserRouter>
                    <Comment isAuthor={false} />
                </BrowserRouter>
            </Provider>
        )
        spy = jest.spyOn(axios, 'patch')
        .mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200,
                    data: stubInitialState
                }
                resolve(result)
            })
        })
    })
    it('should render without errors', () => {
        const component = mount(comment)
        let wrapper = component.find('.Comment')
        expect(wrapper.length).toBe(1)
        wrapper = component.find('.Content')
        expect(wrapper.length).toBe(1)
        expect(wrapper.text()).toBe('abcabc')
    })
    it('should render buttons for authors', () => {
        const component = mount(comment2)
        const spyWindowPrompt = jest.spyOn(window, 'prompt')
            .mockImplementation(() => {})
        const spyDeleteComment = jest.spyOn(actionCreators, 'deleteComment')
            .mockImplementation(id => { return dispatch => {} })
        let wrapper = component.find('#edit-comment-button')
        wrapper.simulate('click')
        expect(spyWindowPrompt).toHaveBeenCalledTimes(1)
        wrapper = component.find('#delete-comment-button')
        wrapper.simulate('click')
        expect(spyDeleteComment).toHaveBeenCalledTimes(1)
    })
    it('should not edit with empty string', () => {
        const component = mount(comment2)
        jest.spyOn(window, 'prompt')
            .mockImplementation(() => '')
        const spyEditComment = jest.spyOn(actionCreators, 'editComment')
            .mockImplementation(id => { return dispatch => {} })
        let wrapper = component.find('#edit-comment-button')
        wrapper.simulate('click')
        expect(spyEditComment).toHaveBeenCalledTimes(0)
    })
    it('should not render buttons for others', () => {
        const component = mount(comment3)
        let wrapper = component.find('#edit-comment-button')
        expect(wrapper.length).toBe(0)
        wrapper = component.find('#delete-comment-button')
        expect(wrapper.length).toBe(0)
    })
})