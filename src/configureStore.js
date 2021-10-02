import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './redux/reducers'
import thunk from 'redux-thunk';

export const history = createBrowserHistory()

export default function configureStore(preloadedState) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        createRootReducer(history),
        composeEnhancers(
            applyMiddleware(
                routerMiddleware(history),
                thunk
            )
        ),
        preloadedState,
    )

    // Hot reloading
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./redux/reducers', () => {
            store.replaceReducer(createRootReducer(history));
        });
    }

    return store
}
