export const getPayments = async (params = {})=> {
    try {
        let {data} = await axios.get('/payments',{params});
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
};