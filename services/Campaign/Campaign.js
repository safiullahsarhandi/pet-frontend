
export const updateCampaignStatus = async (id,status)=> {
    
    try {
        let {data} = await axios.post(`campaigns/${id}/${status}`);
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
};