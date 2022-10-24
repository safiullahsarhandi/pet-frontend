<template>
  <section class="product-detail py-5">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="listing-title text-center">
            <h1 class="font-weight-bold">Product Details</h1>
          </div>
        </div>
      </div>
      <div class="row py-5">
        <div class="col-md-6">
          <product-slider :images="product?.files"/>
        </div>
        <div class="col-md-6">
          <div class="product-desc">
            <div class="shop-content">
              <h3 class="f-22">{{product?.name}}</h3>
              <div class="d-flex align-items-center">
                <star-rating :key="rating" v-model="rating" starSize="16" :disableClick="true" starColor="#FFBB00" :showControl="false"></star-rating><span class="text-secondary">{{rating}} ({{showTotalRating()}})</span>
              </div>
              <div class="description-box flex-grow-1">
                <div class="category-name mb-2">
                  <p class="mb-0">{{product?.category?.name}} Category</p>
                </div>
                <div class="price-box mb-2">
                  <h4 class="text-theme-primary mb-0">
                    <span class="currencySymbol">$</span>{{product?.price}}
                  </h4>
                </div>
                <div
                  class="
                    quantity-selector
                    py-3
                    d-flex
                    align-items-center
                    gap-15
                  "
                >
                  <label class="mb-0">Quantity:</label>
                  <Incrementor v-model="quantity"></Incrementor>
                </div>
              </div>
              <div class="product-short-desc">
                <h5>Description</h5>
                <p>
                    {{product?.description}}
                </p>
              </div>
              <div class="add-to-cart mt-4">
                <button
                @click="updateCartItem"
                  class="secondary-theme-button shadow btn bg-brown py-2"                                    
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import StarRating from "vue3-star-ratings";
const {updateCart,cartItems,flushCart} = useCart();
const {pluck,notification} = useHelper();
const {confirmPopup} = usePopup(); 
const props = defineProps({
    product : {
        type : Object, 
        default : ()=> ({}),
    }
});
const quantity =  ref(1);
const rating = computed(()=>props.product?.rating); 
const showTotalRating = ()=> {
    return (props.product.ratings_count <= 100)?props.product.ratings_count:'100+';
};

const updateCartItem = ()=> {

    if(quantity.value == 0){
        notification('quantity should be atleast 1','error'); 
        return;
    }
    let data  = pluck(props.product,['id','name','files.0.file_url','price','vendor_id']);
    let item = (cartItems.value.length > 0)? cartItems.value[0]:null;
    // if item exist then check where the vendor is same of old product other wise ask 
    // user to confirm cart flush 
    if(item && item?.product?.vendor_id != data?.vendor_id)
    {
        confirmPopup({
            title : 'Confirmation',
            message : 'adding this item in cart might remove previous selections. currently we offer single shop purchasing',
            onConfirm : ()=> {
                flushCart();
                updateCart(quantity.value,{
                    product_id : data.id,
                    product : {
                        ...data,
                        file : { file_url : data.file_url },
                    }
                });
                notification('cart updated');
            },
            cancelBtnText : 'Cancel',
            confirmBtnText : 'Continue Shopping',

        });
        
    }else{
        
        updateCart(quantity.value,{
            product_id : data.id,
            product : {
                ...data,
                file : { file_url : data.file_url },
            }
        });
        notification('cart updated');
    }
};
</script>