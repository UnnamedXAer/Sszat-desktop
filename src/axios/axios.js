import axios from 'axios';

const firebaseInstance = axios.create({
    baseURL: process.env.REACT_APP_FIREBASE_URL,
    timeout: 3000,
    responseType: 'json' // default
});


export default firebaseInstance;