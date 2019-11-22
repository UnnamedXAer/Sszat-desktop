import axios from 'axios';

const localInstance = axios.create({
    baseURL: "http://localhost:3330/v1/",
    // timeout: 30000,
    responseType: 'json' // default
});


export default localInstance;