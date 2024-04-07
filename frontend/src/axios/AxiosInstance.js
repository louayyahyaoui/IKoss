import axios from 'axios';

function getLocalAccessToken() {
  const accessToken = window.localStorage.getItem('token');
  return accessToken;
}
export const baseURL = `${process.env.REACT_APP_BACKEND_URL}/api`;
const AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = getLocalAccessToken();
    if (token) {
      config.headers.authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      // Access Token was expired
      console.log(err.response.status);
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          console.log('Hello');
          const response = await AxiosInstance.get('/auth/refreshToken', {
            withCredentials: true
          });

          const accessToken = response.data.token;
          window.localStorage.setItem('token', accessToken);
          AxiosInstance.defaults.headers.authorization = accessToken;
          console.log('Access Token was refreshed', getLocalAccessToken());
          return instance(originalConfig);
        } catch (_error) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }

          return Promise.reject(_error);
        }
      }

      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }

    return Promise.reject(err);
  }
);

export default AxiosInstance;
