<template>
  <shop-banner :image="data?.file?.file_url"/>
  <section class="listing-shop-view">
    <div class="container">
      <shop-info :data="data">
        <template #filter>
            <div action="#" class="d-flex gap-15 align-items-center">
                <div class="form-group flex-grow-1">
                    <select @change="setFilter({category_id : $event.target.value})" name="pet-category" id="petCategory" class="form-control rounded-pill">
                        <option value="">Select Category</option>
                        <option :key="index" v-for="(category,index) in categories" :value="category?.id">{{category?.name}}</option>
                    </select>
                </div>
                <div class="form-group flex-grow-1">
                    <div class="position-relative">
                        <input @input="handleSearch($event.target.value)" type="text" placeholder="Search Product" class="form-control rounded-pill" id="password">
                        <button type="button" class="search-btn text-secondary"><i class="fa fa-search"></i></button>
                    </div>
                </div>
            </div>
        </template>
      </shop-info>
      <!-- product listing  -->
      <div class="product-listing py-5">
        <div class="row">
          <div :key="index" v-for="(product,index) in products.data" class="col-md-3 mb-3">
            <card-shop 
            :name="product?.name" 
            :image="product?.file?.file_url"
            :price="product?.price"
            :distance="product?.distance"
            :rating="product?.rating"
            :total-ratings="product?.ratings_count"
            :route="{name : 'shops-id-products-productid',params : {id : route.params?.id,productid : product?.id}}"
            />
          </div>
        </div>
        <layout-pagination @change="fetchProducts" :data="products"/>
      </div>
    </div>
  </section>
</template>
<script setup>
import { getProducts } from '~~/services/product';
import { getVendor } from '~~/services/vendor';
import { useCategoryStore } from '~~/stores/category';
const {debounce} =  useHelper();
const store = useCategoryStore();
const route = useRoute();
const {fetch,data} = useApi((page = 1)=> getVendor(route.params.id,{location : filterValues.value?.location}),{
  fetchImmediate : false,
}); 
let {fetch:fetchProducts,data : products} = useApi((page = 1)=> getProducts({page,vendor_id : route.params.id,...filterValues.value,distance : null}));

const {setFilter,filterValues} = useTableFilter(fetchProducts);
const categories = computed(()=> store.categories);
onBeforeMount(()=> {
    handleSearch = debounce(handleSearch, 500);
    Promise.all([
        store.get({type : ['shop']}),
    ])
});

onMounted(()=> {
  fetch();
});
let handleSearch = (search)=> {
  setFilter({search});
}
</script>