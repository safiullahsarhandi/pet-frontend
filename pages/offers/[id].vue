<template>
  <section class="listing-page py-5">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-3">
          <div class="back-page">
            <nuxt-link :to="{name : 'account-ads'}" class="back-arrow"
              ><i class="fa fa-arrow-left"></i
            ></nuxt-link>
          </div>
        </div>
        <div class="col-md-7">
          <div class="listing-title text-center">
            <h1 class="font-weight-bold">Offer</h1>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="seachedFilter">
            <div class="row justify-content-between mb-3">
              <div class="col-md-6">
                <div
                  class="
                    form-group
                    d-flex
                    align-items-center
                    gap-15
                    mb-0
                    flex-wrap
                  "
                >
                  <label class="flex-shrink-0 mb-md-0"> Sort by </label>
                  <input
                    type="date"
                    class="form-control rounded-pill serachFiled flex-shrink-0"
                  />
                  <input
                    type="date"
                    class="form-control rounded-pill serachFiled flex-shrink-0"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <select
                    name="type"
                    id="type"
                    class="form-control rounded-pill"
                  >
                    <option value="">Select Type</option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <!-- ad listing  -->
          <table-main :data="data" :fields="fields">
            <template #extra-heads>
                <th>Action</th>
            </template>
            <template #extra-cells="item">
                <td>
                    <p class="mb-0">
                        <nuxt-link class="text-secondary" :to="{name : 'offers-detail-id',params : {id : item.id}}"><i class="fa fa-eye pr-2"></i></nuxt-link>
                    </p>
                </td>
            </template>
          </table-main>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { offers as fields } from "~~/content/tableHeader";
import { getOffers } from "~~/services/offer";
let { fetch, data } = useApi((page = 1) => getOffers({ page,pet_id : route.params.id }));
let { setFilter, filterValues } = useTableFilter(data);
const route = useRoute();
onBeforeMount(() => {
  fetch();
});
</script>