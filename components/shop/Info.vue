<template>
  <div class="row justify-content-between">
    <div class="col-md-4">
      <div class="shop-title px-3">
        <div class="shop-content">
          <h3 class="f-22">{{data?.business_name}}</h3>
          <div class="rating text-yellow mb-2">
            <star-rating v-model="data.rating" starSize="16" :disableClick="true" starColor="#FFBB00" :showControl="false">
            </star-rating>            
            <span class="text-secondary">{{data?.rating}} ({{showTotalRating()}})</span>
          </div>
          <div class="d-flex gap-15">
            <div class="icon-box flex-shrink-0">
              <img src="/assets/images/pin.png" alt="Pin" draggable="false" />
            </div>
            <div class="description-box flex-grow-1">
              <p class="mb-1">{{data?.address}}</p>
              <p class="mb-1">{{(data?.distance >= 0)? `${data?.distance} miles away`: ''}} </p>
              <p class="text-theme-primary mb-0 font-weight-bold">
                ${{deliveryFee}} Delivery Fee
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-5">
        <slot name="filter"></slot>
    </div>
  </div>
</template>
<script setup>
import StarRating from "vue3-star-ratings";
import { getGeneralData } from "~~/services/general";
const props = defineProps({
  data : {
    type : Object,
    default : ()=> ({}),
  }
});
const {data : generalData} = useApi((page = 1)=> getGeneralData()); 

const deliveryFee = computed(()=> generalData.value?.delivery_rate?.rate);
const showTotalRating = ()=> {
    return (props.data?.ratings_count <= 100)?props.data?.ratings_count:'100+';
};
</script>