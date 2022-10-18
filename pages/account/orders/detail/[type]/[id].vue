<template>    
    <section class="listing-page py-5">
        <component :is="component[type]" /> 
    </section>
</template>
<script setup>

const route = useRoute();
let {type} = route.params;
const component = {
    product : resolveComponent('OrderProduct'),
    offers : resolveComponent('OrderOffers'),
    pet : resolveComponent('OrderPurchase'),
};

</script>