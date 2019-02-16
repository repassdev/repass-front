const axios = require('axios');

const url = 'http://localhost:3000/api/user';

export default {
  signup(data) {
    return axios.post(`${url}/signup`, data);
  },
  login(data) {
    return axios.post(`${url}/login`, data);
  },
  get(token) {
    return axios.get(`${url}/`, { headers: { Authorization: 'Bearer ' + token } });
  }
}