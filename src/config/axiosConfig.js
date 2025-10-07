import axios from 'axios';

// Add ngrok-skip-browser-warning header to all requests
axios.interceptors.request.use(
  (config) => {
    config.headers['ngrok-skip-browser-warning'] = 'true';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
