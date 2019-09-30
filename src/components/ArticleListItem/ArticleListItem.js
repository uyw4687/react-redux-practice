import React, { Component } from 'react'

import './ArticleListItem.css'

class ArticleListItem extends Component {
    render() {
        return (
            <div className = "ArticleListItem" id={this.props.id}>
                <label className='id-label'>{this.props.id}</label>
                <button onClick={() => this.props.onClick(this.props.id)}>{this.props.title}</button>
                <label>{this.props.author}</label>
            </div>
        )
    }
}
export default ArticleListItem;