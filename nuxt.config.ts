// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app : {        
        buildAssetsDir : "/dale-pet-frontend/dist/_nuxt/",
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
        transpile: ['vue-toastification']
    },
    vite: {
        optimizeDeps: {
            include: [
                "@fawmi/vue-google-maps",
                "fast-deep-equal",
              ],
        }
    }
})
