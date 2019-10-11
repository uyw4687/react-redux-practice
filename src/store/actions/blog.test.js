import React from 'react'
import * as actionCreators from './blog'
import store from '../store'
import axios from 'axios'

describe('ActionCreators', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  const stubStore = {
      articles: [
          { id: 1, author_id: 1, title: 'Let\'s', content: 'eateateateateateateateateateateateateateateat\nplayplayplayplayplayplayplayplayplayplayplayplay\ndrinkdrinkndrinkdrinkndrinkdrinkndrinkdrinkndrink' },
      ],
      comments: [
          { id: 1, author_id: 1, article_id: 1, content: 'eat yeahhh' },
     ],
      users: [
          { id: 1, email: 'swpp@snu.ac.kr', password: 'iluvswpp', name: 'BJH', logged_in: false },
      ]
  }
  it(`'getArticles' should fetch articles correctly`, (done) => {
    const stubArticleList = [stubStore.articles[0]];

    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubArticleList
          }
          resolve(result)
        })
      })

    store.dispatch(actionCreators.getArticles()).then(() => {
      const newState = store.getState()
      expect(newState.at.articles).toBe(stubArticleList)
      expect(spy).toHaveBeenCalledTimes(1)
      done()
    })
  })
  it(`'createComment' should create a comment correctly`, (done) => {
      const spy = jest.spyOn(axios, 'post')
        .mockImplementation(url => {
          return new Promise((resolve, reject) => {
            const result = {
              status: 200,
              data: stubStore.comments[0]
            };
            resolve(result);
          });
        })
  
      store.dispatch(actionCreators.createComment()).then(() => {
        const newState = store.getState()
        expect(newState.at.comments[0]).toEqual(stubStore.comments[0])
        expect(spy).toHaveBeenCalledTimes(1)
        done()
      })
    })
  it(`'editArticle' should edit an article correctly`, (done) => {
    const spy = jest.spyOn(axios, 'patch')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200
          }
          resolve(result)
        })
      })

    store.dispatch(actionCreators.editArticle()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1)
      done()
    })
  })
  it(`'deleteArticle' should delete an article correctly`, (done) => {
    const spy = jest.spyOn(axios, 'delete')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200
          }
          resolve(result)
        })
      })

    store.dispatch(actionCreators.deleteArticle()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1)
      done()
    })
  })
  it(`'deleteComment' should delete a comment correctly`, (done) => {
    const spy = jest.spyOn(axios, 'delete')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200
          }
          resolve(result)
        })
      })

    store.dispatch(actionCreators.deleteComment()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1)
      done()
    })
  })
})