import { defineStore } from "pinia";

export const useLocationStore = defineStore('location',()=> {
    let location = ref({});
    
    const set = (data)=>{
        location.value = data;
    };

    return {
        location,
        set
    }
});