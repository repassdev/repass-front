const axios = require('axios');

const url = 'http://localhost:3000/api/ticket';

export default {
  postTicket(data, token) {
    return axios.post(`${url}/`, data, { headers: { Authorization: 'Bearer ' + token } });
  },
  deleteTicket(id) {
    return axios.delete(`${url}/${id}`);
  },
  getTickets() {
    return axios.get(`${url}/`);
  },
  getTicket(id) {
    return axios.get(`${url}/${id}`);
  }
}