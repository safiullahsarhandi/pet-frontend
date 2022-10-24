import axios from "axios";

export const getCart = async (params)=> {
    let {data} = await axios.get('/v1/cart');
    return data;
};


export const addCartItem = async (params)=> {
    let {data} = await axios.post('/v1/cart',params);
    return data;
};

export const removeCartItem = async (id)=> {
    let {data} = await axios.delete(`/v1/cart/${id}`);
    return data;
};

export const flushCart = async ()=> {
    let {data} = await axios.delete(`/v1/cart/flush/all`);
    return data;
};