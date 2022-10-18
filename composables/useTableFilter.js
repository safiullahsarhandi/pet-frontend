import { ref, watch } from "vue";

export default function useTableFilter(method){
    
    const filterValues = ref({
        per_page : 10,
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