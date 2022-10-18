import axios from "axios";
const { buildFormData } = useHelper();

export const getCategories = async (params = {})=> {
    try {
        let {data} = await axios.get('v1/general/categories',{params});
        return data;
    } catch (error) {
        console.log(error);
        throw error.response;
    }
};