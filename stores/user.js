import { defineStore } from 'pinia'
import { getAccount } from '~~/services/account';
// You can name the return value of `defineStore()` anything you want, 
// but it's best to use the name of the store and surround it with `use` 
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useUserStore = defineStore('user', ()=> {
  const user = ref(null);
  const get = async ()=> {
      try {
        let {detail} = await getAccount();
        user.value = detail
    } catch (error) {
        throw error;
    }
  };
  const set = async ()=> {
      user.value = null;
  };
  return {user,get,set};
});