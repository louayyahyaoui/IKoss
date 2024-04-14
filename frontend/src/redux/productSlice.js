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
    return response.data.res;
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
    // remove _id from the values
    delete values._id;
    const response = await AxiosInstance.post('/produit', values);
    return response?.data?.res;
  } catch (error) {
    const customError = {
      name: 'Custom axios error',
      message: error.response.data.message,
      data: error.response.data
    };
    throw customError;
  }
});

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id) => {
  try {
    await AxiosInstance.delete(`/produit/${id}`);
    return id;
  } catch (error) {
    const customError = {
      name: 'Custom axios error',
      message: error.response.data.error,
      data: error.response.data
    };
    throw customError;
  }
});

export const editProduct = createAsyncThunk('product/editProduct', async (values) => {
  try {
    console.log('values', values);
    const response = await AxiosInstance.put(`/produit/${values._id}`, values);
    return response.data.res;
  } catch (error) {
    const customError = {
      name: 'Custom axios error',
      message: error.response.data.message,
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
    },
    [addProduct.rejected]: (state, action) => {
      state.error = action.error.message;
    },
    [deleteProduct.pending]: (state) => {
      state.error = null;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.products = state.products.filter((item) => {
        return item._id !== action.payload;
      });
    },
    [deleteProduct.rejected]: (state, action) => {
      state.error = action.error.message;
    },
    [editProduct.pending]: (state) => {
      state.error = null;
    },
    [editProduct.fulfilled]: (state, action) => {
      state.products = state.products.map((item) => {
        if (item._id === action.payload._id) {
          item = action.payload;
          return item;
        }
        return item;
      });
    },
    [editProduct.rejected]: (state, action) => {
      state.error = action.error.message;
    }
  }
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
