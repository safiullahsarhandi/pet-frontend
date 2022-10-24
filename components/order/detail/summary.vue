<template>
  <div class="cart-total">
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
              <p class="mb-0">${{(getTotal())}}</p>
            </div>
          </div>
          <div
            class="d-flex justify-content-between flex-md-mowrap flex-wrap mb-4"
          >
            <div class="leftContent">
              <p class="mb-0">Delivery Charges</p>
            </div>
            <div class="rightCartContent">
              <p class="mb-0">${{delivery?.rate}}</p>
            </div>
          </div>
          <div
            class="d-flex justify-content-between flex-md-mowrap flex-wrap mb-4"
          >
            <div class="leftContent">
              <p class="mb-0">Service Charges</p>
            </div>
            <div class="rightCartContent">
              <p class="mb-0">${{computedCommission}}</p>
            </div>
          </div>
          <div
            class="d-flex justify-content-between flex-md-mowrap flex-wrap mb-4"
          >
            <div class="leftContent">
              <p class="mb-0 font-weight-bold">Total:</p>
            </div>
            <div class="rightCartContent">
              <p class="mb-0 theme-primary-text font-weight-bold">${{getTotal(delivery?.rate,computedCommission)}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <slot name="report-link"></slot>
</template>
<script setup>

const props = defineProps({
    products : {
        type : Array,
        default : ()=> ([]),
    },
    commission : {
        type : Object,
        default : ()=> ({}),
    },
    delivery : {
        type : Object,
        default : ()=> ({}),
    }
});

const computedCommission = computed((total = 0,item) => {
    return (getTotal() * (parseFloat(props.commission?.rate) / 100)).toFixed(2);
    
});

const getTotal = (deliveryFee = 0,commissionCharges = 0)=> {
    let items = JSON.parse(JSON.stringify(props.products));
    let total = items.reduce((total,element) => {
         return total += (element?.price *  element?.qty);
    },0);
    return parseInt(total) + parseInt(commissionCharges) + parseInt(deliveryFee);
};
</script>