<template>
<div class="pagination-bar">
    <div class="d-flex justify-content-between flex-wrap align-items-center">
        <p v-if="showDetail" class="mb-0">Showing {{ data.from || 0 }} to {{ data.to || 0}} of {{ data.total || 0 }} Entries</p>
        <div v-if="data[totalKey] > 0" class="viewAll d-flex justify-content-end flex-wrap py-3">
            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center mb-0">
                    <li v-if="page >  1" class="page-item">
                        <a class="page-link" @click="() => (data[totalKey] > 0 ? updatePage(page - 1) : updatePage(1))">
                                previous
                        </a>
                    </li>
                    <template v-if="data[totalKey] > 1">
                        <li :key="counter" v-for="counter in data[totalKey]" class="page-item" :class="page == (counter)?'active':''">
                            <a className="page-link hover" @click="(e)=> page != (counter)? updatePage(counter): ''">
                                {{counter}}
                            </a>
                        </li>
                    </template>
                    <li v-if="page != data[totalKey]" class="page-item">
                        <a @click="() => (data[totalKey] > 0 ? updatePage(page + 1) : updatePage(1))" class="page-link">
                            Next
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</div>    
</template>
<script setup>
const page = ref(1);
const props = defineProps({ 
    showDetail : {
        type : Boolean,
        default : true,
    },
    data : {
        type : Object,
    }, 
    totalKey : {
        type :  String,
        default : 'last_page',
    }
});
const emit = defineEmits(['change']);

const updatePage = (newValue)=> {
    page.value = newValue;        
    emit('change',newValue)
};

</script>