// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    css : [
        'vue-toast-notification/dist/theme-sugar.css',
        'vue3-tel-input/dist/vue3-tel-input.css',
        'vue3-carousel/dist/carousel.css',
        '~/assets/style.scss',
    ],
    modules : [
        '@pinia/nuxt',
    ],
})
