// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    /* loading : {

    }, */
    routeRules: {
        '/api/**': { cors: true },
    },
    runtimeConfig : {
        public: {
            api_url: process.env.API_URL
        },
    },
    app : {        
        buildAssetsDir : "/_nuxt/",
    },
    css : [
        'vue-toastification/dist/index.css',
        'vue3-tel-input/dist/vue3-tel-input.css',
        'vue3-carousel/dist/carousel.css',
        '~/assets/style.scss',
        'vue3-simple-typeahead/dist/vue3-simple-typeahead.css',
    ],
    modules : [
        '@pinia/nuxt',
    ],
    build : { 
        transpile: ['vue-toastification','vue3-tel-input']
    },
    vite: {
        optimizeDeps: {
            include: [
                "@fawmi/vue-google-maps",
                "fast-deep-equal",
                'vue3-tel-input',
              ],
        }
    }
})
