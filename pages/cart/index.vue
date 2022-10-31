<template>
    <section class="listing-page cart py-5">
    <client-only>
        <div class="container">
            <div v-if="items.length > 0" class="row">
                <div class="col-md-12">
                    <div class="listing-title text-center">
                        <h1 class="font-weight-bold">Cart</h1>
                    </div>
                </div>
            </div>
            <div v-if="items.length > 0" class="row">
                <div class="col-md-9">
                        <cart-items/>
                </div>
                <div class="col-md-3">
                        <cart-summary/>
                </div>
            </div>
            <div v-if="items.length == 0" class="row text-center">
            <div class="col-md-12">
                <img :style="{width : '250px'}" src="/assets/images/basket.svg"/>
                <h1>Cart Is Empty!</h1>
            </div>
        </div>
        </div>
    </client-only>
</section>
</template>
<script setup>
const {cartItems: items} = useCart();
</script>