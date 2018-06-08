import axios from 'axios';

export default (data) => axios.post('/record/create', data);