import React, { Component } from 'react';
import {Route,Switch,Redirect} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider}from 'react-redux';
import Reducer from '../reducers/index.js';
import Edit from '../pages/Edit/'
import Account from '../pages/Account/Account'
import Access from '../pages/Access'
import Register from '../pages/Register'
import Createcourse from '../pages/Creatcourse/creatcourse'
import pagefirst from '../pages/CreatecourseNew/pagefirst'
import Previewcourse from '../pages/Creatcourse/previewcourse'
import Tempreview from '../pages/Creatcourse/tempreview'
import User from '../pages/User'
import Teach from '../pages/Teach'
import Updatecourse from '../pages/Updatecourse'
import Reviewcourse from '../pages/reviewcourse'
import Page from './Page.js';
import MagnifyPreview from '../pages/MagnifyPreview'

import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import {PersistGate} from 'redux-persist/lib/integration/react';
const persistConfig = {
    key: 'root',
    storage: storage,
   // stateReconciler: autoMergeLevel2 // 查看 'Merge Process' 部分的具体情况
};

const myPersistReducer = persistReducer(persistConfig, Reducer)

const store = createStore(myPersistReducer)
const persistor = persistStore(store)

//const store=createStore(Reducer)
export default class RouterIndex extends Component {
    render() {
        return (
            <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
            <Page>
           {/*  {<Redirect to="/Access"/>} */}
            <Switch>
                <Route exact path="/" component={Access}> </Route>
                <Route path="/Account" component={Account}></Route>
                <Route path="/Teach" component={Teach}></Route>
                <Route path="/Edit" component={Edit}></Route>
                <Route path="/Previewcourse" component={Previewcourse}></Route>
                <Route path="/Updatecourse" component={Updatecourse}></Route>
                <Route path="/Createcourse" component={Createcourse}></Route>
                <Route path="/pagefirst" component={pagefirst}></Route>
                <Route path="/MagnifyPreview" component={MagnifyPreview}></Route>
                <Route path="/Tempreview" component={Tempreview}></Route>
                <Route path="/User" component={User}></Route>
                <Route path="/Reviewcourse" component={Reviewcourse}></Route>
                <Route path="/Register" component={Register}></Route>
            </Switch>
            </Page>
            </BrowserRouter>
            </PersistGate>
            </Provider>
        )
    }
}