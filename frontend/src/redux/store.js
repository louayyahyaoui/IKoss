
import { configureStore } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';
import auth from './authSlice';
import product from './productSlice';

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['auth']
};

const rootReducer = combineReducers({
  auth,
  product
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // other store configuration options
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
export const persistor = persistStore(store);
