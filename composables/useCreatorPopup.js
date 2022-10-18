import {ref} from 'vue';
import * as yup from 'yup';
export default function useCreatorPopup(){
    
    const popupParams = ref({
        title : 'Create New Plan',
        apiUrl : null,
        active : false,
        data : {},
        schema : {},
        fields : [],
        counter : 0,
    });

    const showCreatorPopup = (url,title,data)=> {
        popupParams.value = {...popupParams.value,apiUrl : url,active : true,title,data};
        
        // console.log(popupParams.value);
    };
    
    const hideCreatorPopup = ()=>{
        popupParams.value.active = false
    };

    const setSchema = (value)=> {
            popupParams.value.schema = value;
    };

    const setFields = (value)=> {
        popupParams.value.fields = value;
};

    return {
        popupParams,
        hideCreatorPopup,
        showCreatorPopup,
        setSchema,
        setFields,
    }

}