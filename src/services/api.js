import axios from 'axios';

const api = axios.create({
    baseURL: "http://rychard.myvnc.com"
});


export default api;