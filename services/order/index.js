import axios from "axios";
const {buildFormData} = useHelper();
export const getOrders = async (params)=> {
        try {
            let {data} = await axios.get('v1/orders',{params});
            return data;
        } catch (error) {
            console.log(error);
            throw error?.response?.data;             
        }
};

export const getOrder = async (id,params = {})=> {
    try {
        let {data} = await axios.get(`v1/orders/${id}`,{params});
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
};

export const createOrder = async (params)=> {
    try {
        let fd = new FormData();
        buildFormData(fd,params);
        let {data} = await axios.post(`v1/orders`,fd);
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
};


export const updateOrderStatus = async (id,status)=> {
    try {
        let {data} = await axios.post(`v1/orders/${id}/${status}`);
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
};

