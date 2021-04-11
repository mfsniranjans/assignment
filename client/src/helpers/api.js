import axios from "axios";
import { REACT_APP_SERVER_URI } from "../config/constants";

export const api = axios.create({
  baseURL: REACT_APP_SERVER_URI,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})
