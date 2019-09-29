import React, { Component } from 'react'

import './Comment.css'

import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions/actionTypes'

class Comment extends Component {
    onEdit = () => {
        var edited = window.prompt('Edit Comment', this.props.content)
        if(edited === '' || edited === null)
            return
        this.props.onEditComment(this.props.id, edited)
    }
    returnButtons = () => {
        if(this.props.isAuthor) {
            return (
                <div className='CommentButtons'>
                    <button id='edit-comment-button' onClick={() => this.onEdit()}>Edit</button>
                    <button id='delete-comment-button' onClick={() => this.props.onDeleteComment(this.props.id)}>Delete</button>
                </div>
            )
        }
        else
            return <label className='NotAnAuthor'></label>
    }
    render() {
        return (
            <div className="Comment">
                <label className='Name'>{this.props.name}</label>
                <label className='Content'>{this.props.content}</label>
                {this.returnButtons()}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onEditComment: (id, content) =>
            dispatch({ type: actionTypes.EDIT_COMMENT, id: id, content: content }),
        onDeleteComment: (id) =>
            dispatch({ type: actionTypes.DELETE_COMMENT, id: id })
    }
}

export default connect(null, mapDispatchToProps)(Comment)