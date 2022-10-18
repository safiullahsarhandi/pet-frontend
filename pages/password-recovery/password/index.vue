<template>
  <section class="auth-bg">
    <div class="container">
      <div class="row">
        <div class="col-md-7 m-auto">
          <div class="form-area shadow p-md-5 p-3">
            <div class="form-head text-center">
              <h1 class="font-weight-bold">Forgot Your Password?</h1>
              <p class="mb-0">Enter a new password.</p>
            </div>
            <div class="form-body pt-4">
              <Form :validation-schema="schema" @submit="onSubmit" method="POST">
                <div class="form-group">
                  <label for="password">
                    Password <span class="required">*</span>
                  </label>
                  <div class="password-box">
                    <Field
                      name="password"
                      type="password"
                      placeholder="**********************"
                      class="form-control rounded-pill"
                      id="password"
                    />
                    <button @click="switchType($event,'#password')" type="button">
                      <i class="fa fa-eye-slash"></i>
                    </button>
                  </div>
                  <error-message name='password'/>
                </div>
                <div class="form-group">
                  <label for="confirmPassword">
                    Password <span class="required">*</span>
                  </label>
                  <div class="password-box">
                    <Field
                      name="password_confirmation"
                      type="password"
                      placeholder="**********************"
                      class="form-control rounded-pill"
                      id="confirmPassword"
                    />
                    <button @click="switchType($event,'#confirmPassword')" type="button">
                      <i class="fa fa-eye-slash"></i>
                    </button>
                  </div>
                  <error-message name='password_confirmation'/>
                </div>
                <div class="loginBtn text-center my-4">
                  <button class="secondary-theme-button shadow btn bg-brown py-2">
                    Update
                  </button>
                </div>
                <div class="sign-up-link text-center">
                  <p class="mb-0">
                    <nuxt-link :to="{name : 'login'}" class="text-dark"
                      >Back to Sign In</nuxt-link>
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
  import { updatePassword } from '~~/services/password';
  const {notification, switchType} = useHelper();
let email, code;
if(process.client)
{

  email  = localStorage.getItem('email');
  code  = localStorage.getItem('code');
}
  const schema = yup.object({
    password : yup.string().required(),
    password_confirmation : yup
    .string()
    .required().label('password confirmation')
    .oneOf([yup.ref('password'),null], 'password confirmation does not match.'),
  });
  
  const router = useRouter();
  const form = ref(null);
  
  const onSubmit = async (values) =>  {
    try {
          let {message} = await updatePassword({...values,email,code});
          notification(message);
          localStorage.removeItem('code');
          localStorage.removeItem('email');
          router.replace({name : 'login'});
  
      } catch (error) {
        console.log(error);
          if(error.response ){
              let {errors, message} = error.response?.data;
              if(errors){
                  form.value.setErrors(errors);
              }
              notification(message,'error');
          }
      }
  }
  </script>