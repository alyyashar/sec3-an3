// import packages
import axios from 'axios';

// import lib
import config from "@/config"
import { deleteCookie } from 'cookies-next';
var axiosApi = axios.create({
    // baseURL: API_URL,
    baseURL: config.API_URL,
  })
  
axiosApi.interceptors.response.use(function (response) {
    const statusCode = response.data.statusCode;
    // check unauthorized or expired
    if(statusCode === 1008 || statusCode === 1009){
      deleteCookie("auth-token");
      document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location = "/"
      return response;
    }
    else{
      return response;
    }
  }, function (error) {
    return Promise.reject(error);
  });
export default axios;