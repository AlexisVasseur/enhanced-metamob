import axios from "axios";

const BASE_URL = '/api';
const API_KEY = "03420c-ba4a3d-3fd214-19c562-41ae9e"
const EDIT_KEY = "5a3443-b6c062-bb22f7-19a24d-e957d7"

// Client axios avec configuration de base
export const metamobClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'HTTP-X-APIKEY': API_KEY,
    'HTTP-X-USERKEY': EDIT_KEY,
  },
  // Configuration CORS
  withCredentials: false,
  timeout: 10000,
});
