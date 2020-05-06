import { applyMiddleware, createStore, compose} from "redux";
import rootReducer from "../reducers/rootReducer";
import createSagaMiddleware from 'redux-saga'
import rootSaga from "../sagas/index";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const composeEnhancers =
    (process.env.NODE_ENV === 'development' && typeof window === 'object' &&
        window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']) ?
        window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

/*
  creating store
*/
function ConfigureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga)
  return store;
}

export default ConfigureStore({});