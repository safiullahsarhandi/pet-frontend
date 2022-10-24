import VueGoogleMaps from '@fawmi/vue-google-maps'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueGoogleMaps, {
        load: {
            key: 'AIzaSyCyDamIuNTXON7fh1TMdf5ik2J0bfQdrdo',
            libraries: "places",
        },
    })
});
