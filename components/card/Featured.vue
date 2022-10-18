<template>
  <div class="featureBox">
    <div class="feature-image">
      <div class="additional-things">
        <div class="featureRibbon">
          <span>Featured</span>
        </div>
        <div v-if="showWishlist" class="whislList">
          <button @click="emit('on-wishlist')" tabindex="-1" class="text-secondary">
            <i class="fa" :class="{'fa-heart' : (isWishlist),'fa-heart-o' : (!isWishlist)}"></i>
          </button>
        </div>
      </div>
      <figure class="adjust-image">
        <img
          :src="image"
          alt="Kathy Lewis Baby"
          class="mw-100"
          draggable="false"
        />
      </figure>
    </div>
    <div class="feature-content px-3">
      <div class="feature-header d-flex align-items-center gap-15">
        <h3 class="f-22">{{name}}</h3>
        <img
          src="/assets/images/gender-female.png"
          alt="icon"
          draggable="false"
          class="mw-100"
        />
      </div>
        <div class="feature-body">
            <div v-if="ownerName" class="d-flex gap-15">
            <div class="icon-box flex-shrink-0">
                <img
                src="/assets/images/animal-shelter.png"
                alt="Animal Shelter"
                draggable="false"
                />
            </div>
            <div class="description-box flex-grow-1">
                <p class="mb-0">From: {{ownerName}}</p>
            </div>
        </div>
        <div v-if="address" class="d-flex gap-15">
          <div class="icon-box flex-shrink-0">
            <img src="/assets/images/pin.png" alt="Pin" draggable="false" />
          </div>
          <div class="description-box flex-grow-1">
            <p class="mb-0">{{address}}</p>
          </div>
        </div>
      </div>
      <div class="feature-footer pt-3">
        <div class="d-flex justify-content-between align-items-center">
          <div v-if="price" class="price-box">
            <h3 class="f-24 text-theme-primary">${{price}}</h3>
          </div>
          <div v-if="route?.name" class="view-more">
            <nuxt-link :to="route" class="viewMore">View Pet</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const emit = defineEmits(['on-wishlist']);
const props = defineProps({
    ownerName : {
        type : String,
        default : null,
    },
    image : {
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
        type : [String,Number],
        default : null,
    },
    isWishlist : {
        type : Boolean,
        default : false
    },
    showWishlist: {
        type : Boolean,
        default : true,
    },
    route : {
        type : Object,
        default : ()=> ({}),
    }
});
</script>