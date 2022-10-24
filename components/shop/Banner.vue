<template>
    <section class="listing-page py-3">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="my-4 shelter-banner">
            <figure class="mb-0">
              <img
                :src="image"
                alt="Shop Banner"
                class="mw-100"
              />
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
});
</script>