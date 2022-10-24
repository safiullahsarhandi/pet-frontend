<template>
  <section class="listing-page py-5">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="listing-title text-center">
            <h1 class="font-weight-bold">Shop</h1>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3">
          <filter-sidebar :immediate="false" @on-change="setFilter" :filters="filters"/>
        </div>
        <div class="col-md-9">
            <filter-vertical class="shadow"></filter-vertical>
          <div class="listing-box my-3">
            <div class="row">
              <div :key="shopIndex" v-for="(shop,shopIndex) in data?.data" class="col-md-4">
                <card-shop
                :name="shop?.business_name"
                :image="shop?.file?.file_url"
                :rating="shop?.rating || 0"
                :total-ratings="shop?.ratings_count"
                :distance="shop?.distance"
                :route="{name : 'shops-id-products',params : {id : shop?.id} }"
                :delivery-fee="deliveryFee"
                ></card-shop>
              </div>
            </div>
          </div>
          <layout-pagination :data="data"></layout-pagination>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { search as searchFilter,range as rangeFilter } from "~~/content/filters";
import { getGeneralData } from "~~/services/general";
import { getVendors } from "~~/services/vendor";

const filters = ref([
    searchFilter,
    rangeFilter,
]);

const {fetch,data} = useApi((page = 1)=> getVendors({page,...filterValues.value}));
const {data : generalData} = useApi((page = 1)=> getGeneralData());
const {setFilter,filterValues} = useTableFilter(fetch);
const deliveryFee = computed(()=> generalData.value?.delivery_rate?.rate);

</script>