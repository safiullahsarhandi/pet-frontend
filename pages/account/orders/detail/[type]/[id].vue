<template>    
    <section class="listing-page py-5">
        <client-only>
            <component :is="component[type]" /> 
        </client-only>
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