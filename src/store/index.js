import { createStore, combineReducers } from 'redux';
import player from './player';

const store = createStore(combineReducers({ player }));

export default store;
