<template>
    
<shelter-banner :name="data?.name" :image="data?.file?.file_url"/>

<shelter-tabs :shelter="data"/>

<shelter-featured :owner-id='route.params.id'/>

</template>
<script setup>
import { getShelter } from "~~/services/shelter";

const {fetch,data} = useApi(()=> getShelter(route.params.id));
const route = useRoute(); 
onBeforeMount(()=> {
    fetch();
});
</script>