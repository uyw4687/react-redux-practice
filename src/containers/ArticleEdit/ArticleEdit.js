import React, { Component } from 'react'
import CreateButtons from '../CreateButtons/CreateButtons'

import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/blog'

import './ArticleEdit.css'

class ArticleEdit extends Component {
    constructor(props) {
        super(props)
        const article = this.props.storedArticles.filter(article =>
            article.id === parseInt(this.props.id)
            )[0]
        this.state = {title: article.title,
            content: article.content,
            preview: false}
        this.originalValue = {title: article.title,
            content: article.content,
            preview: false}
    }
    authorIdToName = author_id => 
        this.props.storedUsers.filter(user => user.id === author_id)[0].name
    onBack = () => {
        if(this.state.title !== this.originalValue.title ||
            this.state.content !== this.originalValue.content)
            if(!window.confirm('Are you sure? The change will be lost.'))
                return
        this.props.onBack()
    }
    onConfirm = () => {
        if(this.state.title!=='' && this.state.content!=='') {
            this.props.onEditArticle(this.props.id, this.state.title, this.state.content)
            this.props.onConfirm()
        }
    }
    createButtons(isPreview) {
        return (
            <CreateButtons 
                onBack={this.onBack}
                onConfirm={this.onConfirm}
                onPreview={() => this.setState({ preview: true })}
                onWrite={() => this.setState({ preview: false })}
                buttonId='edit'
                isPreview={isPreview}
            />
        )
    }
    render() {
        if(this.state.preview===false) {
            return (
                <div className="ArticleEdit">
                    <label id='title-label'>Title</label>
                    <textarea type="text" id="article-title-input" value={this.state.title} onChange={(event) => this.setState({ title: event.target.value })} />
                    <label id='content-label'>Content</label>
                    <textarea type="text" id="article-content-input" value={this.state.content} onChange={(event) => this.setState({ content: event.target.value })} />
                    {this.createButtons(false)}
                </div>
            )
        }
        else {
            return (
                <div className="ArticleEdit">
                        <label>{'<'}Preview{'>'}</label>
                        <div className='ArticleInformation'>
                            <h3 id='article-title'>{this.state.title}</h3>
                            <h3 id='article-author'>{this.authorIdToName(this.props.currentUserId)}</h3>
                            <p id='article-content'>{this.state.content}</p>
                        </div>
                        {this.createButtons(true)}
                </div>
            )
        }
    }
}
const mapStateToProps = state => {
    return {
        storedArticles: state.at.articles,
        storedUsers: state.at.users,
        storedCurrentUserId: state.at.currentUserId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onEditArticle: (id, title, content) =>
            dispatch(actionCreators.editArticle(id, title, content))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ArticleEdit)