import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware
} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from './root-saga';

import { rootReducer } from './root-reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [
  process.env.NODE_ENV !== 'production' && logger,
  sagaMiddleware
].filter(
  Boolean
);

const composeEnhancer = (
  process.env.NODE_ENV !==' production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

const composeEnhencers = composeEnhancer(applyMiddleware(...middlewares));

export const store = createStore(persistedReducer, undefined, composeEnhencers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
