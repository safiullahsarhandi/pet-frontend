import { useUserStore } from '@/stores/user'
const publicRoutes = ['login','register','password-recovery-code-verify','password-recovery-email-verify','password-recovery-password'];
export default defineNuxtRouteMiddleware((to, from) => {
    if(process.client){
        const {getAccessToken} = useHelper();
        // if login
        if(getAccessToken()){
            const index = publicRoutes.findIndex((item)=> item == to.name);
            const store = useUserStore();
            if(!store.user){
                Promise.all([
                    store.get(),
                ]);
            }             
                
            if(index >= 0){
                return navigateTo('/');
            }
        }
    }
})
