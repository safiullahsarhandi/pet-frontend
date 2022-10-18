import axios from "axios";
import { useHelper } from "~~/composables/useHelper";
const { buildFormData } = useHelper();

export const login = async (params)=> {
    try {
        let fd = new FormData();
        buildFormData(fd,params);
        let {data} = await axios.post('v1/auth/login',fd);
        return data;
    } catch (error) {
        if(error?.response){
            let {message} = error.response.data;            
            throw new Error(message);
        }
    }
};

export const register = async (params)=> {
    try {
        let fd = new FormData();
        buildFormData(fd,params);
        let {data} = await axios.post('v1/auth/register',fd);
        return data;
    } catch (error) {
        if(error?.response){
            let {message,errors} = error.response.data;            
            throw {errors,message};
        }
    }
};

export const logout = async ()=> {
    
    try {
        let {data} = await axios.post('v1/auth/logout');
        return data;
    } catch (error) {
        console.log(error);
        if(error?.response){
            let {message} = error.response.data;            
            throw new Error(message);
        } 
    }
};