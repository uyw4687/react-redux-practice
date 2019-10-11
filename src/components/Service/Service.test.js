import React from 'react'
import { mount } from 'enzyme'
import Service from './Service'
import { getMockStore } from '../../test-utils/mocks'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

jest.mock('../../containers/Article/Article', () => {
    return jest.fn(props => {
        return (
            <div className="spyArticle">
                <button id='back-detail-article-button' onClick={props.onBack}>Back</button>
            </div>
        )
    })
})
jest.mock('../../containers/Create/Create', () => {
    return jest.fn(props => {
        const onConfirm = () => {
            props.onConfirm(1)
        }
        return (
            <div className="spyCreate">
                <button id='back-create-article-button' onClick={props.onBack}>Back</button>
                <button id='confirm-create-article-button' onClick={onConfirm}>Confirm</button>
            </div>
        )
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

describe('<Service />', () => {
    let service
    
    beforeEach(() => {
        service = (
            <Provider store={mockStore}>
                <BrowserRouter>
                    <Service />
                </BrowserRouter>
            </Provider>
        )
    })
    it('should render without errors', () => {
        const component = mount(service)
        let wrapper = component.find('.Service')
        expect(wrapper.length).toBe(1)
        wrapper = component.find(Service)
        wrapper.setState({state: 3})
        wrapper.setState({state: 1})
        wrapper.setState({state: 2})
        wrapper = component.find('#back-detail-article-button')
        wrapper.simulate('click')
    })
    it('should goto an article', () => {
        const component = mount(service)
        let wrapper = component.find(Service)
        wrapper = component.find('.title-button')
        wrapper.at(1).simulate('click')
        wrapper = component.find('#back-detail-article-button')
        wrapper.simulate('click')
    })
    it('should handle onBack, onConfirm', () => {
        const component = mount(service)
        let wrapper = component.find(Service)
        wrapper = component.find('#create-article-button')
        wrapper.simulate('click')
        wrapper = component.find('#back-create-article-button')
        wrapper.simulate('click')
        wrapper = component.find('#create-article-button')
        wrapper.simulate('click')
        wrapper = component.find('#confirm-create-article-button')
        wrapper.simulate('click')
        wrapper = component.find('#back-detail-article-button')
        wrapper.simulate('click')
    })
})