import axios from "axios";

export const baseURL='https://upskilling-egypt.com:3006/api/v1';
export const imgURL='https://upskilling-egypt.com:3006';
// create axios instance
// axios.create('baseurl').post('endpoint')===>axiosinstance

export const axiosPublicInstance = axios.create({
    baseURL
  
})
// any requeset will have that headers
export const axiosPrivateInstance=axios.create({
    baseURL,
    headers:{
        Authorization:localStorage.getItem('token')
    }
})
