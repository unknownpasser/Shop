import axios from 'axios'
import store from './store'

const http = axios.create({
  timeout: 30000
});

http.interceptors.request.use(
  config => {
    store.commit('onLoading')
    let token = store.state.token
    if (token != "") {
      config.headers.Authorization = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//respone拦截器
http.interceptors.response.use(
  response => {
    store.commit('offLoading');
    return response;
  },
  error => {
    return Promise.reject(error.response);
  }
);

export default http;