import axios from 'axios';

// Environment variable for API URL (set in .env)
let API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Robustness: If the user forgot to add "/api" at the end of their Render URL, add it for them
if (API_URL && !API_URL.endsWith('/api') && !API_URL.endsWith('/api/')) {
    API_URL = `${API_URL.replace(/\/$/, '')}/api`;
}

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
