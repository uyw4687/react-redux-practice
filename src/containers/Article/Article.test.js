import React from 'react'
import { mount } from 'enzyme'
import Article from './Article'
import { getMockStore } from '../../test-utils/mocks'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import * as actionCreators from '../../store/actions/blog'
import axios from 'axios'

const stubInitialState = {
    articles: [
        { id: 1, author_id: 1, title: 'Let\'s', content: 'eateateateateateateateateateateateateateateat\nplayplayplayplayplayplayplayplayplayplayplayplay\ndrinkdrinkndrinkdrinkndrinkdrinkndrinkdrinkndrink' },
        { id: 2, author_id: 1, title: 'Movie', content: 'yeah watch movie' },
        // { id: 3, author_id: 2, title: 'Dinner', content: 'oh eat dinner' }
    ],
    comments: [
        { id: 1, author_id: 1, article_id: 1, content: 'eat yeahhh' },
        { id: 2, author_id: 2, article_id: 1, content: 'drive!!!!' },
        // { id: 3, author_id: 3, article_id: 1, content: 'drink >< ><' },
        // { id: 3, author_id: 2, article_id: 2, content: 'drink yeahh' }
    ],
    users: [
        { id: 1, email: 'swpp@snu.ac.kr', password: 'iluvswpp', name: 'BJH', logged_in: false },
        { id: 2, email: '2', password: '1', name: 'OSK', logged_in: false },
        // { id: 3, email: '3', password: '1', name: 'Gab', logged_in: false }
    ]
}

const mockStore = getMockStore(stubInitialState)

describe('<Article />', () => {
    let article, article2
    let mockOnBack = jest.fn()
    
    beforeEach(() => {
        article = (
            <Provider store={mockStore}>
                <BrowserRouter>
                    <Article id={1} currentUserId={1} onBack={mockOnBack}/>
                </BrowserRouter>
            </Provider>
        )
        article2 = (
            <Provider store={mockStore}>
                <BrowserRouter>
                    <Article id={1} currentUserId={2} onBack={mockOnBack}/>
                </BrowserRouter>
            </Provider>
        )
        // spy = jest.spyOn(axios, 'patch')
        // .mockImplementation(url => {
        //     return new Promise((resolve, reject) => {
        //         const result = {
        //             status: 200,
        //             data: stubInitialState
        //         }
        //         resolve(result)
        //     })
        // })
    })
    it('should render without errors', () => {
        const component = mount(article)
        let wrapper = component.find('.Article')
        expect(wrapper.length).toBe(1)
    })
    it('should dispatch', () => {
        const spyDeleteArticle = jest.spyOn(actionCreators, 'deleteArticle')
            .mockImplementation(id => { return dispatch => {} })
        const spyCreateComment = jest.spyOn(actionCreators, 'createComment')
            .mockImplementation((article_id, author_id, content) => { return dispatch => {} })
        const spyDeleteComment = jest.spyOn(actionCreators, 'deleteComment')
            .mockImplementation(id => { return dispatch => {} })
        const newComment = 'TEST_COMMENT'
        const component = mount(article)
        let wrapper = component.find('#new-comment-content-input')
        wrapper.simulate('change', { target: { value: newComment } })
        wrapper = component.find('#confirm-create-comment-button')
        wrapper.simulate('click')
        wrapper = component.find('#delete-comment-button')
        wrapper.simulate('click')
        wrapper = component.find('#delete-article-button')
        wrapper.simulate('click')
    })
    it('should handle editting', () => {
        const component = mount(article)
        console.log(component.debug())
        let wrapper = component.find('#edit-article-button')
        wrapper.simulate('click')
        console.log(component.debug())
        wrapper = component.find('#back-edit-article-button')
        wrapper.simulate('click')
        wrapper = component.find('#edit-article-button')
        wrapper.simulate('click')
        wrapper = component.find('#confirm-edit-article-button')
        wrapper.simulate('click')
        console.log(component.debug())
    })
    it(`should set state properly on comment input`, () => {
        const newComment = 'TEST_COMMENT'
        const component = mount(article2)
        const wrapper = component.find('#new-comment-content-input')
        wrapper.simulate('change', { target: { value: newComment } })
        const createInstance = component.find(Article.WrappedComponent).instance()
        expect(createInstance.state.newComment).toEqual(newComment)
    })
})