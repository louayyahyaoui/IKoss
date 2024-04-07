import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../redux/authSlice';
import productSlice from '../redux/productSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice
  },
  devTools: true
});

export const useSelector = useReduxSelector;

export const useDispatch = () => useReduxDispatch();

export default store;
