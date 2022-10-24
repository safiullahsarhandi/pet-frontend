<template>
  <div class="seachedFilter">
    <div class="row justify-content-between">
      <div class="col-md-6"></div>
      <div class="col-md-6">
        <div
          v-if="Object.keys(primaryFilter).length > 0"
          class="
            form-group
            d-flex
            align-items-center
            justify-content-end
            gap-15
            mb-0
          "
        >
          <label class="flex-shrink-0 mb-md-0">
            {{primaryFilter?.label}}
          </label>
          <select v-if="primaryFilter.type != 'field'" @change="emit('on-change', { [primaryFilter.key]: $event.target.value })"
              name="pet-category"
              class="form-control rounded-pill serachFiled flex-shrink-0"
            >
              <option value="">{{ primaryFilter.placeholder }}</option>

              <option :key="optIndex"
                v-for="(option, optIndex) in primaryFilter?.options"
                :value="option?.key"
              >
                {{ option?.label }}
              </option>
            </select>
            <div v-else class="form-group">
                <div class="position-relative">
                    <input type="text" :placeholder="primaryFilter.placeholder" class="form-control rounded-pill" v-bind="primaryFilter?.attrs" id="password">
                    <button type="button" class="search-btn text-secondary"><i :class="primaryFilter.icon"></i></button>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
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
const emit = defineEmits(["on-change"]);
</script>