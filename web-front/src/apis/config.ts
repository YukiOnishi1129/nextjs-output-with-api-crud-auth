import axios, { AxiosError } from 'axios';

const BASE_API_URL = process.env.BASE_API_URL || 'http://localhost';

export interface IErrorResponse {
  code: string;
  config: any;
  message: string;
  request: any;
  response: {
    config: any;
    data: {
      error: string;
      message: string;
      statusCode: string;
    };
    headers: any;
    request: any;
    status: number;
    statusText: string;
  };
}

export const globalAxios = axios.create({
  baseURL: `${BASE_API_URL}/api`,
  timeout: 1000,
  headers: {
    'Content-type': 'application/json',
  },
});

export const isAxiosError = (error: any): error is AxiosError => !!error.isAxiosError;
