import React from 'react'
import ReactDOM from 'react-dom'
import Routers from './main/routes'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './main/reducers'

//middlewares
import multi from 'redux-multi'
import thunk from 'redux-thunk'
import promise from 'redux-promise'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__()

const store = applyMiddleware(multi, thunk, promise)(createStore)(reducers, devTools);
ReactDOM.render(
    <Provider store={store}>
        <Routers />
    </Provider>
, document.getElementById('app'));