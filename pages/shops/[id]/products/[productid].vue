<template>
  <section class="listing-page">
    <client-only>

      <product-info :product="data"/>
      <product-review/>
    </client-only>
    </section>
</template>
<script setup>
import { getProduct } from '~~/services/product';
const route = useRoute();
const {data} = useApi((page = 1)=> getProduct(route.params.productid,{vendor_id : route.params.id}));

</script>