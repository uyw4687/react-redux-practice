import React, { Component } from 'react'

import { BrowserRouter, Route, Redirect } from 'react-router-dom'

import ArticleEdit from '../ArticleEdit/ArticleEdit'
import Comment from '../../components/Comment/Comment'

import './Article.css'

import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions/actionTypes'

class Article extends Component {
    state = { 
        newComment: '', 
        state: 0
    }
    postTodoHandler = () => {
        const data = { email: this.state.email, password: this.state.password };
        if (data.email === "swpp@snu.ac.kr" && data.password === "iluvswpp")
            this.props.onSuccess();
        else
            alert("Email or password is wrong");
    }
    onEdit = () => {
        this.setState({state: 1});
    }
    onDelete = () => {
        this.props.onDeleteArticle(this.props.id)
        this.props.onBack()
    }

    createButtons = () => {
        if(this.article.author_id === this.props.storedCurrentUserId)
            return (
                <div className='ArticleButtons'>
                    <button id='edit-article-button' onClick={this.onEdit}>Edit</button>
                    <button id='delete-article-button' onClick={this.onDelete}>Delete</button>
                </div>
            )
        return
    }

    authorIdToName = author_id => 
        this.props.storedUsers.filter(user => user.id === author_id)[0].name
    
    getArticle = () =>
        this.props.storedArticles.filter(article =>
            article.id === this.props.id)[0]

    article = this.getArticle()

    getComments = () =>
        this.props.storedComments.filter(comment =>
            comment.article_id === this.props.id
            ).map(comment => 
                <Comment key={comment.id} id={comment.id} name={this.authorIdToName(comment.author_id)} content={comment.content} isAuthor={comment.author_id===this.props.storedCurrentUserId} />
            )
    onCreateComment = () => {
        if(this.state.newComment !== '') {
            this.props.onCreateComment(this.props.id, this.state.newComment)
            this.setState({newComment: ''})
        }
    }
    componentDidUpdate(prevProps) {
        if(prevProps.storedComments !== this.props.storedComments ||
            prevProps.storedArticles !== this.props.storedArticles)
            this.forceUpdate()
    }
    render() {
        this.article = this.getArticle()
        console.log('here inside')
        console.log(this.props.storedArticles)
        console.log(this.props.id)
        console.log(this.article)
        console.log(this.props.storedArticles.filter(article =>
            article.id === this.props.id))
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
                        <button id='confirm-create-comment-button' onClick={this.onCreateComment}>Create</button>
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
                                            onConfirm={() => this.setState({state: 0})} />} />
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
        storedCurrentUserId: state.at.currentUserId,
        storedUsers: state.at.users,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDeleteArticle: (id) =>
            dispatch({ type: actionTypes.DELETE_ARTICLE, id: id }),
        onCreateComment: (article_id, content) =>
            dispatch({ type: actionTypes.CREATE_COMMENT, article_id: article_id, content: content })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article)