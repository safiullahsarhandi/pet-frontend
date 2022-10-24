<template>
    <div class="filterPet">
        <Form :validation-schema="schema" :initial-values="initialData" ref="form" @submit="onSubmit">
            <div class="d-flex justify-content-between align-items-center">
            <div class="flex-md-shrink-0">
                <div class="form-group mb-0">
                    <layout-auto-complete 
                    label-key="raw_name"
                    @input="fetch"
                    @on-selected="onSelectItem" 
                    :items="data"  
                    class="f-14 form-control border-0 rounded-0" 
                    placeholder="Enter City, State Or Country"
                    />
                </div>
            </div>
            <div class="flex-md-shrink-0">
                <div class="form-group mb-0">
                <Field
                    as="select"
                    name="category_id"
                    class="f-14 form-control border-0 rounded-0"
                >
                    <option value="">Select Pet Type</option>
                    <option :key="index" v-for="(category,index) in categories" :value="category?.id">{{category?.name}}</option>
                </Field>
                <!-- <input
                    type="text"
                    placeholder="Search Cat, Dog etc"
                    name="search"
                    class="f-14 form-control border-0 rounded-0"
                /> -->
                </div>
            </div>
            <div class="flex-md-shrink-0">
                <div class="form-group mb-0">
                <Field
                    as="select"
                    name="type"
                    class="f-14 form-control border-0 rounded-0"
                >
                    <option value="adoption">Adopt a Pet</option>
                    <option value="purchase">Purchase a Pet</option>
                </Field>
                </div>
            </div>
            <div class="flex-md-shrink-0">
                <div class="form-group mb-0">
                <button
                    class="bg-theme-primary border-0 rounded-pill text-white"
                >
                    <i class="fa fa-search"></i>
                </button>
                </div>
            </div>
            </div>
        </Form>
    </div>
</template>
<script setup>
import { Form,Field } from "vee-validate";
import { useCategoryStore } from "~~/stores/category";
import { getLocations } from '~~/services/general';
import * as yup from 'yup';
const initialData = {
    type : 'adoption',
    category_id : '',  
    country_id : '',
    state_id : '',
    city_id : '',
    
};
const schema = yup.object({
        type : yup.string().required(),
        category_id : yup.string().required(),
        country_id : yup.string().required(),
        state_id : yup.string().required(), 
        city_id : yup.string().required(), 
});
const form = ref(null);
const items = ref({});
const store = useCategoryStore();
const categories = computed(()=> store.categories);
const {fetch,data} = useApi((search)=> ( (search != 1 )?getLocations({search}):''));

const onSelectItem = (value)=> {
    let {country_id,state_id,id : city_id}  = value.value;
    items.value = {country_id,state_id,city_id };
    form.value.setFieldValue('country_id',country_id);
    form.value.setFieldValue('state_id',state_id);
    form.value.setFieldValue('city_id',city_id);
    /* {country_id,
        state_id,
        city_id
    } */

};
const onSubmit = (values)=> {
    navigateTo({
        name : 'pets-type',
        params : { type : values.type },
        query : {
            ...values,
            ...items.value,
        }
    });
};
</script>