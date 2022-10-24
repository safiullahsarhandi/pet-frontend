<template>
  <div class="cart-total shadow p-3 h-100">
    <div v-if="showProducts" class="titleBox">
        <h4 class="mb-4 h5">Product Details</h4>
    </div>
    <div v-if="showProducts" class="total-products">
        <div :key="index" v-for="item,index in cartItems" class="product-info mb-3 border-bottom pb-4">
            <div class="d-flex gap-15 flex-wrap flex-md-nowrap align-items-center">
                <div class="cart-image">
                    <figure class="mb-0">
                        <nuxt-link
                        :to="{
                            name: 'shops-id-products-productid',
                            params: {
                            id: item?.product?.vendor_id,
                            productid: item?.product_id,
                            },
                        }"
                        >
                            <img :src="item?.product?.file?.file_url" :alt="`${item?.product?.name} image`" draggable="false" class="mw-100">
                        </nuxt-link>
                    </figure>
                </div>
                <div class="product-title">
                    <p class="mb-0">Newest Couch</p>
                    <p class="price mb-0">${{item?.product?.price}} x {{item?.qty}}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="cartTotalBox">
      <div class="titleBox">
        <h4 class="mb-4 h5">Order Summary</h4>
        <div class="cartBox">
          <div
            class="d-flex justify-content-between flex-md-mowrap flex-wrap mb-4"
          >
            <div class="leftContent">
              <p class="mb-0">Subtotal</p>
            </div>
            <div class="rightCartContent">
              <p class="mb-0">${{getTotal()}}</p>
            </div>
          </div>
          <div
            class="d-flex justify-content-between flex-md-mowrap flex-wrap mb-4"
          >
            <div class="leftContent">
              <p class="mb-0">Delivery Charges</p>
            </div>
            <div class="rightCartContent">
              <p class="mb-0">${{data?.delivery_rate?.rate}}</p>
            </div>
          </div>
          <div
            class="d-flex justify-content-between flex-md-mowrap flex-wrap mb-4"
          >
            <div class="leftContent">
              <p class="mb-0">Service Charges</p>
            </div>
            <div class="rightCartContent">
              <p class="mb-0">${{commission}}</p>
            </div>
          </div>
          <div
            class="d-flex justify-content-between flex-md-mowrap flex-wrap mb-4"
          >
            <div class="leftContent">
              <p class="mb-0 font-weight-bold">Total:</p>
            </div>
            <div class="rightCartContent">
              <p class="mb-0 theme-primary-text font-weight-bold">${{getTotal(data?.delivery_rate?.rate,commission)}}</p>
            </div>
          </div>
        </div>
        <div class="text-center my-2">
          <nuxt-link
           v-if="showCheckoutBtn"
            class="bg-brown d-block rounded-pill border-0 py-2 text-white mb-3"
            :to="{name : 'checkout'}"
            >Proceed to Checkout</nuxt-link>
          <nuxt-link
          v-if="showShoppingBtn"
            class="bg-theme-outline d-block rounded-pill border-0 py-2"
            :to="{name : 'shops'}"
            >Continue Shopping</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { getGeneralData } from "~~/services/general";

const props = defineProps({
    showShoppingBtn : {
        type : Boolean,
        default : true,
    },
    showCheckoutBtn : {
        type : Boolean,
        default : true,
    },
    showProducts : {
        type : Boolean,
        default : false,
    }
});
const {data}  = useApi(()=> getGeneralData());
const {cartItems} = useCart();

const commission = computed((total = 0,item) => {
    return (getTotal() * (parseFloat(data.value?.vendor_commission?.rate) / 100)).toFixed(2);
    
});

const getTotal = (deliveryFee = 0,commissionCharges = 0)=> {
    let items = JSON.parse(JSON.stringify(cartItems.value));
    let total = 0;
    items.forEach(element => {
         total += (element?.product?.price *  element?.qty);
    });

    return parseInt(total) + parseInt(commissionCharges) + parseInt(deliveryFee);
};
</script>