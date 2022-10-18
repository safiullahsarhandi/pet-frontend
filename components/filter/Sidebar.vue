<template>
  <div class="filter-box shadow h-100 rounded-10">
    <div class="filter-title">
      <h4 class="text-white mb-0">Filters</h4>
    </div>
    <div class="filter-feilds">
        <div :key="filterIndex" v-for="(filter,filterIndex) in filters" class="form-group">
          <label for="petCategory"> {{filter?.label}} </label>
          <select
            name="pet-category"
            id="petCategory"
            @change="emit('on-change', { [filter.key]: $event.target.value })"
            class="form-control rounded-pill"
          >
            <option value="">{{ filter.placeholder }}</option>
            <option :key="optIndex"
                v-for="(option, optIndex) in filter?.options"
                :value="option?.key"
              >
                {{ option?.label }}
            </option>
          </select>
        </div>
        <!-- advance filter box  -->
        <div v-show="!!showAdvanced">
            <template  :key="filterIndex2" v-for="(advancefilters,filterIndex2) in advancedFilters">
                <div class="filter-label border-top">
                  <h5 class="mb-0">{{advancefilters?.label}}</h5>
                </div>
                <div  :key="filterIndex" v-for="(filter,filterIndex) in advancefilters.filters"  class="form-group">
                  <label :for="`filter${filterIndex}`"> {{filter?.label}} </label>
                      <template  v-if="filter.multiple">
                          <div :key="optIndex" v-for="(option, optIndex) in filter?.options" class="form-check">
                            <input v-model="filteredData[filter.key]" :value="option.key" @change="emit('on-change', { [filter.key]:  [...filteredData[filter.key]]})" class="form-check-input" type="checkbox" :id="`${filter.key}${optIndex}`">
                            <label class="form-check-label" :for="`${filter.key}${optIndex}`">
                              {{option?.label}}
                            </label>
                          </div>
                        </template>
                        <select
                            v-else
                            name="pet-category"
                            :for="`filter${filterIndex}`"
                            @change="emit('on-change', { [filter.key]: $event.target.value })"
                            class="form-control rounded-pill"
                        >
                            <option value="">{{ filter.placeholder }}</option>
                            <option :key="optIndex"
                                v-for="(option, optIndex) in filter?.options"
                                :value="option?.key"
                            >
                                {{ option?.label }}
                            </option>
                        </select>
                </div>
            </template>
          <!-- add type  -->
        </div>
        <button
            @click="showAdvanced = !showAdvanced"
          class="advanceFilter border-0 bg-white text-theme-primary"
          type="button"
        >
          <i :class="{'fa-plus-circle': (!showAdvanced),'fa-minus-circle' : showAdvanced}" class="fa pr-2"></i>Advance Filter
        </button>
    </div>
  </div>
</template>
<script setup>
const showAdvanced = ref(false);
const filteredData = ref({
  
});
const props = defineProps({
    filters : {
        type : Array,
        default : ()=> ([]),
    },
    advancedFilters : {
        type : Array,
        default : ()=> ([]),
        
    },
});
const emit = defineEmits(["on-change"]);

watch(()=> props.filters,(value)=> {
  let keys = {};
  value.forEach((item)=> {
    keys[item.key] = (!item.multiple)? null: [];
  });
  filteredData.value = {...filteredData.value,...keys};
},{deep : true,});
watch(()=> props.advancedFilters,(value)=> {
  let keys = {};
  
  value?.flatMap((item)=> item.filters).forEach((item)=> {
    keys[item.key] = (!item.multiple)? null: [];
  });
  filteredData.value = {...filteredData.value,...keys};
},{deep : true,});


</script>