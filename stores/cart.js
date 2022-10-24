import { defineStore } from "pinia"
import { addCartItem, flushCart, getCart, removeCartItem } from "~~/services/cart";
export const useCartStore = defineStore('cart',()=> {
    const {updateCartStorage} = useCart();
   const state = ref([]);
   
   const set = (items)=> {
        state.value = items;
    };

    const updateItem = async (params)=> {
        try {
            let {message} = await addCartItem(params);
            return message;
        } catch (error) {
            console.log(error);
        }
    };
    const removeItem = async (productId)=> {
        let data = await removeCartItem(productId);
        return data;
    };

    const flush = async ()=> {
        try {
            
            let {message} = await flushCart();
            return message;
        } catch (error) {
            console.log(error);
        }
    };
    const get = async ()=> {
        let {detail} =  await getCart();
        updateCartStorage(detail);
        set(detail);
    };
   return {
    state,
    get,
    set,
    updateItem,
    removeItem,
    flush,
   };
}); 