import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AxiosInstance from '../axios/AxiosInstance';

export const getProducts = createAsyncThunk('product/getProducts', async () => {
  try {
    // get the token from the local storage
    const token = localStorage.getItem('token');
    console.log(token);
    /* const response = await axios.get('/produits', {
      headers: {
        Authorization: token
      }
    }); */
    const response = await AxiosInstance.get('/produits');
    return response.data;
  } catch (error) {
    const customError = {
      name: 'Custom axios error',
      message: error.response.data.error,
      data: error.response.data
    };
    throw customError;
  }
});

export const addProduct = createAsyncThunk('product/addProduct', async (values) => {
  try {
    const response = await AxiosInstance.post('/produit', values);
    return response.data;
  } catch (error) {
    const customError = {
      name: 'Custom axios error',
      message: error.response.data.error,
      data: error.response.data
    };
    throw customError;
  }
});

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    loading: false,
    error: null
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    }
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.error = null;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
    },
    [getProducts.rejected]: (state, action) => {
      state.error = action.error.message;
    },
    [addProduct.pending]: (state) => {
      state.error = null;
    },
    [addProduct.fulfilled]: (state, action) => {
      state.products.push(action.payload);
    }
  }
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
