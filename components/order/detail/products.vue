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
          <td>${{product?.price * product?.qty}}
            <p v-if="isDelivered && !(product?.orderable?.is_reviewed)" class="mb-0"><a @click="setReviewMeta(product?.orderable_id,product?.order_id)" class="text-info" href="javascript:void(0)"> Write Review</a></p>
            <p v-else-if="isDelivered && (product?.orderable?.is_reviewed)" class="mb-0 text-muted">Review Submitted</p>
          </td>
        </tr>
        <no-record tag="tr" :colspan="4" :data="products"></no-record>
      </tbody>
    </table>
    <client-only>
          <popup-creator
              :additional-fields="additionalFields"
              title="Rate & Review"
              :active="popupParams.active"
              :fields="popupParams.fields"
              :api-url="popupParams.apiUrl"
              :validation-schema="popupParams.schema"
              :data="popupParams.data"
              @closed="hidePopup"
              submit-btn-text="Submit"
              :show-icon="false"
          ></popup-creator>
      </client-only>
  </div>
</template>
<script setup>
import * as yup from 'yup';
let StarRating;
const props = defineProps({
  isDelivered : {
    type : Boolean,
    default : true,
  },
  products : {
        type : Array,
        default : ()=> ([]),
    }
});

const emit = defineEmits(['on-review']);
const {
  showCreatorPopup,
  hideCreatorPopup,
  popupParams,
  setSchema,
  setFields,
} = useCreatorPopup();

const additionalFields = ref({});
const refreshPopup = ref(0);
onBeforeMount(async ()=> {
  StarRating  = await import('vue-star-rating').then(result => result.default);
});
const setReviewMeta = async (product_id,order_id)=> {
  try {
      refreshPopup.value++;
      setFields([
          {
              component : StarRating,
              name: "rating",
              attrs : {
                  class : 'rating',
              },
              componentProps: {
                starSize : "26",
                showRating : false,
                starColor : "#FFBB00",
                
              },
              event : 'update:rating',
              id : 'review',
          },
          {
              label: "Review",
              name: "review",
              placeholder: "Enter Review",
              type : 'textarea',
              id : 'review',
          },
      ]);
      setSchema({
          rating : yup.string().notRequired(),
          review: yup.string().required().label('review'),
      });
      showCreatorPopup('/v2/reviews', '',{ rating : 0});
      additionalFields.value = {product_id,order_id};
  } catch (error) {
    console.log(error); 
  }
}
const hidePopup = (apiCalled)=> {
    if(apiCalled)
    {
      emit('on-review');
    }
    hideCreatorPopup();
    setFields([]);
}
</script>