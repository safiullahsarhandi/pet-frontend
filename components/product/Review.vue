<template>
  <section class="review-section py-5">
    <div class="container">
      <div class="row">
        <div class="col-md-12 shadow">
            <div class="review-box px-5 py-3">
                <div class="title-box">
                    <h2>Rating & Reviews</h2>
                </div>
            </div>
          <div class="customer-reviews px-5 py-3">
            <div :key="reviewIndex" v-for="(review,reviewIndex) in data.data" class="c-review mb-5">
                <div class="d-flex">
                    <star-rating v-model="review.rating" starSize="16" :disableClick="true" starColor="#FFBB00" :showControl="false"></star-rating>
                </div>
              <div class="d-flex gap-15 flex-wrap align-items-center mb-2">
                <p class="mb-0 text-secondary">by {{review?.user?.name}}</p>
                <div class="d-flex align-items-center">
                  <img
                    src="/assets/images/trust.png"
                    alt="Verified Purchase"
                    draggable="false"
                    class="mw-100 pr-2"
                  />
                  <p class="mb-0 text-green">Verified Purchase</p>
                </div>
              </div>
              <div class="review-content">
                <p class="mb-0">
                 {{review.review}}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <layout-pagination :show-detail="false" @change="fetch" :data="data"></layout-pagination>
    </div>
  </section>
</template>
<script setup>
import { getReviews } from '~~/services/product';
import StarRating from 'vue3-star-ratings'
const route = useRoute();
const {fetch,data} = useApi((page = 1)=> getReviews(route.params.productid,{}));

</script>