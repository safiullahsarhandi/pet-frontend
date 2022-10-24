import { ref, watch } from "vue";
import { useLocationStore } from "~~/stores/location";

export default function useTableFilter(method){

    const store = useLocationStore();
    
    const filterValues = ref({
        per_page : 10,
        order : {
            key : 'id',
            value : 'desc',
        },
        location : {
            ...store.location,
        },
    });
    
    watch(filterValues,()=>{
        method();
    });

    const setFilter = (values,newMethod = null)=> {
        
        if(newMethod) method = newMethod;
        filterValues.value = {...filterValues.value,...values};
    }

    return {
        setFilter,
        filterValues,
    }
}