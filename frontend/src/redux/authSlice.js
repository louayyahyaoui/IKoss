import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosOriginal from 'axios';

import AxiosInstance, { baseURL } from '../axios/AxiosInstance';

export const login = createAsyncThunk('auth/login', async (values) => {
  try {
    const response = await axiosOriginal.post(`${baseURL}/auth/login`, values, {
      withCredentials: true
    });
    if (response.data.token) {
      // save the token in the local storage
      localStorage.setItem('token', response.data.token);
    }
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
export const refreshToken = createAsyncThunk('auth/refreshToken', async () => {
  try {
    const response = await axiosOriginal.get(`${baseURL}/auth/refreshToken`, {
      withCredentials: true
    });
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

export const logout = createAsyncThunk('auth/logout', async () => {
  const response = await AxiosInstance.get('/auth/logout', {
    withCredentials: true
  });
  return response.data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    init: false
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.loading = false;
    },
    selectToken: (state) => {
      return state.token;
    }
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.error = null;
    },
    [login.fulfilled]: (state, action) => {
      state.user = {
        firstName: action.payload.user.etudiantData?.nom || '',
        lastName: '',
        ...action.payload.user.userOfData,
        ...action.payload.user.teleproData,
        ...action.payload.user.formateurData,
        ...action.payload.user.etudiantData,
        ...action.payload.user
      };
      state.token = action.payload.token;
      state.loading = false;
      state.init = true;
    },
    [refreshToken.pending]: (state) => {
      state.error = null;
      state.loading = true;
    },
    [refreshToken.fulfilled]: (state, action) => {
      state.user = {
        firstName: action.payload.user.etudiantData?.nom || '',
        lastName: '',
        ...action.payload.user
      };
      state.init = true;

      state.token = action.payload.token;
      state.loading = false;
    },
    [refreshToken.rejected]: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
    },
    [login.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
    [logout.pending]: (state) => {
      state.error = null;
    },
    [logout.fulfilled]: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
    },
    [logout.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    }
  }
});

export const { setToken, selectToken } = authSlice.actions;
export default authSlice.reducer;
