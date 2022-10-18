export const getVendors = async (params = {}) => {
    try {
        let {data} = await axios.get('/vendor',{params});
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
};


export const getProducts = async (id,params = {}) => {
    try {
        let {data} = await axios.get(`/vendor/products/${id}`,{params});
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
};

export const getProduct = async (id) => {
    try {
        let {data} = await axios.get(`vendor/products-details/${id}`);
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
};


export const getReviews = async (id) => {
    try {
        let {data} = await axios.get(`vendor/products/${id}/reviews`);
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
};


export const getOrders = async (id,params = {}) => {
    try {
        let {data} = await axios.get(`/vendor/orders/${id}`,{params});
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
};



export const getVendor = async (id)=> {
    try {
        let {data} = await axios.get(`/vendor/${id}`);
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
};




export const updateVendorStatus = async (id,status)=> {
    try {
        let {data} = await axios.post(`/vendor/${id}/${status}`);
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
};