import axios from "axios";

export const getAds = async (params = {},prefix = '')=> {
    try {
        let {data} = await axios.get(`v1${prefix}/ads`,{params}); 
        return data;
    } catch (error) {
        throw error;
    }
};

export const getAd = async (id,type)=> {
    try {
        let {data} = await axios.get(`v1/ads/${id}`,{params : {type}}); 
        return data;
    } catch (error) {
        throw error;
    }
};



export const updateAdStatus = async (id,status)=> {
    try {
        let {data} = await axios.post(`v1/ads/${id}/${status}`);
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
};