import axios from 'axios';

const HTTPRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

const HTTPHostRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HOST_URL,
});

export { HTTPHostRequest, HTTPRequest as default };
