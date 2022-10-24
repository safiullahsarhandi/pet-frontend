<template>
  <section class="privateOwner">
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-center">
          <h1 class="f-40">Adopt Pet From Private Owner</h1>
          <p>Pets Available for Adoption Nearby</p>
        </div>
        <div :key="petIndex" v-for="(pet,petIndex) in data.data" class="col-md-6 mb-4">
          <card-horizontal-ad 
            @on-wishlist="toggleWishlist(pet?.id,petIndex)"
            :is-wishlist="pet?.is_wishlist"
            :image="pet?.file?.file_url"
            :name="pet?.name"
            :address="pet?.owner?.address"
            :owner-name="pet?.owner?.name"
            :route="{name : 'pets-pettype-detail-id',params : {pettype : 'adoption', id : pet?.id } }"
            />
        </div>
        <div class="col-md-12 text-center">
          <p class="mb-0">
            <nuxt-link class="secondary-theme-button shadow btn" :to="{name : 'pets-type',params : {type : 'adoption'}}"
              >View All Listing</nuxt-link>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { getPets } from "~~/services/pet";

const {data} = useApi((page = 1)=> getPets({page,per_page : 4,type : 'adoption'}));
const {toggleWishlist} = useWishlist(data,'data.*');
</script>
<style scoped></style>
