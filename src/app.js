
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import { fetchData } from './actions'
import * as reducers from './reducers';
reducers.routing = routerReducer;

//import * as localStore from './localStore';

import App from './components/App';
import Sidebar from './components/Sidebar';
import VisibleCards from './components/VisibleCards';
import NewCardModal from './components/NewCardModal';
import EditCardModal from './components/EditCardModal';
import StudyModal from './components/StudyModal';

const store = createStore(combineReducers(reducers), applyMiddleware(thunkMiddleware));
const history = syncHistoryWithStore(browserHistory, store);

const routes = ( <Route path='/' component={App}>
    <Route path='/deck/:deckId' component={VisibleCards}>
        <Route path='/deck/:deckId/new' component={NewCardModal} />
        <Route path='/deck/:deckId/edit/:cardId' component={EditCardModal} />
        <Route path='/deck/:deckId/study' component={StudyModal} />
    </Route>
    </Route> );

function save() {
    var state = store.getState();
    fetch('/api/data', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            decks: state.decks,
            cards: state.cards
        })
    });
}


function run() {
	let state = store.getState();
    ReactDOM.render((
        <Provider store={store}>
            <Router history={history}>
                {routes}
            </Router>
</Provider> ),document.getElementById('root'));
}


function init () {
    run();
    store.subscribe(run);
    store.subscribe(save);
    store.dispatch(fetchData());
}

init();
