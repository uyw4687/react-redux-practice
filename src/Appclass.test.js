import React from 'react'
import { mount } from 'enzyme'
import AppClass from './AppClass'
import { getMockStore } from './test-utils/mocks'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
// import * as actionCreators from './store/actions/blog'
import axios from 'axios'
// import store from './store/store';

jest.mock('./containers/Login/Login', () => {
    return jest.fn(props => {
      return (
        <div className="spyLogin">
          <button className="submitButton" onClick={props.onSuccess} />
        </div>);
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

const stubInitialState2 = {
    articles: [
        { id: 1, author_id: 1, title: 'Let\'s', content: 'eateateateateateateateateateateateateateateat\nplayplayplayplayplayplayplayplayplayplayplayplay\ndrinkdrinkndrinkdrinkndrinkdrinkndrinkdrinkndrink' }
    ],
    comments: [
        { id: 1, author_id: 1, article_id: 1, content: 'eat yeahhh' }
    ],
    users: [
        { id: 1, email: 'swpp@snu.ac.kr', password: 'iluvswpp', name: 'BJH', logged_in: true }
    ]
}

const mockStore2 = getMockStore(stubInitialState2)

describe('<AppClass />', () => {
    let appClass, appClass2, spy
    
    beforeEach(() => {
        appClass = (
            <Provider store={mockStore}>
                <BrowserRouter>
                    <AppClass />
                </BrowserRouter>
            </Provider>
        )
        appClass2 = (
            <Provider store={mockStore2}>
                <BrowserRouter>
                    <AppClass />
                </BrowserRouter>
            </Provider>
        )
        spy = jest.spyOn(axios, 'get')
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
    afterEach(() => {
        jest.clearAllMocks()
    })
    it('should render/login/logout without errors', () => {
        const component = mount(appClass)
        let wrapper = component.find('.wrapper')
        let spy2 = jest.spyOn(axios, 'patch')
        .mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200,
                    data: stubInitialState2
                }
                resolve(result)
            })
        })
        expect(wrapper.length).toBe(0)
        wrapper = component.find('.submitButton')
        wrapper.simulate('click')
        wrapper = component.find(AppClass.WrappedComponent)
        expect(wrapper.state().isLoggedIn).toBe(true)
        wrapper = component.find('#logout-button')
        wrapper.simulate('click')
        wrapper = component.find(AppClass.WrappedComponent)
        expect(wrapper.state().isLoggedIn).toBe(false)  
    })
    it('should get user information', () => {
        const component = mount(appClass2)
        let wrapper = component.find(AppClass.WrappedComponent)
        // expect(wrapper.state().isLoggedIn).toBe(true)
    })
    // it(`'login' should be done correctly`, (done) => {
    //     const component = mount(appClass2)
    //     // console.log(component.debug())
    //     const stubUser = [
    //         { id: 1, email: 'swpp@snu.ac.kr', password: 'iluvswpp', name: 'BJH', logged_in: true }
    //     ]
    
    //     const spy = jest.spyOn(axios, 'patch')
    //         .mockImplementation(url => {
    //             return new Promise((resolve, reject) => {
    //                 const result = {
    //                     status: 200,
    //                     data: stubUser
    //                 }
    //                 resolve(result)
    //         })
    //     })
    
    //     store.dispatch(actionCreators.logIn())
    //         .then((done) => {
    //             const newState = store.getState()
    //             console.log(newState)
    //             console.log(newState.at)
    //             console.log(newState.at.users)
    //             expect(newState.at).toBe(stubInitialState2)
    //             expect(spy).toHaveBeenCalledTimes(1)
    //             done()
    //     });
    //   });
})