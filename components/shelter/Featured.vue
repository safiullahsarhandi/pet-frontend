<template>
    
<section class="ads--featured">
    <div class="container">
        <div class="row">
            <div class="col-md-12 text-center">
                <h1 class="f-40">Featured Ads</h1>
                <p>Adorable adoptables near you!</p>
            </div>
        </div>
            <carousel v-if="data.data" :settings="settings" :items-to-show="1.5">
                <slide  class="mr-2" :key="adIndex"  v-for="(ad,adIndex) in data.data">
                    <card-featured 
                    @on-wishlist="toggleWishlist(ad?.id,adIndex)"
                    :name="ad?.name"
                    :address="ad?.owner?.address"
                    :owner-name="ad?.owner?.name"
                    :image="ad?.file?.file_url"
                    :is-wishlist="ad?.is_wishlist"
                    :price="ad?.payable_cost"
                    :route="{name : 'pets-pettype-detail-id',params : {pettype : 'purchase',id : ad?.id}}"
                    />
                </slide>
                <template #addons="{ slidesCount }">
                    <Pagination></Pagination>
                </template>
            </carousel>
    </div>
</section>
</template>
<script setup>
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { getAds } from "~~/services/ad";
const props = defineProps({
    ownerId : {
        type : Number,
        default : null,
    }
});
const {fetch, data} = useApi((page = 1)=> getAds({owner_id : props.ownerId,page,per_page : 4,type : 'featured'}));
const {toggleWishlist} = useWishlist(data,'data.*');

const settings = {
  itemsToShow: 3,
  itemsToScroll: 0,
  wrapAround: false,
};

onBeforeMount(()=> {
    fetch();
});
</script>