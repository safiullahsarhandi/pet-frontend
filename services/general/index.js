import axios from "axios";
const { buildFormData } = useHelper();

export const create = async (url,params) => {
        const fd = new FormData();
        buildFormData(fd,params);
        let {data} = await axios.post(url,fd);
        return data;
    
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


export const getCountries = async () => {
    try {
        let { data } = await axios.get('v2/general/countries');
        return data;
    } catch (error) {
        console.log(error);
        throw error.response;
    }
};

export const getStates = async (params = {}) => {
    try {
        let { data } = await axios.get('v2/general/states',{params});
        return data;
    } catch (error) {
        console.log(error);
        throw error.response;
    }
};

export const getCities = async (params = {}) => {
    try {
        let { data } = await axios.get('v2/general/cities',{params});
        return data;
    } catch (error) {
        console.log(error);
        throw error.response;
    }
};

export const getLocations = async (params = {}) => {
    try {
        let { data } = await axios.get('v2/general/locations',{params});
        return data;
    } catch (error) {
        console.log(error);
        throw error.response;
    }
};