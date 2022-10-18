import axios from "axios";
const { buildFormData } = useHelper();

export const create = async (url,params) => {
    try {
        const fd = new FormData();
        buildFormData(fd,params);
        let {data} = await axios.post(url,fd);
        return data;
    } catch (error) {
        console.log(error);
        throw error.response;
    }
};


export const contactUs = async (params = {}) => {
    try {
        const fd = new FormData();
        buildFormData(fd,params);
        let {data} = await axios.post('v1/general/contact-us',fd);
        return data;
    } catch (error) {
        console.log(error);
        throw error.response;
    }
};


export const getGeneralData = async (params = {}) => {
    try {
        let {data} = await axios.get('/v1/general/others',{params});
        return data;
    } catch (error) {
        console.log(error);
        throw error.response;
    }
};
