import axios from "axios";

export const getVendors = async (params = {}) => {
    try {
        let {data} = await axios.get('/v1/vendors',{params});
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
};

export const getVendor = async (id,params = {}) => {
    try {
        let {data} = await axios.get(`/v1/vendors/${id}`,{params});
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
};