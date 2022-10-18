import axios from "axios";

export const createOffer = async (params)=> {
    try {
        let {data} = await axios.post('v1/adopts',params);
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
};
export const getOffers = async (params)=> {
    try {
        let {data} = await axios.get('v1/adopts',{params});
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
};

export const getOffer = async (id,params = {})=> {
    try {
        let {data} = await axios.get(`v1/adopts/${id}`,{params});
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
};



export const updateOfferStatus = async (id,status)=> {
    
    let {data} = await axios.post(`/v1/adopts/${id}/${status}`);
    return data;
};
