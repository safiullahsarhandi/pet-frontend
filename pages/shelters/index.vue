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
        <div class="col-md-3">
          <filter-sidebar @on-change="callFilter" :filters="filters"></filter-sidebar>
        </div>
        <div class="col-md-9">
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
                    :distance="`${shelter?.distance} Miles`"
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
import { 
  cities as cityFilter, 
  countries as countryFilter,
  range as rangeFilter,
  search as searchFilter,
  states as stateFilter
 } from "~~/content/filters";
import { getCities, getCountries, getStates } from "~~/services/general";
import { getShelters } from "~~/services/shelter";

const {fetch,data} = useApi((page = 1)=> getShelters({page,...filterValues.value}));
const {data : countries} = useApi(()=> getCountries());
const {fetch : fetchStates,data : states} = useApi(()=> getStates({ country_id : filterValues.value.country_id } ),{
  fetchImmediate : false, 
});
const {fetch : fetchCities,data : cities} = useApi(()=> getCities({ state_id : filterValues.value.state_id } ),{
  fetchImmediate : false, 
});
const {setFilter,filterValues} = useTableFilter();
const filters = ref([
  searchFilter,
  countryFilter,
  stateFilter,
  cityFilter,
  rangeFilter
]);

watch(countries,(value)=> {
  let values = value.map((item)=> ({key : item.id,label : item.name}));
  filters.value[0].options = values;
});
watch(states,(value)=> {
  let values = value.map((item)=> ({key : item.id,label : item.name}));
  filters.value[1].options = values;
});
watch(cities,(value)=> {
  let values = value.map((item)=> ({key : item.id,label : item.name}));
  filters.value[2].options = values;
});
const callFilter = (value)=> {
  if('country_id' in value && value.country_id){
    setFilter(value,fetchStates); 
    fetch();
  }else if('state_id' in value && value.state_id){
    setFilter(value,fetchCities); 
    fetch();
  }else{
    
    setFilter(value,fetch); 
  }
}
</script>