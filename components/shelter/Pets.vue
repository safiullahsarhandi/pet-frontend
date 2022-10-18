<template>

    <section class="privateOwner">
        <div class="container">
            <div class="row">
                <div class="col-md-3">
                    <filter-sidebar @on-change="setFilter" :advanced-filters="advanceFilters" :filters="filters"></filter-sidebar>
                </div>
                <div class="col-md-9">
                    <filter-vertical></filter-vertical>
                    <div class="listing-box my-3">
                        <div class="row">
                            <div :key="petIndex" v-for="(pet,petIndex) in data.data" class="col-md-4">
                                <ad-card 
                                @on-wishlist="toggleWishlist(pet?.id,petIndex)"
                                :is-wishlist="pet?.is_wishlist"
                                :is-featured="pet?.is_featured"
                                :image="pet?.file?.file_url"
                                :name="pet?.name"
                                :address="pet?.owner?.address"
                                :status="getStatus(pet?.status)"
                                :price="pet?.type == 'purchase'?pet?.payable_cost:''"
                                :owner-name="pet?.owner?.name"
                                :route="{name : 'pets-pettype-detail-id',params : {pettype : pet?.type, id : pet?.id } }"
                                />
                            </div>
                        </div>
                    </div>
                   <layout-pagination :show-detail="true" :data="data" />
                </div>
            </div>
        </div>
    </section>
    </template>
    <script setup>
    import { category,gender,breed,ages,groups, tempraments as tempramentsFilter, trainings as trainingsFilter } from '~~/content/filters';
    import { getGeneralData } from '~~/services/general';
    import { getPets } from '~~/services/pet';
    import { useCategoryStore } from '~~/stores/category';
    const {shelter} = defineProps({
        shelter : {
            type  : Object,
            default : ()=> ({}),
        }
    });

    const store = useCategoryStore();
    const route = useRoute();
    let type = 'purchase';
    const {fetch,data} = useApi((page = 1)=> getPets({page,type,owner : shelter?.id,...filterValues.value}));
    const {fetch: fetchGeneralData,data : general} = useApi(()=> getGeneralData());
    const {toggleWishlist} = useWishlist(data,'data.*'); 
    const {setFilter,filterValues} =  useTableFilter(fetch);
    const filters = ref([
        category,
        gender,
        breed,    
    ]);
    
    const advanceFilters = ref([
        {
            label : 'Age & Groups',
            filters : [
            ages,
            groups,
            ],
        },
        {
            label : 'Behaviour',
            filters : [
            tempramentsFilter,
            trainingsFilter
            ],
            
        }
    ]);
    watch(store,()=> {
        let options = store.categories.map(elem=> ({key : elem.id,label : elem.name}));
        filters.value[0].options = options;
    },{deep : true,immediate : true,});
    
    
    watch(
        ()=> filterValues.value.category,
        (val)=> {
            let selectedCategory = store.categories.find(elem=> elem.id == val);
            // breedOptions
            let options = selectedCategory?.breed_types?.map(elem=> ({key : elem.id,label : elem.name}));
            filters.value[2].options = options;
    });
    
    
    watch(general,(val)=> {
        // ages
        let agesOptions = val?.ages?.map(elem=> ({key : elem,label : elem == '5+'?'Over 5 years':elem}));
        advanceFilters.value[0].filters[0].options = agesOptions;
        
        // groups
        let groupsOptions = val?.groups?.map(elem=> ({key : elem.id,label : elem.name}));
        advanceFilters.value[0].filters[1].options = groupsOptions;
    
        // tempraments
        advanceFilters.value[1].filters[0].options = tempraments.value;
        advanceFilters.value[1].filters[1].options = trainings.value;
    
        
        
    
    },{deep : true});
    
    
    const tempraments = computed(()=> {
        let filteredValue =  general?.value?.behaviours?.find((item)=> item.name.toLowerCase() == 'temprament');
        return filteredValue.sub_behaviours?.map((item)=> ({key : item.id, label : item.name}));
    });
    
    const trainings = computed(()=> {
        let filteredValue =  general?.value?.behaviours?.find((item)=> item.name.toLowerCase() == 'training');
        return filteredValue.sub_behaviours?.map((item)=> ({key : item.id, label : item.name}));
    });
    
    const getStatus = (status)=> {
        return status == 'active'? 'Available':status;
    };
    onBeforeMount(()=> {
        if(store.categories.length == 0){
            
            store.get({type : ['pet']});
        }
        fetch(1);
        fetchGeneralData();
        // filter.value.options = categoryOptions;
    });
    </script>