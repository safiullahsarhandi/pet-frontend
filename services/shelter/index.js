import axios from "axios";

export const getShelters = async (params = {})=> {
    try {
        let {data} = await axios.get('/v1/shelters',{params});
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
}

export const getShelter = async (id)=> {
    try {
        let {data} = await axios.get(`v1/shelters/${id}`);
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
};