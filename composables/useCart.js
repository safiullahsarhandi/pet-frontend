import { useCartStore } from '~~/stores/cart';

function useCart() {
    const { asset, getImage } = useHelper();
    let store = useCartStore();
    const cartItems = computed(()=> store.state);
    const updateStorage = (data = [])=> {
        store.set(data);
        localStorage.setItem('cart',JSON.stringify(data));
    };
    onBeforeMount(()=> {
        
        let cartData = localStorage.getItem('cart');
        
        if(cartItems.value.length == 0 && cartData){
            cartData = JSON.parse(cartData);
            store.set(cartData);
        }
    });
    
    const deleteCartItem = async (index) => {
        try {
            let item = cartItems.value[index];
            let data = await store.removeItem(item.id);
            let items = [...cartItems.value];    
            items.splice(index,1);
            updateStorage(items);
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
                        
    };
    
    // this will update overall cart on behalf of value
    const updateCart = (value,productData,increaseQtyIfExists = false)=> {
        // find the index in cart in order to check whether its already in cart or not.
        let cartIndex = cartItems.value.findIndex((item)=> item.product_id == productData.product_id);
        
        let newCartData = [...cartItems.value];
        // if new quantity is zero and item is in cart then remove it
        
        if(value == 0 && cartIndex >= 0){
            newCartData.splice(cartIndex,1);
            store.removeItem(cartItem.product_id);
            updateStorage(newCartData);
            return;
        }
        
        // if item is already in cart then update cart item value
        if(cartIndex >= 0){
            let cartItem = {...newCartData[cartIndex]};
            // if increaseQtyIfExists = false then override previous stored quantity
            // otherwise increase the quantity 
            if(!increaseQtyIfExists)
                cartItem.qty = value;
            else
                cartItem.qty += value;
            
            // update cart item 
            newCartData[cartIndex] = cartItem;
            // update storage
            updateStorage(newCartData);
            // update cart item in db using store
            // if dont want to hit api simply remove it
            store.updateItem({product_id : cartItem.product_id , qty : cartItem.qty });
            return;
        }
        // if not in cart items list!
        let cartItem = {
            ...productData,
            qty : value,
            
        };
        // update cart item in db using store
        store.updateItem({product_id : cartItem.product_id , qty : cartItem.qty });
        // update local cart variable
        newCartData.push(cartItem);
        // update storage
        updateStorage(newCartData);
            
    };
    
    const flushCart = ()=> {
        store.flush();
        updateStorage();
    };

    const getVariation = (attributes,defaultPrice = 0)=> {
        let variation = (attributes.length > 0) 
        ?
          (attributes[0]?.value?.price || 0)
        : defaultPrice;
        // console.log(variation,attributes);
        return parseInt(variation || defaultPrice);
    };
  return {
    deleteCartItem,
    updateCart,
    cartItems,
    flushCart,
    getVariation,
    updateCartStorage : updateStorage,
  };
}

export default useCart