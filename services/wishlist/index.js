import axios from "axios";

export const getWishlists = async (params)=> {
    try {
        let {data} = await axios.get('v1/wishlist',{params});
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
};

export const updateWishlist = async (params = {})=> {
    try {
        let {data} = await axios.post('/v1/wishlist',params);
        return data;
    } catch (error) {
        console.log(error);
        throw error.response;
    }
    // axios.post
};

