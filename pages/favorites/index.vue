<template>
    <section class="listing-page py-5">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="listing-title text-center">
                    <h1 class="font-weight-bold">My Favourites</h1>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <filter-vertical :primary-filter="typeFilters" @on-change="setFilter"></filter-vertical>
                <div class="listing-box my-3">
                    <div class="row">
                        <client-only>
                            <div :key="wishlistIndex" v-for="(wishlist,wishlistIndex) in data?.data" class="col-md-3 mb-3">
                                <ad-card 
                                @on-wishlist="toggleWishlist(wishlist.wishable_id,wishlistIndex)"
                                :image="wishlist?.wishable?.file?.file_url"
                                :name="wishlist?.wishable?.name"
                                :address="wishlist?.wishable?.owner?.address"
                                :distance="wishlist?.wishable?.distance"
                                :status="wishlist?.wishable?.status == 'active'?'available':wishlist?.wishable?.status"
                                :is-wishlist="true"
                                >
                                <p class="mb-0">Number of Offers: {{wishlist?.wishable?.offers_count}}</p>
                                </ad-card>
                            </div>
                        </client-only>
                        <no-record :data="data.data">
                            <h4>0 favorites found</h4>
                        </no-record>
                    </div>
                </div>
                <layout-pagination :data="data" @change="fetch"/>
            </div>
        </div>
    </div>
</section>
</template>
<script setup>
import { getWishlists } from '~~/services/wishlist';
import {typeFilters} from '~~/content/filters'; 
import { getCategories } from '~~/services/category';
const route = useRoute();
const type = 'ad';
const {fetch,data} = useApi((page = 1)=> getWishlists({page,type,...filterValues.value}));
const {toggleWishlist} = useWishlist(data,'data.*',true);


onBeforeMount(()=> {
    fetch(1);
});
const {setFilter,filterValues} = useTableFilter(fetch);
</script>