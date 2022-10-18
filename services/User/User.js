import axios from "axios";

export const getUsers = async (params)=> {
        try {
            let {data} = await axios.get('/users',{params});
            return data;
        } catch (error) {
            console.log(error);
            throw error?.response?.data;             
        }
};

export const getUser = async (id)=> {
    try {
        let {data} = await axios.get(`/users/${id}`);
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
};


export const updateUserStatus = async (id,status)=> {
    try {
        let {data} = await axios.post(`/users/${id}/${status}`);
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
};

