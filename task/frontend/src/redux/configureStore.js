import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import {thunk} from 'redux-thunk';
import AuthReducer from '../modules/Auth/reducer/AuthReducer'
import StudentReducer from '../modules/student_management/reducer/StudentReducer';

// console.log(process.env.REACT_APP_NODE_ENV)
const rootReducer = combineReducers({
    Auth:AuthReducer,
    Student:StudentReducer,
})

const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
  reducer:persistedReducer,
  devTools: process.env.REACT_APP_NODE_ENV !== 'production',
  middleware:  (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export default store

export const persistor = persistStore(store)