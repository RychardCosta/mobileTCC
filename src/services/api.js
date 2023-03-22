import axios from 'axios';

const api = axios.create({
    baseURL: "http://10.183.130.45:3000"
});


export default api;