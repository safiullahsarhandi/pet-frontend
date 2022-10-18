<template>
    <section class="listing-page py-5">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="listing-title text-center">
                    <h1 class="font-weight-bold">{{name}}</h1>
                </div>
                <div class="my-4 shelter-banner">
                    <figure class="mb-0">
                        <img :src="image" alt="Shelter Banner" class="mw-100">
                    </figure>
                </div>
            </div>
        </div>
    </div>
</section>
</template>
<script setup>
const props = defineProps({
    image : {
        type : String,
        default : null,
    },
    name : {
        type : String,
        default : null,
    }
});
</script>