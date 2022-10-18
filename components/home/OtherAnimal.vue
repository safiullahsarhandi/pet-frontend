<template>
  <div
    class="modal fade"
    id="otherAnimal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="otherAnimalTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-md modal-dialog-centered" role="document">
      <div class="modal-content loginPopup">
        <div class="closebtn">
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="pop-up-content text-center">
          <div class="other-categories">
            <div class="row justify-content-center align-items-center gap-15">
              <div :key="categoryIndex" v-for="(category, categoryIndex) in categories" class="col-md-4 position-relative">
                <nuxt-link
                    :to="{name : 'pets-type',params :{ type : 'purchase'},query : {category : category?.id}, }"
                    data-dismiss="modal"
                    class="text-dark"
                >
                    <div class="categories-box bg-green text-center">
                        <img
                        :src="category?.file?.file_url"
                        alt="category image"
                        class="mw-100"
                        draggable="false"
                        />
                        <p class="mb-0">{{category?.name}}</p>
                    </div>
            </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
    categories : {
        type : Array,
        default: ()=> ([]),
    },

});
</script>