import * as actionTypes from './actionTypes'
import axios from 'axios'

// import { push } from 'connected-react-router'

export const getUsers_ = users => ({
    type: actionTypes.GET_USERS_ALL, users: users
})
export const getUsers = () => {
    return dispatch => {
        return axios.get('/api/user')
            .then(res => dispatch(getUsers_(res.data)))
            .catch(err => console.log(err))
    }
}
export const getArticles_ = articles => ({
    type: actionTypes.GET_ARTICLES_ALL, articles: articles
})
export const getArticles = () => {
    return dispatch => {
        return axios.get('/api/articles')
            .then(res => dispatch(getArticles_(res.data)))
            .catch(err => console.log(err))
    }
}
export const getComments_ = comments => ({
    type: actionTypes.GET_COMMENTS_ALL, comments: comments
})
export const getComments = () => {
    return dispatch => {
        return axios.get('/api/comments')
            .then(res => dispatch(getComments_(res.data)))
            .catch(err => console.log(err))
    }
}
export const logIn_ = user => ({
    type: actionTypes.LOG_IN, id: user.id
})
export const logIn = id => {
    return dispatch => {
        return axios.patch('/api/user/'+id, {logged_in: true})
            .then(res => dispatch(logIn_(res.data)))
            .catch(err => console.log(err))
    }
}
export const logOut_ = user => ({
    type: actionTypes.LOG_OUT, id: user.id
})
export const logOut = id => {
    console.log(id)
    return dispatch => {
        return axios.patch('/api/user/'+id, {logged_in: false})
            .then(res => dispatch(logOut_(res.data)))
            .catch(err => console.log(err))
    }
}
export const createArticle_ = article => ({
    type: actionTypes.CREATE_ARTICLE, id: article.id,
    author_id: article.author_id, title: article.title, 
    content: article.content
})
export const createArticle = article => {
    return dispatch => {
        return axios.post('/api/articles', article)
            .then(res => dispatch(createArticle_(res.data)))
            .catch(err => console.log(err))
    }
}
export const editArticle_ = (id, title, content) => ({
    type: actionTypes.EDIT_ARTICLE, id: id, title: title, content: content
})
export const editArticle = (id, title, content) => {
    return dispatch => {
        return axios.patch('/api/articles/'+id, { title: title, content: content} )
            .then(res => dispatch(editArticle_(id, title, content)))
            .catch(err => console.log(err))
    }
}
export const deleteArticle_ = id => ({
    type: actionTypes.DELETE_ARTICLE, id: id
})
export const deleteArticle = id => {
    return dispatch => {
        return axios.delete('/api/articles/'+id)
            .then(res => dispatch(deleteArticle_(id)))
            .catch(err => console.log(err))
    }
}
export const createComment_ = comment => ({
    type: actionTypes.CREATE_COMMENT, id: comment.id,
    article_id: comment.article_id, author_id: comment.author_id, 
    title: comment.title, content: comment.content
})
export const createComment = comment => {
    return dispatch => {
        return axios.post('/api/comments', comment)
            .then(res => dispatch(createComment_(res.data)))
            .catch(err => console.log(err))
    }
}
export const editComment_ = (id, content) => ({
    type: actionTypes.EDIT_COMMENT, id: id, content: content
})
export const editComment = (id, content) => {
    return dispatch => {
        return axios.patch('/api/comments/'+id, { content: content } )
            .then(res => dispatch(editComment_(id, content)))
            .catch(err => console.log(err))
    }
}
export const deleteComment_ = id => ({
    type: actionTypes.DELETE_COMMENT, id: id
})
export const deleteComment = id => {
    return dispatch => {
        return axios.delete('/api/comments/'+id)
            .then(res => dispatch(deleteComment_(id)))
            .catch(err => console.log(err))
    }
}