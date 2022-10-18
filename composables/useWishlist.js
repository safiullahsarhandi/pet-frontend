import { updateWishlist } from "~~/services/wishlist";
const {notification} = useHelper();
export default function useWishlist(data,keyName = null,removable = false){
    // this function will return data which is nested and handle such situation where 
    // json structure is something like array.*.object
    const parseData = (data,structure,index = null)=> {
        if(structure.includes('*')){
            let splittedStructure = structure.split('.');
            
            splittedStructure.forEach(element => {
                if(element == '*')
                    element = index;
                data = data[element];
            });
        }

        return data;
    }; 

    const updateData = (data,mutatableData,structure,index)=> {
        
        let updatedData;
        let prev = null;
        let isObject = data.value instanceof Object;
        if(structure.includes('*')){
            if(data instanceof Object){
                updatedData = {};    
            }else{
                updatedData = [];
            }
            
            let splittedStructure = structure.split('.');
            
            let lastKey = splittedStructure.length - 1;
            splittedStructure.forEach((element,key) => {
                if(element == '*')
                    element = index;
                    
                    if(lastKey == key) {
                        // if not removable simply update the object
                    if(!removable) {
                        updatedData[element] = mutatableData;
                    }else{
                        // always access prev in order to get parent of array
                        prev.splice(index,1);
                        updatedData[element] = prev;
                    }
                }else {
                    if(!prev){
                        prev = JSON.parse(JSON.stringify(data.value[element]));
                        
                    }else{
                        prev = updatedData[element];
                    }
                    updatedData[element] = prev;
                }
                
            });
        }
        if(isObject){
            data.value = {...data,...updatedData};
        }else{
            data.value = [...data,...updatedData];
        }
        return data;  
    };
    const isMultiple = (structure)=> {
        return structure.includes('*');
    }
    const toggleWishlist = async (productId,index = null)=> {
            try {            
                let {message} = await updateWishlist({wishable_id : productId,type : 'ad'});
                if(index == null){
                    if(keyName) data.value[keyName].is_wishlist = !data.value[keyName].is_wishlist;
                    else  data.value.is_wishlist = !data.value.is_wishlist;
                }else{
                    let productData = data.value;
                    if(keyName && isMultiple(keyName)){
                        let mutatableData = parseData(productData,keyName,index);
                        mutatableData.is_wishlist = !mutatableData.is_wishlist;
                        updateData(data,mutatableData,keyName,index);
                        
                    }else{
                        data.value[keyName][index].is_wishlist = !productData[index].is_wishlist;
                    }
                }
                // console.log(data.value);
                notification(message);
            } catch (error) {
                console.log(error);
                notification(error.message);
            }
    };    
    return {
        toggleWishlist,
    };
}