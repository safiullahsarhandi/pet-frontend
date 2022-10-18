import { buildFormData } from "../../utils/helpers";

export const getProducts = async (params = {}) => {
    try {
        let {data} = await axios.get(`/products`,{params});
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
};

export const getProduct = async (id,params = {}) => {
    try {
        let {data} = await axios.get(`/products/${id}`,{params});
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
};


export const createProduct = async (params = {}) => {
    try {
        let fd = new FormData();
        buildFormData(fd,params);
        let {data} = await axios.post(`/products`,fd);
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
};

export const updateProduct = async (id,params = {}) => {
    try {
        let fd = new FormData();
        buildFormData(fd,params);
        let {data} = await axios.post(`/products/${id}`,fd);
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
};



export const updateProductStatus = async (id,status)=> {
    try {
        let {data} = await axios.post(`/products/status/${id}`);
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
};



export const getReviews = async (id,params = {}) => {
    try {
        let {data} = await axios.get(`/products/${id}/reviews`,{params});
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
};