import React, { Component } from 'react'
import CreateButtons from '../CreateButtons/CreateButtons'

import "./Create.css"

import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions/actionTypes'

class Create extends Component {
    state = {
        title: '',
        content: '',
        preview: false
    }
    createButtons(isPreview) {
        return (
            <CreateButtons 
                onBack={this.props.onBack}
                onConfirm={this.onConfirm}
                onPreview={() => this.setState({ preview: true })}
                onWrite={() => this.setState({ preview: false })}
                buttonId='create'
                isPreview={isPreview}
            />
        )
    }
    authorIdToName = author_id => 
        this.props.storedUsers.filter(user => user.id === author_id)[0].name
    onConfirm = () => {
        if(this.state.title!=='' && this.state.content!=='')
            this.props.onCreateArticle(this.state.title, this.state.content)
    }
    componentDidUpdate(prevProps) {
        if(prevProps.storedArticles !== this.props.storedArticles){
            this.props.onConfirm(this.props.storedArticles.length)
        }
    }
    render() {
        if(this.state.preview===false) {
            return (
                <div className="Create">
                    <label id="title-label">Title</label>
                    <textarea type="text" id="article-title-input" value={this.state.title} onChange={(event) => this.setState({ title: event.target.value })} />
                    <label id="content-label">Content</label>
                    <textarea type="text" id="article-content-input" value={this.state.content} onChange={(event) => this.setState({ content: event.target.value })} />
                    {this.createButtons(false)}
                </div>
            )
        }
        else {
            return (
                <div className="Create">
                    <label>{'<'}Preview{'>'}</label>
                    <div className='ArticleInformation'>
                        <h3 id='article-title'>{this.state.title}</h3>
                        <h3 id='article-author'>{this.authorIdToName(this.props.storedCurrentUserId)}</h3>
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
        onCreateArticle: (title, content) =>
            dispatch({ type: actionTypes.CREATE_ARTICLE, title: title, content: content }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create)