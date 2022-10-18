export const getReports = async (params = {}) => {
    try {
        let {data} = await axios.get('/query-report',{params});
        return data;
    } catch (error) {
        console.log(error);
        throw error.response;
    }
};


export const getReport = async (id) => {
    try {
        let {data} = await axios.get(`/query-report/${id}`);
        return data;
    } catch (error) {
        console.log(error);
        throw error.response;
    }
};


export const updateReportStatus = async (id,report_id)=> {
    try {
        let {data} = await axios.post(`/query-report/${id}/${report_id}`);
        return data;
    } catch (error) {
        console.log(error);
        throw error?.response?.data;             
    }
};
