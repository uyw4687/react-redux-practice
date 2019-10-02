import React, { Component } from 'react'
import ArticleEdit from '../ArticleEdit/ArticleEdit'
import Comment from '../../components/Comment/Comment'

import { BrowserRouter, Route, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/blog'

import './Article.css'

class Article extends Component {
    state = { 
        newComment: '', 
        state: 0
    }
    onEdit = () => {
        this.setState({state: 1});
    }
    checkBlank = () => this.state.newComment === ''
    clearComments = (i) => {
        var comments = this.props.storedComments
        if(i<comments.length) {
            setTimeout( () => {
                if(comments[i].article_id === this.props.id)
                    this.props.onDeleteComment(comments[i].id)
                else {
                    while(i++<comments.length-1) {
                        if(comments[i].article_id === this.props.id) {
                            i--
                            break
                        }
                    }
                }
                i++
                this.clearComments(i)
            }, 100)
        }
    }
    onDelete = () => {
        this.clearComments(0)
        this.props.onDeleteArticle(this.props.id)
        this.props.onBack()
    }
    createButtons = () => {
        if(this.article.author_id === this.props.currentUserId)
            return (
                <div className='ArticleButtons'>
                    <button id='edit-article-button' onClick={this.onEdit}>Edit</button>
                    <button id='delete-article-button' onClick={this.onDelete}>Delete</button>
                </div>
            )
        return
    }
    authorIdToName = author_id => {
        return this.props.storedUsers.filter(user => user.id === author_id)[0].name
    }
    getArticle = () =>
        this.props.storedArticles.filter(article =>
            article.id === this.props.id)[0]

    article = this.getArticle()

    getComments = () =>
        this.props.storedComments.filter(comment =>
            comment.article_id === this.props.id
            ).map(comment => 
                <Comment key={comment.id} id={comment.id}
                         name={this.authorIdToName(comment.author_id)} 
                         content={comment.content} isAuthor={comment.author_id===this.props.currentUserId} />
            )
    onCreateComment = () => {
        if(!this.checkBlank()) {
            this.props.onCreateComment(this.props.id, this.props.currentUserId, this.state.newComment)
            this.setState({newComment: ''})
        }
    }
    componentDidUpdate(prevProps) {
        if(prevProps.storedComments !== this.props.storedComments ||
            prevProps.storedArticles !== this.props.storedArticles)
            this.forceUpdate()
    }
    render() {
        console.log(this.props.id)
        this.article = this.getArticle()
        if(this.state.state === 0) {
            return (
                <BrowserRouter>
                    <div className="Article">
                        <div className='ArticleInformation' id='article-articleinformation'>
                            <h3 id='article-title'>{this.article.title}</h3>
                            <h3 id='article-author'>{this.authorIdToName(this.article.author_id)}</h3>
                            <p id='article-content'>{this.article.content}</p>
                        </div>
                        {this.createButtons()}
                        <button id='back-detail-article-button' onClick={this.props.onBack}>Back</button>
                        <input type="text" id="new-comment-content-input" value={this.state.newComment} onChange={(event) => this.setState({ newComment: event.target.value })} />
                        <button id='confirm-create-comment-button' disabled={this.checkBlank()} onClick={this.onCreateComment}>Create</button>
                        <p id='comments-label'>Comments</p>
                        {this.getComments()}
                        <Redirect exact from='/' to={'/articles/'+this.props.id} />
                    </div>
                </BrowserRouter>
            )
        }
        else if(this.state.state === 1) {
            return (
                <BrowserRouter>
                    <div className="Article">
                        <Route path='/articles/:id/edit' exact render={() => 
                                        <ArticleEdit 
                                            id={this.props.id}
                                            onBack={() => this.setState({state: 0})}
                                            onConfirm={() => this.setState({state: 0})}
                                            currentUserId={this.props.currentUserId} />} />
                        <Redirect exact from='/' to={'/articles/'+this.props.id+'/edit'} />
                    </div>
                </BrowserRouter>
            )
        }
    }
}
const mapStateToProps = state => {
    return {
        storedArticles: state.at.articles,
        storedComments: state.at.comments,
        storedUsers: state.at.users
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onDeleteArticle: (id) =>
            dispatch(actionCreators.deleteArticle(id)),
        onCreateComment: (article_id, author_id, content) =>
            dispatch(actionCreators.createComment({ article_id: article_id, author_id: author_id, content: content })),
        onDeleteComment: (id) =>
            dispatch(actionCreators.deleteComment(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Article)