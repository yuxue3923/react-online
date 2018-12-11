import React, { Component } from 'react';

import { Link, HashRouter,BrowserRouter,Route,Switch} from 'react-router-dom';

import App from '../App'
import Account from '../pages/Account'
import Access from '../pages/Access'

export default class RouterIndex extends Component {
    render() {
        return (
            <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App}></Route>
                <Route path="/Account" component={Account}></Route>
                <Route path="/Access" component={Access}></Route>
            </Switch>
            </BrowserRouter>
        )
    }
}