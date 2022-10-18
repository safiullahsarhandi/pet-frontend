import axios from "axios";
const { buildFormData } = useHelper();

export const getAccount = async ()=> {
    try {
        let {data} = await axios.get('v1/account');
        return data;
    } catch (error) {
        throw error.response;
    }
};

export const updateAccount = async (params)=> {
    try {
        let fd = new FormData();
        buildFormData(fd,params);
        let {data} = await axios.post('v1/account',fd);
        return data;
    } catch (error) {
        throw error.response;
    }
};

export const changePassword = async (params)=> {
    try {
        let fd = new FormData();
        buildFormData(fd,params);
        let {data} = await axios.post('v1/account/change-password',fd);
        return data;
    } catch (error) {
        if(error.response){
            throw new Error(error.response.data.message);
        }
    }
};


export const getOffers = async (params)=> {
    try {
        let {data} = await axios.get('v1/account/offers',{params});
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
};