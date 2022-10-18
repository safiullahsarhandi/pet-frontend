<script lang="ts" setup></script>

<template>
  <section class="testimonalSection">
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-center">
          <h1 class="f-40">Testimonials</h1>
          <p>Special Quotes From Our Customers</p>
        </div>
      </div>
    </div>
    <div class="slider">
        <Carousel :settings="settings">
          <slide :key="slide" v-for="slide in 10">
            <div class="testimonialBox shadow">
              <div class="rating text-yellow mb-3">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
              </div>
              <div class="testimonialContent">
                <h4>Lorum Ipsum Dummy</h4>
                <p>
                  Contrary to popular belief, Lorem Ipsum is not simply random text.
                </p>
              </div>
              <div class="authorBox d-flex gap-15 align-items-center">
                <div class="author-image">
                  <figure class="mb-0">
                    <img
                      src="/assets/images/t1.png"
                      alt="Ben Döring"
                      class="mw-100"
                      draggable="false"
                    />
                  </figure>
                </div>
                <div class="authorInfo">
                  <p class="mb-0 text-theme-primary">Ben Döring</p>
                  <p class="text-secondary mb-0">
                    <small>Oct 27 - 8 Minutes read</small>
                  </p>
                </div>
              </div>
            </div>
          </slide>
        </carousel>
    </div>
  </section>
</template>
<script setup>
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
const settings = {
  itemsToShow: 2.6,
  wrapAround: true,
};

</script>
<style scoped></style>
