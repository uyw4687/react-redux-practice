import * as actionTypes from '../actions/actionTypes'

const initialState = {
    articles: [
        { id: 1, author_id: 1, title: 'Let\'s', content: 'eateateateateateateateateateateateateateateat\nplayplayplayplayplayplayplayplayplayplayplayplay\ndrinkdrinkndrinkdrinkndrinkdrinkndrinkdrinkndrink' },
        { id: 2, author_id: 1, title: 'Movie', content: 'yeah watch movie' },
        { id: 3, author_id: 2, title: 'Dinner', content: 'oh eat dinner' }
    ],
    comments: [
        { id: 1, author_id: 1, article_id: 1, content: 'eat yeahhh' },
        { id: 2, author_id: 2, article_id: 1, content: 'drive!!!!' },
        { id: 3, author_id: 3, article_id: 1, content: 'drink >< ><' },
        { id: 3, author_id: 2, article_id: 2, content: 'drink yeahh' }
    ],
    users: [
        { id: 1, email: 'swpp@snu.ac.kr', password: 'iluvswpp', name: 'BJH', logged_in: false },
        { id: 2, email: '2', password: '1', name: 'OSK', logged_in: false },
        { id: 3, email: '3', password: '1', name: 'Gab', logged_in: false }
    ],
    selectedArticle: null,
    currentUserId: 0 // not yet logged in
}
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.LOG_IN:
            var edited = state.users.map(user => {
                if(user.id === action.id)
                    return { ...user, logged_in: true }
                return user
                })
            return { ...state, users: edited, currentUserId: action.id }
        case actionTypes.LOG_OUT:
            edited = state.users.map(user => {
                if(user.id === state.currentUserId)
                    return { ...user, logged_in: false }
                return user
                })
            return { ...state, users: edited, currentUserId: 0 }
        case actionTypes.CREATE_ARTICLE:
            var newArticle = { id: state.articles.length + 1, author_id: state.currentUserId, title: action.title, content: action.content }
            var added = state.articles.concat( newArticle )
            return { ...state, articles: added }
        case actionTypes.EDIT_ARTICLE:
            edited = state.articles.map(article => {
                if(article.id === action.id)
                    return { ...article, title: action.title, content: action.content }
                return article              
                })
            return { ...state, articles: edited }
        case actionTypes.DELETE_ARTICLE:
            var articles = state.articles.filter(article => 
                article.id !== action.id)
            var comments = state.comments.filter(comment => 
                comment.article_id !== action.id)
            return { ...state, articles: articles, comments: comments }
        case actionTypes.CREATE_COMMENT:
            var newComment = { id: state.comments.length + 1, author_id: state.currentUserId, article_id: action.article_id, content: action.content }
            added = state.comments.concat( newComment )
            return { ...state, comments: added }
        case actionTypes.EDIT_COMMENT:
            edited = state.comments.map(comment => {
                if(comment.id === action.id)
                    return { ...comment, content: action.content }
                return comment
                })
            return { ...state, comments: edited }
        case actionTypes.DELETE_COMMENT:
            comments = state.comments.filter(comment => 
                comment.id !== action.id  
            )
            return { ...state, comments: comments }
        default:
            break
    }
    return state
}
export default reducer