import React from 'react'
import { mount } from 'enzyme'
import Articles from './Articles'
import { getMockStore } from '../../test-utils/mocks'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import ArticleListItem from '../../components/ArticleListItem/ArticleListItem'

jest.mock('../../components/ArticleListItem/ArticleListItem', () => {
    return jest.fn(props => {
      return (
        <div className="spyArticleListItem">
          <button className="title-button" onClick={props.onClick} />
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

describe('<Articles />', () => {
    let articles
    let mockSetArticle = jest.fn()
    
    beforeEach(() => {
        articles = (
            <Provider store={mockStore}>
                <BrowserRouter>
                    <Articles setArticle={mockSetArticle}/>
                </BrowserRouter>
            </Provider>
        )
    })
    it('should render without errors', () => {
        const component = mount(articles)
        let wrapper = component.find('.Articles') 
        expect(wrapper.length).toBe(1)
        wrapper = component.find(ArticleListItem)
        wrapper = wrapper.at(0).find('.title-button')
        wrapper.simulate('click')
        wrapper = component.find(ArticleListItem)
        wrapper = wrapper.at(1).find('.title-button')
        wrapper.simulate('click')
    })
})