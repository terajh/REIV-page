import { combineReducers } from 'redux';
import maps from './state';
// Merge multiple reducers in single reducer object (root reducer)
export default combineReducers({
    maps
})