const axios = require('axios');

const url = 'http://localhost:3000/api/event';

export default {
  postEvent(data, token) {
    return axios.post(`${url}/`, data, { headers: { Authorization: 'Bearer ' + token } });
  },
  deleteEvent(id) {
    return axios.delete(`${url}/${id}`);
  },
  getEvents() {
    return axios.get(`${url}/`);
  },
  getEvent(id) {
    return axios.get(`${url}/${id}`);
  }
}