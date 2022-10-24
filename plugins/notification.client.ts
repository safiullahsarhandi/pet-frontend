import Toast,{ POSITION,TYPE } from "vue-toastification";

export default defineNuxtPlugin((nuxtApp) => {

    const options = {
        position: POSITION.TOP_CENTER,        
        // You can set your default options here
        toastDefaults: {
            // ToastOptions object for each type of toast
            [TYPE.ERROR]: {
                timeout: 3000,
            },
            [TYPE.SUCCESS]: {
                timeout: 3000,
                hideProgressBar: true,
            }    
        }
    };

    nuxtApp.vueApp.use(Toast, options);
});
