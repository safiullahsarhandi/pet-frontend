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
        />
    </client-only>
  </NuxtLayout>
</template>
<script setup>
import event from "~~/utils/event";

const confirmPopupParams = ref({
  visibility: false,
});
const handler = (callback) => {
  confirmPopupParams.value[callback]();
  confirmPopupParams.value.visibility = false;
};

const showConfirmPopupHandler = (event) => {
  confirmPopupParams.value = event.detail;
};

onBeforeMount(() => {
  // subscribing custom event
  event.subscribe("showConfirmPopup", showConfirmPopupHandler);
});
const route = useRoute();
const title = ref("My App");
const description = ref("My amazing Nuxt app");
const nuxtApp = useNuxtApp();

nuxtApp.hook("render:html", () => {
  console.log("page:finish");
  window.scrollTo(0, 0);
});
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
</style>