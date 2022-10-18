<template>
  <div class="seachedFilter">
        <div class="row justify-content-between mb-3">
            <div class="col-md-6">
                <div class="form-group d-flex align-items-center gap-15 mb-0 flex-wrap">
                    <label class="flex-shrink-0 mb-md-0">
                        Sort by
                    </label>
                    <input  v-model="fromDate" type="date" class="form-control rounded-pill serachFiled flex-shrink-0">
                    <input v-model="toDate" type="date" class="form-control rounded-pill serachFiled flex-shrink-0">
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <div class="position-relative">
                        <input v-model="searchValue" type="text" placeholder="Search Here...." class="form-control rounded-pill" id="password">
                        <button type="button" class="search-btn text-secondary"><i class="fa fa-search"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  <!-- Filters Starts Here -->
  <!-- <div class="customfilters my-3">
    <div class="d-md-flex align-items-center mb-4">
      <label for="" class="my-2 me-2">Sort By:</label>
      <div class="d-md-flex flex-wrap">
        <div class="mb-2 me-md-2">
          <label for="from" class="d-block">From</label>
          <input v-model="fromDate" id="from" class="inpDate" type="date" />
        </div>
        <div class="mb-2">
          <label for="to" class="d-block">To</label>
          <input v-model="toDate" id="to" class="inpDate" type="date" />
        </div>
      </div>
    </div>
    <div class="d-md-flex align-items-end justify-content-between mb-xl-1">
      <div class="align-items-center d-md-flex justify-content-between">
        <div class="align-items-center d-flex mb-3 me-3">
          <label class="d-inline-block mb-1 me-2">Show</label>
          <select v-model="entries" class="d-inline-block sm-dropdown me-2">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <label class="d-inline-block mb-1 ms-1">Entries</label>
        </div>
        
        <div v-if="primaryFilter?.label" class="align-items-center d-flex mb-3 me-3">
          <label>{{ primaryFilter.label }} &nbsp;</label>
          <select
            @change="
              emit('on-change', { [primaryFilter.key]: $event.target.value })
            "
            id=""
            class="d-inline-block sm-dropdown me-2"
          >
            <option value="">{{ primaryFilter.placeholder }}</option>

            <option
              :key="optIndex"
              v-for="(option, optIndex) in primaryFilter?.options"
              :value="option?.key"
            >
              {{ option?.label }}
            </option>
          </select>
        </div>
      </div>
      <div class="filter_search mb-3">
        <input v-model="searchValue" type="search" placeholder="Search" />
        <i class="fas fa-search searchIcon"></i>
      </div>
    </div>
    <div v-if="filters?.length > 0" class="row">
      <div class="col-xl-8">
        <div class="d-xl-flex align-items-center justify-content-between">
          <div :key="`filter${filterIndex}`" v-for="(filter,filterIndex) in filters" class="align-items-center d-flex mb-3 me-3">
            <label class="d-inline-block mb-1 me-2 flex_shrink_0"
              >{{filter?.label}}</label
            >
            <select @change="emit('on-change',{[filter.key]: $event.target.value})" class="d-inline-block me-2 primSelect w_lg_100">
              <option value="Select">{{filter.placeholder}}</option>
              <option :key="`filterOption${optionIndex}`" v-for="(option,optionIndex) in filter.options" :value="option.id">{{option.name}}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div> -->
  <!-- Filters Ends Here -->
</template>
<script setup>
import { onBeforeMount, ref, watch } from "vue";
const emit = defineEmits(["on-change"]);
const searchValue = ref(null);
const entries = ref(10);
const fromDate = ref(null);
const toDate = ref(null);
const {debounce} = useHelper();

const { primaryFilter } = defineProps({
  primaryFilter: {
    type: Object,
    default: () => ({}),
  },
  filters: {
    type: Array,
    default: () => ([]),
  },
});

// watchers
watch(searchValue, () => {
  handleSearch();
});

watch(entries, () => {
  emit("on-change", { per_page: entries.value });
});

watch(fromDate, () => {
  emit("on-change", { fromDate: fromDate.value });
});

watch(toDate, () => {
  emit("on-change", { toDate: fromDate.value });
});

// end of watchers

// lifecycle hooks
onBeforeMount(() => {
  handleSearch = debounce(handleSearch, 500);
});

let handleSearch = () => {
  emit("on-change", { search: searchValue.value });
};
</script>