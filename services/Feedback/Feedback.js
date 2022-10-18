export const getFeedbacks = async (params = {}) => {
    try {
        let {data} = await axios.get('/feedback',{params});
        return data;
    } catch (error) {
        console.log(error);
        throw error.response;
    }
};


export const getFeedback = async (id) => {
    try {
        let {data} = await axios.get(`/feedback/${id}`);
        return data;
    } catch (error) {
        console.log(error);
        throw error.response;
    }
};