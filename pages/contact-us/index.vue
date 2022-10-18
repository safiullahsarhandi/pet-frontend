<template>
  <section class="about default-bg p-70">
    <div class="container">
      <div class="row">
        <div class="col-md-10 m-auto">
          <div class="form-head text-center">
            <h1 class="font-weight-bold">Contact Us</h1>
          </div>
          <div class="form-area shadow p-md-5 p-3">
            <div class="form-body">
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
                        class="form-control bg-light rounded-pill"
                        id="name"
                      />
                      <error-message name='name'/>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="email">
                        Email Address <span class="required">*</span>
                      </label>
                      <Field
                        name="email"
                        type="text"
                        placeholder="Enter Email Address"
                        class="form-control bg-light rounded-pill"
                        id="email"
                      />
                      <error-message name='email'/>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <label for="subject">
                        Subject <span class="required">*</span>
                      </label>
                      <Field
                        name="subject"
                        type="text"
                        placeholder="Enter Subject"
                        class="form-control bg-light rounded-pill"
                        id="subject"
                      />
                      <error-message name='subject'/>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <label for="discription"> Message </label>
                      <Field
                        name="message"
                        id="discription"
                        class="form-control bg-light rounded-20"
                        placeholder="Enter Message"
                        value=""
                        rows="5"
                        as="textarea"
                      >
                      </Field>
                      <error-message name='message'/>
                    </div>
                  </div>
                </div>
                <div class="loginBtn text-center my-4">
                  <button
                    class="secondary-theme-button shadow btn bg-brown py-2"
                  >
                    Submit
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
import {Form, Field, ErrorMessage} from 'vee-validate';
import * as yup from 'yup';
import { contactUs } from '~~/services/general';
const {notification} = useHelper();
const form = ref(null);
const schema = yup.object({
    name : yup.string().required(),
    email : yup.string().email().required(),
    subject : yup.string().required(),
    message : yup.string().required(),
});

const onSubmit = async (values)=> {
    try {
        let {message} = await contactUs(values);
        notification(message);
        form.value.resetForm();
    } catch (error) {
        
        notification(error.message);
    }
};
</script>