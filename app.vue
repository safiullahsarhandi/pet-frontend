<template>
  <NuxtLayout>
    <NuxtPage :page-key="route.fullPath" />
    <client-only>
        <popup-confirm
        :active="confirmPopupParams?.visibility"
        @confirmed="() => handler('onConfirm')"
        @cancelled="() => handler('onCancel')"
        :message="confirmPopupParams?.message"
        :title="confirmPopupParams?.title"
        :confirm-btn-text="confirmPopupParams?.confirmBtnText"
        :cancel-btn-text="confirmPopupParams?.cancelBtnText"
        />
        <popup-success
        @closed="successPopupParams.visibility = false"
        :active="successPopupParams?.visibility"
        :title="successPopupParams?.title"
        :message="successPopupParams?.message"
        />
      </client-only>
    </NuxtLayout>
  </template>
<script setup>
import event from "~~/utils/event";
import { useLocationStore } from "~~/stores/location";

const confirmPopupParams = ref({
  visibility: false,
});
const successPopupParams = ref({
  visibility: false,
});
const locationStore = useLocationStore();
const {getLocation} = useLocation();
const route = useRoute();
const nuxtApp = useNuxtApp();

const handler = (callback) => {
  confirmPopupParams.value[callback]();
  confirmPopupParams.value.visibility = false;
};

const showConfirmPopupHandler = (event) => {
  confirmPopupParams.value = event.detail;
};
const showSuccessPopupHandler = (event) => {
  successPopupParams.value = event.detail;
};

onMounted(async ()=> {
});
onBeforeMount(async () => {
  try {
          let {coords} = await getLocation(); 
          locationStore.set({lat : coords.latitude,lng : coords.longitude });
  } catch (error) {
          console.log(error);
  }
  // subscribing custom event
  event.subscribe("showConfirmPopup", showConfirmPopupHandler);
  event.subscribe("showSuccessPopup", showSuccessPopupHandler);
});
const title = ref("My App");
const description = ref("My amazing Nuxt app");

watch(route, () => {
  window.scrollTo(0, 0);
});

useHead({
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { hid: "description", name: "description", content: "" },
    { name: "format-detection", content: "telephone=no" },
  ],
  title: "Dale Pet",
  link: [
    {
      rel: "stylesheet",
      href: "/assets/css/bootstrap.min.css",
    },
    {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
    },
    {
      rel: "stylesheet",
      href: "/assets/css/slick.css",
    },
    {
      rel: "stylesheet",
      href: "/assets/css/style.css",
    },
    {
      rel: "stylesheet",
      href: "/assets/font/qanelas/stylesheet.css",
    },
  ],
  script: [
    { src: "/assets/js/jquery.slim.min.js" },
    { src: "/assets/js/popper.min.js" },
    { src: "/assets/js/bootstrap.bundle.min.js" },
    { src: "/assets/js/slick.js" },
    { src: "/assets/js/main.js", defer: true, async: true },
  ],
});
</script>
<style scoped>
html {
  scroll-behavior: smooth; /* set scroll-behaviour to smooth here */
}
.listing-page {
    padding-top: 140px !important;
}
</style>