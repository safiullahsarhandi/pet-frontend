import axios from "axios";
const { buildFormData } = useHelper();

export const verifyEmail = async (params)=> {
    try {
        let fd = new FormData();
        buildFormData(fd,params);
        let {data} = await axios.post('v1/password-recovery/verify-email',fd);
        return data;
    } catch (error) {
        console.log(error);
        if(error.response){
            throw error;
        }
    }
};


export const verifyCode = async (params)=> {
    try {
        let fd = new FormData();
        buildFormData(fd,params);
        let {data} = await axios.post('v1/password-recovery/verify-code',fd);
        return data;
    } catch (error) {
        console.log(error);
        if(error.response){
            throw error;
        }
    }
};


export const updatePassword = async (params)=> {
    try {
        let fd = new FormData();
        buildFormData(fd,params);
        let {data} = await axios.post('v1/password-recovery/update-password',fd);
        return data;
    } catch (error) {
        console.log(error);
        if(error.response){
            throw error;
        }
    }
};