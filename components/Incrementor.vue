<template>
  <div class="input-group-field rounded-arrow shadow">
    <button
      type="button"
      @click="updateValue('Decrement')"
      class="quantity-left-minus btn btn-number"
      data-type="minus"
      data-field=""
    >
      <span class="fa fa-minus"></span>
    </button>
    <input
      type="number"
      id="quantity"
      name="quantity"
      class="form-control-field input-number-field"
      v-model.number="value"
      @input="emit('input',$event.target.value)"
      min="1"
      max="100"
    />
    <button
      @click="updateValue('Increment')"
      type="button"
      class="quantity-right-plus btn btn-number"
      data-type="plus"
      data-field=""
    >
      <span class="fa fa-plus"></span>
    </button>
  </div>
</template>
<script setup>
const emit = defineEmits(['update:modelValue','input']);
const props = defineProps({
    modelValue : {
        type : [Number,String],
        default : 1,
    }
}); 
const value = ref(1);
const updateValue = (type)=> {
    let newValue = type == 'Increment'?parseInt(value.value) + 1 : parseInt(value.value) - 1;
    if(newValue < 0){
        value.value = 1;
    }else{
        value.value = newValue;
    }
    emit('update:modelValue',newValue);
    emit('input',newValue);
    
  
  };

onBeforeMount(()=> {
    value.value = props.modelValue;
});

watch(value,(val)=> {
    emit('update:modelValue',val);
});
</script>