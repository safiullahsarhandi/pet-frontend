export default function useApi(service){
    const data = ref({
        data : [],
    });
    
    const fetch = async (page = 1)=> {
        try {
            let {detail} =  await service(page);
            data.value = detail;          
        } catch (error) {
            throw error;    
        }
    };


    return {
        fetch,
        data,
    }
}