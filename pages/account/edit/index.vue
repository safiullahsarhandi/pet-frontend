<template>
  <section class="donate-form p-70">
    <div class="container">
      <div class="row">
        <div class="col-md-10 m-auto">
          <div class="form-head text-center mb-4">
            <h1 class="font-weight-bold">Edit Profile</h1>
          </div>
          <div class="form-area shadow p-md-5 p-3">
            <div class="form-body pt-2">
                <Form ref="form" :initial-values="{...user}" :validation-schema="schema" @submit="onSubmit">
                <div class="row">
                  <div class="col-md-12 text-center mb-5">
                    <div class="profile-box">
                      <div class="profile-image">
                        <img
                        :src="image.thumbnail?image.thumbnail:'/assets/images/user-icon.png'"
                          alt="Profile Image"
                          class="mw-100"
                        />
                        <div class="upload-profile-image">
                          <label for="upload" class="m-0">
                            <Field name="file">
                                <input @change="handleChange" ref="uploader" type="file" accept="image/*" class="d-none">
                            </Field>
                            <p  @click="uploader.click()" class="mb-0">
                              <i class="fa fa-camera"></i>
                            </p>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <client-only>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="name">
                          Name <span class="required">*</span>
                        </label>
                        <Field
                          type="text"
                          name="name"
                          class="form-control bg-light rounded-pill"
                          placeholder="Elsa Robert"
                        />
                        <error-message name="name"/>
                      </div>
                    </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="email"> Email Address </label>

                        <p class="mb-0 text-secondary">{{user?.email || ''}}</p>
                      </div>
                    </div>
                  </client-only>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="phone">
                        Phone Number <span class="required">*</span>
                      </label>
                      <client-only>
                        <Field
                          name="phone_number"
                          type="number"
                          placeholder="Enter Phone Number"
                          class="form-control rounded-pill"
                          id="phone"
                          v-model="user.phone_number"
                          v-slot="{field}"
                        >
                          <vue-tel-input v-bind="field" ref="phoneInput" :key="refreshPhoneInput" defaultCountry="US"  @country-changed="getPhoneData" mode="international"></vue-tel-input>
                        </Field>
                      </client-only>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="address">
                        Location <span class="required">*</span>
                      </label>
                      <client-only>
                        <Field
                        type="text"
                        name="address"
                        class="form-control bg-light rounded-pill"
                        required
                        placeholder="Enter City, State"
                      />
                      <error-message name="address"/>

                      </client-only>
                    </div>
                  </div>
                </div>
                <div class="loginBtn text-center my-4">
                  <button
                    class="secondary-theme-button shadow btn bg-brown py-2"
                  >
                    Update
                  </button>
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
import {parsePhoneNumber} from 'libphonenumber-js'
import { VueTelInput } from 'vue3-tel-input';
import { Form,Field,ErrorMessage } from "vee-validate";
import {updateAccount} from '~~/services/account';
import * as yup from 'yup';
import { useUserStore } from "~~/stores/user";
const { notification } = useHelper();
const countryCode = ref(null);
const router = useRouter();
const store = useUserStore();

let user = computed(()=> {
    return store.user || {};
});
let image = ref({
    file : null,
    thumbnail : null,
});
const uploader = ref(null);
const refreshPhoneInput = ref(0);
const phoneInput = ref(null);

watch(user,(newValue)=> {
  image.value.thumbnail = newValue?.file?.file_url;
  // console.log(newValue)
},{immediate : true,deep: true});
const schema = yup.object({
    name : yup.string().required(), 
    phone : yup.string().required(),
    address : yup.string().required(),
});
let {getThumbnail} = useFileReader();


const handleChange = async (e)=> {    
    let file = e.target.files[0];
    let thumbnail = await getThumbnail(file);   
    image.value = {file, thumbnail};
};

const onSubmit = async (values)=> {
  let phone = values.phone_number.replace(`+${countryCode.value.dialCode}`,'');
  phone = phone.replace(/\s/g, "");
   try {
        let {message} = await updateAccount({
          ...values,
          image : image.value.file,
          lat : 0,
          lng : 0,
          country_code : `+${countryCode.value.dialCode}`,
          country_iso : countryCode.value.iso2,
          phone,
        });
        notification(message);
        store.get();
        router.push({name : 'account'});
        
   } catch (error) {
        notification(error.message);
        
   }
};
onMounted(()=> {
  phoneInput._value.choose(user.value.country_iso);
});
const getPhoneData = (data)=> {
  countryCode.value = data;
};
</script>