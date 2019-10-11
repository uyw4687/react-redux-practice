import React from 'react'
import { mount } from 'enzyme'
import Login from './Login'
import { getMockStore } from '../../test-utils/mocks'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
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

describe('<Login />', () => {
    let login
    let mockOnSuccess = jest.fn()
    
    beforeEach(() => {
        login = (
            <Provider store={mockStore}>
                <BrowserRouter>
                    <Login onSuccess={mockOnSuccess} />
                </BrowserRouter>
            </Provider>
        )
        window.alert=jest.fn()
        jest.spyOn(axios, 'patch')
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
    it('should render and login without errors', () => { 
        const component = mount(login)
        let wrapper = component.find('.Login') 
        expect(wrapper.length).toBe(1)
        wrapper = component.find('#login-button')
        wrapper.simulate('click')
    })
    it('should login without errors', () => { 
        const component = mount(login)
        const loginInstance = component.find(Login.WrappedComponent).instance()
        loginInstance.setState({ email: 'swpp@snu.ac.kr', password: 'iluvswpp' })
        let wrapper = component.find('#login-button')
        wrapper.simulate('click')
    })
    it('should fail login', () => { 
        const component = mount(login)
        const loginInstance = component.find(Login.WrappedComponent).instance()
        loginInstance.setState({ email: 'swpp@snu.ac.kr', password: `idon'tluvswpp` })
        let wrapper = component.find('#login-button')
        wrapper.simulate('click')
    })
    it(`should set state properly on email input`, () => {
        const email = 'TEST_EMAIL'
        const component = mount(login)
        const wrapper = component.find('#email-input')
        wrapper.simulate('change', { target: { value: email } })
        const loginInstance = component.find(Login.WrappedComponent).instance()
        expect(loginInstance.state.email).toEqual(email)
        expect(loginInstance.state.password).toEqual('')
    });
    it(`should set state properly on password input`, () => {
        const password = 'TEST_CONTENT'
        const component = mount(login)
        const wrapper = component.find('#pw-input')
        wrapper.simulate('change', { target: { value: password } })
        const loginInstance = component.find(Login.WrappedComponent).instance()
        expect(loginInstance.state.password).toEqual(password)
        expect(loginInstance.state.email).toEqual('')
    });
})