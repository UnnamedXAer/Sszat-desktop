import axios from 'axios';

console.log("process.env.FIREBASE_URL", process.env.FIREBASE_URL);
const firebaseInstance = axios.create({
    baseURL: process.env.FIREBASE_URL,
    timeout: 3000,
    responseType: 'json', // default
    
})

export default  firebaseInstance;