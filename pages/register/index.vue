<template>
  <section class="auth-bg">
    <div class="container">
      <div class="row">
        <div class="col-md-10 m-auto">
          <div class="form-area shadow p-md-5 p-3">
            <div class="form-head text-center">
              <h1 class="font-weight-bold">Sign Up</h1>
              <p class="mb-0">
                Sign Up below and share the love for adoptable pets.
              </p>
            </div>
            <div class="form-body pt-4">
              <Form ref="form" :validation-schema="schema" @submit="onSubmit">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="name">
                        Name <span class="required">*</span>
                      </label>
                      <Field
                        name="name"
                        type="text"
                        placeholder="Enter Name"
                        class="form-control rounded-pill"
                        id="name"
                      />
                      <error-message name="name" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="email">
                        Email Address <span class="required">*</span>
                      </label>
                      <Field
                        name="email"
                        type="email"
                        placeholder="Example@email.com"
                        class="form-control rounded-pill"
                        id="email"
                      />
                      <error-message name="email" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="phone">
                        Phone Number <span class="required">*</span>
                      </label>
                      <client-only>
                        <Field
                          name="phone"
                          type="number"
                          placeholder="Enter Phone Number"
                          class="form-control rounded-pill"
                          id="phone"
                          v-slot="{field}"
                        >
                        <vue-tel-input v-bind="field"  @country-changed="getPhoneData" defaultCountry="US" ref="phoneInput" :key="refreshPhoneInput" mode="international"></vue-tel-input>
                        </Field>
                      </client-only>
                      <!-- <Field
                      /> -->
                      <error-message name="phone" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="location">
                        Location <span class="required">*</span>
                      </label>
                      
                        <GMapAutocomplete
                        :value="address"
                        placeholder="Enter Address"
                        @input="updateValue"
                        @place_changed="setPlace"
                        class="form-control rounded-pill bg-light"
                        >
                      </GMapAutocomplete>
                      <input type="hidden" v-model="address"/>
                      <error-message name="address"/>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="password">
                        Password <span class="required">*</span>
                      </label>
                      <div class="password-box">
                        <Field
                          name="password"
                          type="password"
                          placeholder="Enter Password"
                          class="form-control rounded-pill"
                          id="password"
                        />
                        <button @click="switchType($event,'#password')" type="button">
                          <i class="fa fa-eye-slash"></i>
                        </button>
                      </div>
                      <error-message name="password" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="confirmPassword">
                        Confirm Password <span class="required">*</span>
                      </label>
                      <div class="password-box">
                        <Field
                          name="password_confirmation"
                          type="password"
                          placeholder="Confirm Password"
                          class="form-control rounded-pill"
                          id="confirmPassword"
                        />
                        <button @click="switchType($event,'#confirmPassword')" type="button">
                          <i class="fa fa-eye-slash"></i>
                        </button>
                      </div>
                      <error-message name="password_confirmation" />
                    </div>
                  </div>
                </div>
                <div class="loginBtn text-center my-4">
                  <button
                    type="submit"
                    class="secondary-theme-button shadow btn bg-brown py-2" 
                  >
                    Sign Up
                  </button>
                </div>
                <div class="sign-up-link text-center">
                  <p class="mb-0">
                    Don't Have An Account ?
                    <nuxt-link
                      :to="{ name: 'login' }"
                      class="text-theme-primary"
                      >Sign In</nuxt-link
                    >
                  </p>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { VueTelInput } from 'vue3-tel-input';
import { register } from "~~/services/auth";
import { Form, Field, ErrorMessage, useField, useForm } from "vee-validate";
import * as yup from "yup";

const { switchType, notification } = useHelper();
const form = ref(null);
const geoLocation = ref({});
const countryCode = ref({});
const schema = yup.object({
  name: yup.string().required(),
  phone: yup.string().required(),
  address: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required(),
  password_confirmation: yup
    .string()
    .required()
    .label("password confirmation")
    .oneOf(
      [yup.ref("password"), null],
      "password confirmation does not match."
    ),
});
const {useFieldModel,setFieldValue} = useForm(form);
let [address] = useFieldModel(['address']);

const setPlace = (place)=> {
    address = place.formatted_address;
    form.value.setFieldValue('address',address);
    let { location } = place.geometry;
    geoLocation.value = {lat : location.lat(),lng : location.lng()};
  }
  const updateValue = async (e)=> {
    if(!e.target.value){
      address = '';
      form.value.setFieldValue('address',address);

    }
}

const router = useRouter();

const onSubmit = async (values) => {
  try {
    let { message } = await register({
      ...values,
      country_code : `+${countryCode.value.dialCode}`,
      country_iso : countryCode.value.iso2,
      ...geoLocation.value, 
      address,
    });
    notification(message);
    navigateTo('/login');
  } catch (error) {
    if (error.errors) form.value.setErrors(error.errors);
    if (error.message) notification(error.message, "error");
  }
};
const getPhoneData = (data)=> {
  countryCode.value = data;
};
</script>