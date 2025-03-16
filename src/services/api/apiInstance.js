import axios from "axios";

export const baseURL='https://upskilling-egypt.com:3006/api/v1';
export const imgURL='https://upskilling-egypt.com:3006';
// create axios instance
// axios.create('baseurl').post('endpoint')===>axiosinstance

export const axiosPublicInstance = axios.create({
    baseURL
  
})
// any requeset will have that headers
// The word "Bearer" is a keyword in authentication schemes.
// It tells the server that the token is a Bearer Token (used for authorization).
// Bearer ${token} is necessary because it follows authentication standards.

export const axiosPrivateInstance=axios.create({
    baseURL,
    headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`  
    }
})
