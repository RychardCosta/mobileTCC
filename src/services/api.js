import axios from 'axios';

const api = axios.create({
    baseURL: "http://rychard.myvnc.com:8080"
});


export default api;