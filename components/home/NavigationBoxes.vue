<template>
    <div class="row justify-content-center align-items-center">
        <div
            :key="categoryIndex"
            v-for="(category, categoryIndex) in petsCategories"
            class="col-md-2"
        >
            <div class="categories-box bg-blue text-center">
            <img
                :src="category?.file?.file_url"
                :alt="category?.name"
                class="mw-100"
                draggable="false"
            />
            <p class="mb-0">
                <nuxt-link
                :to="{
                    name: 'pets-type',
                    params: { type: 'purchase' },
                    query: { category: category?.id },
                }"
                class="text-dark"
                >{{ category?.name }}</nuxt-link
                >
            </p>
            </div>
        </div>
        <div data-toggle="modal" data-target="#otherAnimal" class="col-md-2">
            <div class="categories-box bg-greaish text-center">
            <img
                src="/assets/images/owl.png"
                alt="Owl"
                class="mw-100"
                draggable="false"
            />
            <p class="mb-0">
                <a href="javascript:void(0)" class="text-dark">Other Animals</a>
            </p>
            </div>
        </div>
        <div class="col-md-2">
            <div class="categories-box bg-green text-center">
            <img
                src="/assets/images/dog-house.png"
                alt="Dog House"
                class="mw-100"
                draggable="false"
            />
            <p class="mb-0">
                <nuxt-link :to="{ name: 'shelters' }" class="text-dark"
                >Shelters</nuxt-link
                >
            </p>
            </div>
        </div>
        <div class="col-md-2">
            <div class="categories-box bg-purple text-center">
            <img
                src="/assets/images/shops.png"
                alt="Shop"
                class="mw-100"
                draggable="false"
            />
            <p class="mb-0">
                <nuxt-link :to="{ name: 'shops' }" class="text-dark">Shop</nuxt-link>
            </p>
            </div>
        </div>
        <home-other-animal :categories="otherPetsCategories"/>
    </div>
</template>
<script setup>
import { useCategoryStore } from '~~/stores/category';

const store = useCategoryStore();

const categories = computed(()=> store.categories);
onBeforeMount(()=> {
    if(store.categories.length == 0){
        store.get({type : ['pet','other_pet']});
    }
});
const petsCategories = computed(()=> categories.value.filter((item)=> item.type === 'pet'));
const otherPetsCategories = computed(()=> categories.value.filter((item)=> item.type === 'other_pet'));
</script>