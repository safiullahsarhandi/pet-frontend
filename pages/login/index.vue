<template>
  <div>
      <section class="auth-bg">
        <div class="container">
          <div class="row">
            <div class="col-md-7 m-auto">
              <div class="form-area shadow p-md-5 p-3">
                <div class="form-head text-center">
                  <h1 class="font-weight-bold">Welcome Back!</h1>
                  <p class="mb-0">
                    Sign In & share the love for adoptable pets.
                  </p>
                </div>
                <div class="form-body pt-4">
                  <Form :validation-schema="schema" @submit="onSubmit">
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
                    <div class="form-group">
                      <div
                        class="
                          d-flex
                          align-items-center
                          justify-content-between
                          flex-wrap
                        "
                      >
                        <div class="custom-control custom-switch">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="remeber"
                          />
                          <label class="custom-control-label" for="remeber"
                            >Remember Me</label
                          >
                        </div>
                        <div class="forgot-link">
                          <p class="mb-0"><nuxt-link :to="{name : 'password-recovery-email-verify'}">Forgot Password</nuxt-link></p>
                        </div>
                      </div>
                    </div>
                    <div class="loginBtn text-center my-4">
                      <button
                        class="secondary-theme-button shadow btn bg-brown py-2"
                      >
                        Login
                      </button>
                    </div>
                    <div class="sign-up-link text-center">
                      <p class="mb-0">
                        Don't Have An Account ?
                        <nuxt-link
                          :to="{ name: 'register' }"
                          class="text-theme-primary"
                          >Sign Up</nuxt-link
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
  </div>
</template>
<script setup>
// imports
import { Form, Field, ErrorMessage } from "vee-validate";
import { login } from "~~/services/auth";
import * as yup from "yup";
const { switchType, notification, setAccessToken } = useHelper();
const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

const router = useRouter();

const onSubmit = async (values) => {
  try {
    let {
      message,
      detail: { token },
    } = await login({ ...values, device_id: "test", device_type: "web" });
    notification(message);
    setAccessToken(token);
    setTimeout(() => window.location.reload(), 1000);
  } catch (error) {
    notification(error.message, "error");
  }
};
</script>