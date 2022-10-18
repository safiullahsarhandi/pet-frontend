import axios from 'axios';
import { useHelper } from '~~/composables/useHelper';
axios.defaults.baseURL = `http://localhost/dale-pet/api`;

export default defineNuxtPlugin((nuxtApp) => {
    const {getAccessToken,removeAccessToken} = useHelper();
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
