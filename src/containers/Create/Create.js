import React, { Component } from 'react'
import CreateButtons from '../CreateButtons/CreateButtons'

import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/blog'

import "./Create.css"

class Create extends Component {
    state = {
        title: '',
        content: '',
        preview: false
    }
    checkBlank = () => this.state.title === '' || this.state.content === ''
    onConfirm = () => {
        if(!this.checkBlank())
            this.props.onCreateArticle(this.props.currentUserId, this.state.title, this.state.content)
    }
    createButtons(isPreview) {
        return (
            <CreateButtons 
                onBack={this.props.onBack}
                onConfirm={this.onConfirm}
                onPreview={() => this.setState({ preview: true })}
                onWrite={() => this.setState({ preview: false })}
                buttonId='create'
                isBlank={this.checkBlank()}
                isPreview={isPreview}
            />
        )
    }
    authorIdToName = author_id => {
        console.log(this.props.storedUsers)
        console.log(author_id)
        console.log(this.props.storedUsers.filter(user => user.id === author_id))
        console.log(this.props.storedUsers.filter(user => user.id === author_id)[0])
        return this.props.storedUsers.filter(user => user.id === author_id)[0].name
    }
    componentDidUpdate(prevProps) {
        if(prevProps.storedArticles !== this.props.storedArticles)
            this.props.onConfirm(this.props.storedArticles[this.props.storedArticles.length-1].id)
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
        storedUsers: state.at.users
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onCreateArticle: (author_id, title, content) =>
            dispatch(actionCreators.createArticle({author_id: author_id, title: title, content: content}))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Create)