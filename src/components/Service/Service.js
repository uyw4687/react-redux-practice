import React, { Component } from 'react'
import Articles from '../../containers/Articles/Articles'
import Create from '../../containers/Create/Create'
import Article from '../../containers/Article/Article'
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

class Service extends Component {
    state = {
        state: 0, // 1:create, 2:article detail
        selectedArticle: 0
    }
    setArticle = (article) => {
        this.setState({ state: 2, selectedArticle: article })
    }
    render() {
        switch(this.state.state) {
            case 0:
                return (
                    <BrowserRouter>
                        <div className="Service">
                            <Route path='/articles' exact render={() => 
                                <Articles onCreate={() => this.setState({state: 1})} 
                                    setArticle={this.setArticle} 
                                    currentUserId={this.props.currentUserId} />} />
                            <Redirect exact from='/' to='/articles' />
                        </div>
                    </BrowserRouter>
                )
            case 1:
                return (
                    <BrowserRouter>
                        <div className="Service">
                            <Route path='/articles/create' exact render={() => 
                                    <Create 
                                        onBack={() => this.setState({state: 0})} 
                                        onConfirm={(id) => this.setArticle(id)} 
                                        currentUserId={this.props.currentUserId} />} />
                            <Redirect exact from='/' to='/articles/create' />
                        </div>
                    </BrowserRouter>
                )
            case 2:
                return (
                    <BrowserRouter>
                        <div className="Service">
                            <Route path='/articles/:id' exact render={({match}) => {
                                                                return <div className='ServiceArticle'>
                                                                        <Article onBack={() => this.setState({ state: 0 })}
                                                                                 id={this.state.selectedArticle}
                                                                                 currentUserId={this.props.currentUserId} />
                                                                        <Redirect from='/' to={'/articles/'+this.state.selectedArticle} />
                                                                       </div> }} />
                            <Redirect from='/' to={'/articles/'+this.state.selectedArticle} />
                        </div>
                    </BrowserRouter>
                )
            default:
                return (<div>nothing</div>)
        }
    }
}
export default Service;