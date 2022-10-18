import { defineStore } from 'pinia'
import { getCategories } from '~~/services/category';
// You can name the return value of `defineStore()` anything you want, 
// but it's best to use the name of the store and surround it with `use` 
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useCategoryStore = defineStore('category', ()=> {
  const categories = ref([]);
  const get = async (params = {})=> {
      try {
        let {detail} = await getCategories(params);
        categories.value = detail
    } catch (error) {
        throw error;
    }
  };
  const set = async ()=> {
      categories.value = null;
  };
  return {categories,get,set};
});