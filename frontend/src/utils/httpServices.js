import Axios from "axios";

const httpService = Axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

httpService.interceptors.request.use((request) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

const responseHandler = (respone) => {
  return respone;
};

const errorHandler = (error) => {
  return Promise.reject(error);
};

httpService.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export const getQuery = async ({ queryKey }) => {
  const response = await httpService.get(queryKey[0], { params: queryKey[1] });
  return response.data;
};

export default httpService;

export const Endpoints = {
  auth: "/auth/login/",
  refrsh: "/auth/refresh-token/",
  statusReport: "/status-report/chamber-latest-status/",
};
