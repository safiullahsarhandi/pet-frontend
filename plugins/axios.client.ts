import axios from 'axios';
import { useHelper } from '~~/composables/useHelper';
export default defineNuxtPlugin((nuxtApp) => {
    
let {api_url} = nuxtApp.$config.public;
const {getAccessToken,removeAccessToken} = useHelper();
axios.defaults.baseURL = api_url;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
if(getAccessToken())
    axios.defaults.headers.common['Authorization'] = `Bearer ${getAccessToken()}`;
    
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// Adds a response interceptor
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
	if(error.response.status == 401){
        // removeAccessToken();
	}
    return Promise.reject(error);
  });

})
