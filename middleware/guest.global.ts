import { useUserStore } from '@/stores/user'
import { useCartStore } from '~~/stores/cart';
const publicRoutes = ['login','register','password-recovery-code-verify','password-recovery-email-verify','password-recovery-password'];
const userAllowedRoutes = ['index','about','pets-type','shops'];

export default defineNuxtRouteMiddleware((to, from) => {
    if(process.client){
        const {getAccessToken} = useHelper();
        // if login
        const index = publicRoutes.findIndex((item)=> item == to.name);
        if(getAccessToken()){
            publicRouteValidation(index);
        };
        if(!getAccessToken()){
            const key = userAllowedRoutes.findIndex((item)=> item == to.name);
            if(index < 0 && key < 0){
                return navigateTo('/login');
            }
        }
    }
})

const publicRouteValidation = (index)=> {
        const router = useRouter();
        const cartStore = useCartStore();
        const store = useUserStore();
        if(!store.user){
            Promise.all([
                store.get(),
            ]);
        }      
        if(cartStore.state?.length == 0){
            Promise.all([
                cartStore.get(),
            ]);
        }
        if(index >= 0){
            let requestedRoute = publicRoutes[index];
            let key = userAllowedRoutes.findIndex((item)=> item === requestedRoute);
            if(key < 0){
                return router.push({name : 'index'});
            }
        }
}; 