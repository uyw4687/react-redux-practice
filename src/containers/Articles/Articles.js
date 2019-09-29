import React, { Component } from 'react'
import './Articles.css'

import ArticleListItem from '../../components/ArticleListItem/ArticleListItem'

import { connect } from 'react-redux'

class Articles extends Component {
    onClick = (articleNum) => {
        this.props.setArticle(articleNum)
    }
    authorIdToName = author_id => 
        this.props.storedUsers.filter(user => user.id === author_id)[0].name
    render() {
        const articles = this.props.storedArticles.map((article) => 
            <ArticleListItem key={article.id}
                id={article.id} 
                title={article.title}
                onClick={this.onClick}
                author={this.authorIdToName(article.author_id)} />)
        return (
            <div className="Articles">
                <label id='title-label'>Articles</label>
                <ArticleListItem key='id'
                id='id'
                title='Title'
                onClick={() => {}}
                author='Author' />
                <div className='ArticleList'>
                    {articles}
                </div>
                <button id='create-article-button' onClick={this.props.onCreate}>Create</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        storedArticles: state.at.articles,
        storedUsers: state.at.users
    }
}

export default connect(mapStateToProps, null)(Articles)