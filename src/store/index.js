/* eslint-disable import/extensions */
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducer/index.js';

// eslint-disable-next-line import/prefer-default-export
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
