import axios from "axios";
const {buildFormData} = useHelper();
export const getPets = async (params = {})=> {
    try {
        let {data} = await axios.get('v1/pets',{params}); 
        return data;
    } catch (error) {
        throw error;
    }
};

export const getPet = async (id,params = {})=> {
    try {
        let {data} = await axios.get(`v1/pets/${id}`,{ params }); 
        return data;
    } catch (error) {
        throw error;
    }
};



export const purchasePet = async (id,params = {})=> {
    try {
        let {data} = await axios.post(`/v1/pets/${id}/purchase`,params);
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
};


export const donate = async (params = {})=> {
        let fd = new FormData();
        buildFormData(fd,params);
        let {data} = await axios.post(`/v1/pets`,fd);
        return data;  
};