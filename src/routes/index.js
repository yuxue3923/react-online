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
                <Route exact path="/" component={Access}></Route>
                <Route path="/Account" component={Account}></Route>
                <Route path="/APP" component={App}></Route>
            </Switch>
            </BrowserRouter>
        )
    }
}