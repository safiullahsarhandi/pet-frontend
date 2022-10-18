export const getRates = async (params = {})=> {
    try {
        let {data} = await axios.get('/commission',{params});
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
};

export const updateRateStatus = async (id,status)=> {
    try {
        let {data} = await axios.post(`/plans/${id}/${status}`);
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
};