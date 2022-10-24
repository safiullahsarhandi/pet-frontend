import VueProgressBar from "@aacassandra/vue3-progressbar";

export default defineNuxtPlugin((nuxtApp) => {

        const options = {
        color: "#bffaf3",
        failedColor: "#874b4b",
        thickness: "5px",
        transition: {
            speed: "0.2s",
            opacity: "0.6s",
            termination: 300,
        },
        autoRevert: true,
        location: "left",
        inverse: false,
        };

        nuxtApp.vueApp.use(VueProgressBar, options);
});
