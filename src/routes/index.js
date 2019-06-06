import React, { Component } from 'react';
import {Route,Switch,Redirect} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider}from 'react-redux';
import Reducer from '../reducers/index.js';
import App from '../App'
import Edit from '../pages/Edit'
import Account from '../pages/Account/Account'
import Access from '../pages/Access'
import Register from '../pages/Register'
import Createcourse from '../pages/Creatcourse/creatcourse'
import pagefirst from '../pages/CreatecourseNew/pagefirst'
import step2 from '../pages/CreatecourseNew/step2'
import Previewcourse from '../pages/Creatcourse/previewcourse'
import Tempreview from '../pages/Creatcourse/tempreview'
import User from '../pages/User'
import Updatecourse from '../pages/Updatecourse'
import Reviewcourse from '../pages/reviewcourse'
import Page from './Page.js';
const store=createStore(Reducer)
export default class RouterIndex extends Component {
    render() {
        return (
            <Provider store={store}>
            <BrowserRouter>
            <Page>
            {<Redirect to="/Access"/>}
            <Switch>
                <Route path="/Access" component={Access}></Route>
                <Route path="/Account" component={Account}></Route>
                <Route path="/APP" component={App}></Route>
                <Route path="/Edit" component={Edit}></Route>
                <Route path="/Previewcourse" component={Previewcourse}></Route>
                <Route path="/Updatecourse" component={Updatecourse}></Route>
                <Route path="/Createcourse" component={Createcourse}></Route>
                <Route path="/pagefirst" component={pagefirst}></Route>
                <Route path="/step2" component={step2}></Route>
                <Route path="/Tempreview" component={Tempreview}></Route>
                <Route path="/User" component={User}></Route>
                <Route path="/Reviewcourse" component={Reviewcourse}></Route>
                <Route path="/Register" component={Register}></Route>
            </Switch>
            </Page>
            </BrowserRouter>
            </Provider>
        )
    }
}