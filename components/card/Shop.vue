<template>
  <div class="featureBox shadow">
    <div class="feature-image">
      <figure class="adjust-image">
        <img
          :src="image"
          :alt="name"
          class="mw-100"
          draggable="false"
        />
      </figure>
    </div>
    <div class="feature-content px-3">
      <div class="shop-discription">
        <h4 class="f-18">{{name}}</h4>
        <div class="rating">
            <star-rating v-model="rating" starSize="16" :disableClick="true" starColor="#FFBB00" :showControl="false">
            </star-rating>
            {{rating}} ({{showTotalRating()}})
        </div>
        <p class="text-secondary mb-1">{{distance}} miles away</p>
        <p v-if="deliveryFee" class="text-theme-primary mb-0">${{deliveryFee}} Delivery Fee</p>
        <p v-if="price" class="text-theme-primary mb-0">${{price}}</p>
      </div>
    </div>
    <nuxt-link :to="route" class="link-box"></nuxt-link>
  </div>
</template>

<script setup>
import StarRating from "vue3-star-ratings";
const props = defineProps({
    image : {
        type : String,
        default : null,
    },
    name : {
        type : String,
        default : null,
    },
    distance : {
        type : String,
        default : null,
    },
    price : {
        type : String,
        default : null,
    },
    deliveryFee : {
        type : [String,Number],
        default : null,
    },
    rating : {
        type : Number,
        default : 0,
    },
    totalRatings : {
        type : Number,
        default : 0,
    },
    route : {
        type : Object,
        default : ()=> ({}),
    }
});

const showTotalRating = ()=> {
    return (props.totalRatings <= 100)?props.totalRatings:'100+';
};
</script>

<style>
</style>