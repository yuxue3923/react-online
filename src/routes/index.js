import React, { Component } from 'react';
import {Route,Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider}from 'react-redux';
import Reducer from '../reducers/index.js';
import App from '../App'
import Account from '../pages/Account/Account'
import Access from '../pages/Access'
import Register from '../pages/Register'
import Createcourse from '../pages/Creatcourse/creatcourse'
import Tempreview from '../pages/Creatcourse/tempreview'
import User from '../pages/User'
import Updatecourse from '../pages/Updatecourse'
const store=createStore(Reducer)
export default class RouterIndex extends Component {
    render() {
        return (
            <Provider store={store}>
            <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Access}></Route>
                <Route path="/Account" component={Account}></Route>
                <Route path="/APP" component={App}></Route>
                <Route path="/Updatecourse" component={Updatecourse}></Route>
                <Route path="/Createcourse" component={Createcourse}></Route>
                <Route path="/Tempreview" component={Tempreview}></Route>
                <Route path="/Register" component={Register}></Route>
                <Route path="/User" component={User}></Route>
            </Switch>
            </BrowserRouter>
            </Provider>
        )
    }
}