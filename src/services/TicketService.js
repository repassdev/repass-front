const axios = require('axios');

const url = 'http://localhost:3000/api/ticket';

export default {
  postTicket(data, token) {
    return axios.post(`${url}/`, data, { headers: { Authorization: 'Bearer ' + token } });
  },
  deleteTicket(id, token) {
    return axios.delete(`${url}/${id}`, { headers: { Authorization: 'Bearer ' + token } });
  },
  getUserTickets(token) {
    return axios.get(`${url}/user`, { headers: { Authorization: 'Bearer ' + token } });
  },
  getTickets() {
    return axios.get(`${url}/`);
  },
  getTicket(id) {
    return axios.get(`${url}/${id}`);
  }
}