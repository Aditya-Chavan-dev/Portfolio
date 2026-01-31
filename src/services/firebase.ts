import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyATIPOB2k1F6vaIYDmtiulXClf5urAerT4",
    authDomain: "portfolio0110.firebaseapp.com",
    databaseURL: "https://portfolio0110-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "portfolio0110",
    storageBucket: "portfolio0110.firebasestorage.app",
    messagingSenderId: "702923227704",
    appId: "1:702923227704:web:1e027a7bb3cf50362bdccd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
