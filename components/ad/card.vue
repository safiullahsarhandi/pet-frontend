<template>
  <div class="featureBox shadow">
    <div class="feature-image">
      <div class="additional-things align-items-center">
        <div v-if="showStatusBadge && !isFeatured" class="tag">
          <span class="bg-adopt">{{status}}</span>
        </div>
        <div v-if="isFeatured" class="featureRibbon">
            <span>Featured</span>
        </div>
        <div v-if="showWishlist" class="whislList">
          <button @click="emit('on-wishlist')" tabindex="-1">
            <i class="fa" :class="{'fa-heart' : (isWishlist),'fa-heart-o' : (!isWishlist)}"></i>
          </button>
        </div>
      </div>
      <figure class="adjust-image">
        <nuxt-link :to="route">

            <img
            :src="image"
            :alt="name"
            class="mw-100"
            draggable="false"
            />
        </nuxt-link>
      </figure>
    </div>
    <div class="feature-content px-3">
      <div class="feature-header d-flex align-items-center gap-15">
        <h4 v-if="name" class="f-18">{{name}}</h4>
        <img
            v-if="showGenderIcon"
          src="/assets/images/gender-female.png"
          alt="icon"
          draggable="false"
          class="mw-100"
        />
      </div>
      <div class="feature-body">
        <div v-if="ownerName" class="d-flex gap-15">
            <div class="icon-box flex-shrink-0">
                <img src="/assets/images/animal-shelter.png" alt="Animal Shelter" draggable="false">
            </div>
            <div class="description-box flex-grow-1">
                <p class="mb-0">From: {{ownerName}}</p>
            </div>
        </div>
        <div v-if="phone" class="d-flex gap-15 mb-2">
            <div class="icon-box flex-shrink-0">
                <img src="/assets/images/telephone.png" alt="Phone" draggable="false">
            </div>
            <div class="description-box flex-grow-1">
                <p class="mb-0"><a :href="`tel:${phone}`" class="text-dark">{{phone}}</a></p>
            </div>
        </div>
        <div v-if="address"  class="d-flex gap-15">
            <div class="icon-box flex-shrink-0">
                <img src="/assets/images/pin.png" alt="Pin" draggable="false" />
            </div>
            <div class="description-box flex-grow-1">
                <p class="mb-0">{{address}}</p>
            </div>
        </div>
        <div v-if="distance"  class="d-flex gap-15">
            <div class="icon-box flex-shrink-0">
                <img src="/assets/images/pin.png" alt="Pin" draggable="false" />
            </div>
            <div class="description-box flex-grow-1">
                <p class="my-1">{{distance}} away</p>
            </div>
        </div>
        <slot></slot>
      </div>
      <div v-if="price" class="feature-footer pt-3">
            <div class="d-flex justify-content-between align-items-center">
                <div class="price-box">
                    <h3 class="f-24 text-theme-primary">${{price}}</h3>
                </div>
            </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const emit = defineEmits(['on-wishlist']);
const props = defineProps({
    showWishlist: {
        type : Boolean,
        default : true,
    },
    ownerName : {
        type : String,
        default : null,
    },
    image : {
        type : String,
        default : null,
    },
    status : {
        type : String,
        default : null,
    },
    name : {
        type : String,
        default : null,
    },
    address : {
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
    phone : {
        type : String,
        default : null,
    },
    showGenderIcon : {
        type : Boolean,
        default : true,
    },
    showStatusBadge : {
        type : Boolean,
        default : true,
    },
    isWishlist : {
        type : Boolean,
        default : false
    },
    isFeatured : {
        type : Boolean,
        default : false
    },
    route : {
        type : Object,
        default : ()=> ({}),
    }
});
</script>