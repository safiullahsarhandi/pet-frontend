export const getPlans = async (params = {})=> {
    try {
        let {data} = await axios.get('/plans',{params});
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
};

export const updatePlanStatus = async (id,status)=> {
    try {
        let {data} = await axios.post(`/plans/${id}/${status}`);
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
};