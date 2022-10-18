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
              <Form ref="form" @submit="onSubmit" :validation-schema="schema">
                <fieldset class="number-code">
                  
                    <Field
                    @paste="handlePaste"  
                    @keyup="focusNext($event,index + 1)" 
                    @keyup.delete="focusBack($event,index - 1)" 
                    class="code-input" 
                    type="number"
                    :name="`code[${index}]`"
                    :id="`digit${index}`" 
                    v-model="digit.value"
                    v-for="(digit,index) in code"
                    :key="index" 
                    label="code"
                    />
                    <error-message name="code"/>
                <!-- <input v-model="digit.value" :id="`digit${index}`" @paste="handlePaste"  @keyup="focusNext($event,index + 1)" @keyup.delete="focusBack($event,index - 1)"  name="code" class="code-input" type="number"/> -->
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
import { verifyCode } from '~~/services/password';
const { notification } = useHelper();
const {code,focusBack,focusNext,handlePaste} = useVerifyCode();
let email;
if(process.client){

  email = localStorage.getItem('email');
}
const form = ref(null);
const schema = yup.object({
    // code : yup.mixed().required(),
});
const router = useRouter  ();

const onSubmit = async (values) =>  {
    try {      
        let otp = code.value.map((codeItem) => codeItem.value).join('');
        let {message} = await verifyCode({...values,email, code : otp });
        notification(message);
        localStorage.setItem('code',otp);
        router.replace({name : 'password-recovery-password'});

    } catch (error) {
      console.log(error)
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