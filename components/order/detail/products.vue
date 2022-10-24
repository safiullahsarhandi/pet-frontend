<template>
  <div class="table-responsive">
    <table class="table">
      <thead class="bg-theme-primary text-white">
        <tr>
          <th scope="col">Products</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr :key="productIndex" v-for="(product,productIndex) in products">
          <td>
            <div class="product-info">
              <div
                class="
                  d-flex
                  gap-15
                  flex-wrap flex-md-nowrap
                  align-items-center
                "
              >
                <div class="cart-image">
                  <figure class="mb-0">
                    <nuxt-link :to="{name : 'shops-id-products-productid',params : {id : product?.orderable?.vendor_id,productid : product?.orderable?.id,} }">
                      <img
                        :src="product?.orderable?.file?.file_url"
                        :alt="`${product?.orderable?.name}`"
                        draggable="false"
                        class="mw-100"
                      />
                    </nuxt-link>
                  </figure>
                </div>
                <div class="product-title">
                  <p class="mb-0">{{product?.orderable?.name}}</p>
                </div>
              </div>
            </div>
          </td>
          <td>${{product?.price}}</td>
          <td>{{product?.qty}}</td>
          <td>${{product?.price * product?.qty}}</td>
        </tr>
        <no-record tag="tr" :colspan="4" :data="products"></no-record>
      </tbody>
    </table>
  </div>
</template>
<script setup>
const props = defineProps({
    products : {
        type : Array,
        default : ()=> ([]),
    }
});
</script>