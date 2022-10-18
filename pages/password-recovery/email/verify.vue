<template>
    <section class="auth-bg">
      <div class="container">
        <div class="row">
          <div class="col-md-7 m-auto">
            <div class="form-area shadow p-md-5 p-3">
              <div class="form-head text-center">
                <h1 class="font-weight-bold">Forgot Your Password?</h1>
                <p class="mb-0">
                  An email has been sent to you with a verification code. Please
                  enter it here.
                </p>
              </div>
              <div class="form-body pt-4">
                <Form ref="form" @submit="onSubmit" :validation-schema="schema" method="POST">
                  <fieldset class="number-code">
                    <Field 
                      :id="`digit${index}`" 
                      name="email"
                      placeholder="Example@email.com"
                      class="form-control rounded-pill"
                      type="email"
                    />
                    <error-message name="email"/>
                  </fieldset>
                  <div class="form-group mt-3">
                    <div
                      class="
                        d-flex
                        align-items-center
                        justify-content-end
                        flex-wrap
                      "
                    >
                      <div class="forgot-link">
                        <p class="mb-0"><a href="#">Resend Code</a></p>
                      </div>
                    </div>
                  </div>
                  <div class="loginBtn text-center my-4">
                    <button
                      class="secondary-theme-button shadow btn bg-brown py-2"
                      type="submit"
                    >
                      Continue
                    </button>
                  </div>
                  <div class="sign-up-link text-center">
                    <p class="mb-0">
                      <a href="./forgot-password.php" class="text-dark"
                        >Back to Sign In</a
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
  import {Form,Field,ErrorMessage} from 'vee-validate';
  import * as yup from 'yup';
  import { verifyEmail } from '~~/services/password';
  
  const { notification } = useHelper();
  const {focusBack,focusNext,code} = useVerifyCode();
  const form = ref(null);
  const schema = yup.object({
      email : yup.string().required().email(),
  });
  
  const onSubmit = async (values) =>  {
      try {
          let {message} = await verifyEmail(values);
          notification(message);
          localStorage.setItem('email',values.email);
          navigateTo({name : 'password-recovery-code-verify'});
          // router.push({name : 'admin.pr.pr2'});
  
      } catch (error) {
  
          if(error.response){
              let {errors, message} = error.response?.data;
              if(errors){
                  form.value.setErrors(errors);
              }
              notification(message,'error');
          }
      }
  }
  </script>