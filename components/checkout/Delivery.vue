<template>
  <div class="delivery-details shadow px-md-5 p-4 mb-5">
    <div class="titleBox d-flex align-items-center justify-content-between">
      <h4 class="mb-0">Delivery Details</h4>
      <button v-if="validated" @click="validated = false" class="btn border-0 bg-transparent" type="button">
        <h4 class="mb-0"><i class="fa fa-edit"></i></h4>
      </button>
    </div>
    <div class="pt-4 wizard">
      <div v-if="!validated" class="form-group">
        <div class="position-relative">
            <GMapAutocomplete
                :value="value"
                placeholder="Enter City, State or Zip"
                @input="updateValue"
                @place_changed="setPlace"
                class="form-control rounded-pill bg-light"
                >
            </GMapAutocomplete>
          <button type="button" class="search-btn text-secondary">
            <i class="fa fa-search"></i>
          </button>
        </div>
        <span>{{errorMessage}}</span>
      </div>
      <div v-if="!validated" class="form-group text-center mb-0">
        <button
          
          @click="validateAddress"
          class="btn bg-brown rounded-pill border-0 px-5 text-white"
          type="button"
        >
          Continue
        </button>
      </div>
    </div>
    <div class="edit-zip showBox" v-if="validated">
      <p class="mb-0">{{value}}</p>
    </div>
  </div>
</template>
<script setup>
import { useField } from "vee-validate";

const emit = defineEmits(['validated']);
const validated = ref(false);
const {value,errorMessage,validate} = useField('address.text');
const setPlace = (place)=> {
    value.value = place.formatted_address;
}
const updateValue = (e)=> {
    if(!e.target.value){
        value.value = '';
    }
}

watch(validated,(value)=> {
        emit('validated',{address: value});
});
const validateAddress = async ()=> {
    let result = await validate();
    validated.value = result.valid;
};
</script>