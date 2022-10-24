<template>
    <div class="product-slides">
            <div
              id="carouselExampleIndicators"
              class="carousel slide"
              data-ride="carousel"
            >
              <ol class="carousel-indicators">
                <li
                    :key="index" v-for="(image,index) in images"
                  data-target="#carouselExampleIndicators"
                  :data-slide-to="index"
                  class="active"
                ></li>
              </ol>
              <div class="carousel-inner">
                <div :key="index" v-for="(image,index) in images" class="carousel-item" :class="{active : (index == 0)}">
                  <img
                    class="d-block w-100"
                    :src="image?.file_url"
                    alt="First slide"
                  />
                </div>
              </div>
              <a
                class="carousel-control-prev op-1"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="prev"
              >
                <span class="rounded-arrow">
                  <span class="fa fa-long-arrow-left" aria-hidden="true"></span>
                </span>
              </a>
              <a
                class="carousel-control-next op-1"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="next"
              >
                <span class="rounded-arrow">
                  <span
                    class="fa fa-long-arrow-right"
                    aria-hidden="true"
                  ></span>
                </span>
              </a>
            </div>
          </div>
</template>
<script setup>
const props = defineProps({
    images : {
        type : Array,
        default : ()=> ([]),
    } 
});
</script>