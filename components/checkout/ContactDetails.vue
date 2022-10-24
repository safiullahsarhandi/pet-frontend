<template>
  <div class="delivery-details shadow px-md-5 p-4 mb-5">
    <div class="titleBox d-flex align-items-center justify-content-between">
      <h4 class="mb-0">Contact Details</h4>
      <button @click="validated = !validated" v-if="validated" class="btn border-0 bg-transparent" type="button">
        <h4 class="mb-0"><i class="fa fa-edit"></i></h4>
      </button>
    </div>
    <div  v-if="!validated" class="pt-4 wizard">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="name"> Name <span class="required">*</span> </label>
            <input
              v-model="first_name"
              type="text"
              placeholder="Enter First Name"
              class="form-control bg-light rounded-pill"
              id="name"
            />
            <span>{{firstNameError}}</span>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="lname">
              Last Name <span class="required">*</span>
            </label>
            <input
              v-model="last_name"
              type="text"
              placeholder="Enter Last Name"
              class="form-control bg-light rounded-pill"
              id="lname"
            />
            <span>{{lastNameError}}</span>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="phone">
              Phone Number <span class="required">*</span>
            </label>
            <input
              v-model="phone"
              type="number"
              placeholder="Enter Phone Number"
              class="form-control bg-light rounded-pill"
              id="phone"
            />
            <span>{{phoneError}}</span>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="email">
              Email Address <span class="required">*</span>
            </label>
            <input
              v-model="email"
              type="email"
              placeholder="Enter Email Address"
              class="bg-light form-control rounded-pill"
              id="email"
            />
            <span>{{emailError}}</span>
          </div>
        </div>
      </div>
      <div v-if="!validated" class="form-group text-center mb-0 mt-3">
        <button
        @click="validateContactDetails"
          class="btn bg-brown rounded-pill border-0 px-5 text-white showFileds"
          type="button"
        >
          Continue
        </button>
      </div>
    </div>
    <!-- edit fields  -->
    <div class="edit-feild showBox" v-if="validated">
      <p class="mb-1">First Name: <span class="name">{{first_name}}</span></p>
      <p class="mb-1">Last Name: <span class="lname">{{last_name}}</span></p>
      <p class="mb-1">
        Phone Number: <span class="phoneNumber">{{phone}}</span>
      </p>
      <p class="mb-1">
        Email Address: <span class="email">{{email}}</span>
      </p>
    </div>
  </div>
</template>
<script setup>
import { useField } from "vee-validate";
const emit = defineEmits(['validated']);
const validated = ref(false);
const {value: first_name,errorMessage : firstNameError,validate : firstNameValidate} = useField('contact_detail.first_name');
const {value: last_name,errorMessage : lastNameError, validate : lastNameValidate} = useField('contact_detail.last_name');
const {value: phone,errorMessage : phoneError, validate : phoneValidate} = useField('contact_detail.phone');
const {value: email,errorMessage : emailError, validate : emailValidate} = useField('contact_detail.email');

watch(validated,(value)=> {
        emit('validated',{contact_detail: value});
});
const validateContactDetails = async ()=> {
    Promise.all([
        firstNameValidate(),
        lastNameValidate(),
        phoneValidate(),
        emailValidate(),
    ]).then((result)=>{
        let validatedFields = result.map((item)=> item.valid).filter(Boolean);
        if(validatedFields.length >= 4)
        {
            validated.value = true;
        }
    });
}
</script>