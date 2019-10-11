import React from 'react'
import reducer from './article'
import * as actionTypes from '../actions/actionTypes'

const stubStore = {
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

describe('Article Reducer', () => {
    it('should return default state', () => {
        const newState = reducer(undefined, {}) // initialize
        expect(newState).toEqual({articles: [], comments: [], users: []})
    })
    it('should get all users', () => {
        const newState = reducer({...stubStore, users: undefined}, {
            type: actionTypes.GET_USERS_ALL,
            users: stubStore.users
        })
        expect(newState.users).toEqual(stubStore.users)
    })
    it('should get all comments', () => {
        const newState = reducer({...stubStore, comments: undefined}, {
            type: actionTypes.GET_COMMENTS_ALL,
            comments: stubStore.comments
        })
        expect(newState.comments).toEqual(stubStore.comments)
    })
    it('should create article', () => {
        const newContent = 'NEW_CONTENT'
        const newState = reducer(undefined, {
            type: actionTypes.CREATE_ARTICLE,
            id: stubStore.articles[0].id,
            author_id: stubStore.articles[0].author_id,
            title: stubStore.articles[0].title,
            content: newContent
        })
        expect(newState.articles[0]).toEqual({
            ...stubStore.articles[0], content: newContent
        })
    })
    it('should handle login', () => {
        const newState = reducer(stubStore, {
            type: actionTypes.LOG_IN,
            id: stubStore.users[0].id
        })
        expect(newState.users[0]).toEqual({
            ...stubStore.users[0], logged_in: true
        })
    })
    it('should handle logout', () => {
        const stubUser = { id: 1, email: 'swpp@snu.ac.kr', password: 'iluvswpp', name: 'BJH', logged_in: false }
        const newState = reducer({...stubStore, users: [stubUser, stubStore.users[1]]}, {
            type: actionTypes.LOG_OUT,
            id: stubStore.users[0].id
        })
        expect(newState.users[0]).toEqual({
            ...stubStore.users[0], logged_in: false
        })
    })
    it('should edit article', () => {
        const newContent = 'NEW_CONTENT'
        const newState = reducer(stubStore, {
            type: actionTypes.EDIT_ARTICLE,
            id: stubStore.articles[0].id,
            title: stubStore.articles[0].title,
            content: newContent
        })
        expect(newState.articles[0]).toEqual({
            ...stubStore.articles[0], content: newContent
        })
    })
    it('should edit comment', () => {
        const newContent = 'NEW_CONTENT'
        const newState = reducer(stubStore, {
            type: actionTypes.EDIT_COMMENT,
            id: stubStore.comments[0].id,
            content: newContent
        })
        expect(newState.comments[0]).toEqual({
            ...stubStore.comments[0], content: newContent
        })
    })
})