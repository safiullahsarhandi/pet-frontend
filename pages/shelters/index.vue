<template>
  <section class="listing-page py-5">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="listing-title text-center">
            <h1 class="font-weight-bold">Shelters</h1>
          </div>
        </div>
      </div>
      <div class="row">
        <!-- <div class="col-md-3">
          <filter-sidebar></filter-sidebar>
        </div> -->
        <div class="col-md-12">
        <filter-vertical class="shadow" />
          <div class="listing-box my-3">
            <div class="row">
              <div :key="index" v-for="(shelter,index) in data.data" class="col-md-4 mb-4">
                <ad-card
                    :show-status-badge="false"
                    :show-gender-icon="false" 
                    :show-wishlist="false"
                    :image="shelter?.file?.file_url"
                    :name="shelter?.name"
                    :phone="shelter?.phone_number"
                    :address="shelter?.address"
                    :route="{name : 'shelters-id-profile',params : {id : shelter?.id}}"
                >
            </ad-card>
              </div>
            </div>
          </div>
          <layout-pagination @change="fetch" :data="data"></layout-pagination>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { getShelters } from "~~/services/shelter";

const {fetch, data} = useApi((page = 1)=> getShelters({page}));
onBeforeMount(()=> {
    fetch();
});
</script>