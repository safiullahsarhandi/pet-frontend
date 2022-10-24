export default function useApi(service,config = {}){
    const data = ref({
        data : [],
    });
    const options = {
        fetchImmediate : true,
        ...config,
    };

    const fetch = async (page = 1)=> {
        try {
            let {detail} =  await service(page);
            data.value = detail;          
        } catch (error) {
            throw error;    
        }
    };

    onBeforeMount(()=> {
        if(options.fetchImmediate){
            fetch();
        }
    });

    return {
        fetch,
        data,
    }
}