<template>
  <div class="listing-page py-5">
    <section class="donate-form p-70">
      <div class="container">
        <div class="row">
          <div class="col-md-10 m-auto">
            <div class="form-area shadow p-md-5 p-3">
              <div class="form-head text-center">
                <h1 class="font-weight-bold">Adoption Inquire Form</h1>
              </div>
              <div class="form-body pt-4">
                <client-only>
                    <Form @submit="onSubmit" :validation-schema="schema">
                  <div class="row">
                    <div :key="index" v-for="(obj,index) in formFields" class="col-md-6">
                      <div class="form-group">
                        <label :for="`adoptPet${index}`">
                         {{obj?.text}}
                        </label>
                        <Field :name="`form_data${index}`" v-slot="{field}">
                            <select
                                v-bind="field"
                                :id="`adoptPet${index}`"
                                class="form-control bg-light rounded-pill"
                            >
                                <option value="">Select</option>                            
                                <option 
                                    :key="index" 
                                    v-for="(option,index) in obj.options" 
                                    :value="option"
                                >{{option}}</option>
                            </select>
                        </Field>
                    </div>
                    <error-message :name="`form_data${index}`" />
                    </div>
                  </div>
                  <div class="loginBtn text-center my-4">
                    <button
                      class="secondary-theme-button shadow btn bg-brown py-2"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </Form>
                </client-only>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import {Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { getGeneralData } from '~~/services/general';
import { createOffer } from '~~/services/offer';
import { useCategoryStore } from '~~/stores/category';
const {fetch, data} = useApi(()=> getGeneralData());
const {notification} = useHelper();
const route = useRoute();
const schema = ref(yup.object());
onBeforeMount(()=> {
    fetch();
});

const formFields = computed(()=> data.value.inquiryForm); 
watch(formFields,(val)=> {
    
    let values = {};
    val.forEach((val,index)=> values[`form_data${index}`] = yup.string().nullable().required('this is required field')); 
    schema.value = yup.object().shape(values);
});
const onSubmit = async (values)=> {
    values = Object.values(values);
    try {
        const formData = [];
        values?.forEach((element,index) => {
            formData.push({text : formFields.value[index].text, selected_value : element })
        });
        const {message} = await createOffer({pet_id : route.params.id,form_data : formData,}); 
        notification(message);
        let {pettype, id } = route.params;
        navigateTo({name : 'pets-pettype-detail-id',params : {pettype, id } });
    } catch (error) {
        notification(error.message);
        
    }
    // console.log('sadsd',values);
};

</script>