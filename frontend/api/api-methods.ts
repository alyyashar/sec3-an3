import config from "@/config"
import axios from "axios"
import { getCookie } from "cookies-next";

var axiosApi = axios.create({
  // baseURL: config.API_URL,
  baseURL: config.API_URL,
})

// Set ngrok-skip-browser-warning header for all requests
axiosApi.interceptors.request.use(function (config) {
  config.headers['ngrok-skip-browser-warning'] = 'true';
  return config;
}, function (error) {
  return Promise.reject(error);
});

axiosApi.interceptors.response.use(function (response) {
  const statusCode = response.data.statusCode;
  console.log("HELLO", statusCode);
  // check unauthorized or expired
  if(statusCode === 1008 || statusCode === 1009){
    document.cookie = "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/"
    return response.data;
  }
  else{
    return response.data;
  }
}, function (error) {
  return Promise.reject(error);
});


export async function apiWrapper(callback: any, url: any, data: any = {}, config: any = {}): Promise<any> {
    const accessToken = getCookie("auth-token");
    if (accessToken && accessToken.length) {
        return callback(url, data, config, "Bearer " + accessToken);
    } else {
        // Call the callback without token if not present
        return callback(url, data, config, undefined);
    }
}

export async function get(url: any, params: any = {}, config: any = {}, token: any): Promise<any> {
  axiosApi.defaults.headers.common["Authorization"] = await token;
  let p = Object.keys(params).map(key => key + '=' + params[key]).join('&');
  return axiosApi.get(url+"?"+p, { ...config });
}

export async function post(url: any, data: any = {}, config: any = {}, token: any): Promise<any> {
  axiosApi.defaults.headers.common["Authorization"] = await token;
  return axiosApi.post(url, { ...data }, { ...config });
}

export async function postForm(url: any, formData: any, config: any = {}, token: any): Promise<any> {
  axiosApi.defaults.headers.common["Authorization"] = await token;
  let configuration = { headers: { 'content-type': 'multipart/form-data' } }
  return axiosApi.post(url, formData, configuration);
}

export async function put(url: any, data: any, config: any = {}, token: any): Promise<any> {
  axiosApi.defaults.headers.common["Authorization"] = await token;
  return axiosApi.put(url, { ...data }, { ...config });
}

export async function putForm(url: any, formData: any, config: any = {}, token: any): Promise<any> {
  axiosApi.defaults.headers.common["Authorization"] = await token;
  let configuration = { headers: { 'content-type': 'multipart/form-data' } }
  return axiosApi.put(url, formData, configuration);
}

export async function del(url: any, data: any = {}, config: any = {}, token: any): Promise<any> {
  axiosApi.defaults.headers.common["Authorization"] = await token;
  return await axiosApi.delete(url, { data : { ...data } , ...config });
}
