<template>
  <section class="donate-form p-70">
    <div class="container">
      <div class="row">
        <div class="col-md-10 m-auto">
          <div class="form-head text-center mb-4">
            <h1 class="font-weight-bold">Profile</h1>
          </div>
          <div class="form-area shadow p-md-5 p-3">
            <div class="form-body pt-2">
              <div class="row">
                <div class="col-md-12 text-center mb-5">
                  <div class="profile-box">
                    <div class="profile-image">
                      <img
                        :src="user?.file?.file_url"
                        alt="Profile Image"
                        class="mw-100"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="name"> Name </label>
                    <p class="mb-0 text-secondary">{{ user?.name }}</p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="email"> Email Address </label>
                    <p class="mb-0 text-secondary">{{ user?.email }}</p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="phone"> Phone Number </label>
                    <p class="mb-0 text-secondary">
                      {{ user?.country_code }}{{ user?.phone }}
                    </p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="phone"> Location </label>
                    <p class="mb-0 text-secondary">
                      {{ user?.address || "NA" }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="loginBtn text-center my-4">
                <p class="mb-0">
                  <nuxt-link
                    class="secondary-theme-button shadow btn bg-brown py-2"
                    :to="{ name: 'account-edit' }"
                    >Edit Profile</nuxt-link
                  >
                </p>
                <button
                  class="btn border-0 bg-transparent mt-4"
                  href="javascript:void(0)"
                  @click="showCreatorPopup('/v1/account/change-password', 'Change Password',{})"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <client-only>

        <popup-creator
        :title="popupParams.title"
        :active="popupParams.active"
        :fields="popupParams.fields"
        :api-url="popupParams.apiUrl"
        :validation-schema="popupParams.schema"
        :data="popupParams.data"
        @closed="hideCreatorPopup"
        submit-btn-text="Update"
        ></popup-creator>
      </client-only>
    </div>
  </section>
</template>
<script setup>
import * as yup from 'yup';
import { useUserStore } from "~~/stores/user";
const store = useUserStore();
const { confirmPopup } = usePopup();
const {
  showCreatorPopup,
  hideCreatorPopup,
  popupParams,
  setSchema,
  setFields,
} = useCreatorPopup();
const user = computed(() => store.user);
onBeforeMount(() => {
  setFields([
    {
      label: "Current Password *",
      name: "current_password",
      placeholder: "Enter Current Password",
      type : 'password',
    },
    {
      label: "New Password *",
      name: "password",
      placeholder: "Enter New Password",
      type : 'password',
      id : 'password',
    },
    {
      label: "Confirm Password *",
      name: "password_confirmation",
      placeholder: "Confirm Password",
      type : 'password',
      id : 'password_confirmation',
    },
  ]);
  setSchema({
    current_password: yup.string().required(),
    password : yup.string().required(),
    password_confirmation : yup
    .string()
    .required('Please retype your password.')
  });
});
</script>