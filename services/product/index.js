import axios from "axios";

const { buildFormData } = useHelper();

export const getProducts = async (params = {}) => {
    try {
        let {data} = await axios.get(`v1/products`,{params});
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
};

export const getProduct = async (id,params = {}) => {
    try {
        let {data} = await axios.get(`v1/products/${id}`,{params});
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
};


export const getReviews = async (id,params = {}) => {
    try {
        let {data} = await axios.get(`v1/products/${id}/reviews`,{params});
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
};