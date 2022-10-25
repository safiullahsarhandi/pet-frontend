<template>
    <div class="autocomplete">
        <input autocomplete="off" @input="onInput" v-model="selectedValue" id="myInput" type="text" :placeholder="placeholder" v-bind="$attrs">
        <div v-if="showItems" id="myInputautocomplete-list" class="autocomplete-items">
            <div :key="itemIndex" @click="onSelectItem(itemIndex)" v-for="(item,itemIndex) in items">{{item[labelKey]}}</div>
        </div>
    </div>
</template>
<style scoped>
* { box-sizing: border-box; }
.autocomplete {
  /*the container must be positioned relative:*/
  position: relative;
  display: inline-block;
}
input {
  border: 1px solid transparent;
}
input[type=text] {
  width: 100%;
}
input[type=submit] {
  background-color: DodgerBlue;
  color: #fff;
}
.autocomplete-items {
  position: absolute;
  border: 1px solid #d4d4d4;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  /*position the autocomplete items to be the same width as the container:*/
  top: 100%;
  left: 0;
  right: 0;
}
.autocomplete-items div {
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 1px solid #d4d4d4;
}
.autocomplete-items div:hover {
  /*when hovering an item:*/
  background-color: #e9e9e9;
}
.autocomplete-active {
  /*when navigating through the items using the arrow keys:*/
  background-color: DodgerBlue !important;
  color: #ffffff;
}
</style>
<script setup>
import lodash from 'lodash';
const emit = defineEmits(['input','on-selected']);
const props =  defineProps({
        items : {
            type : [Array,Object],
            default : ()=> ([]),
        },
        placeholder : {
            type : String,
            default : null,
        },
        labelKey : {
            type : String,
            default : 'name',
        },
        valueKey : {
            type : String,
            default : null,
        },
        delay : {
            type : Number,
            default : 1000,
        }
});
const selectedIndex = ref(null);
const selectedValue = ref(null);
const showItems = ref(false);
/*the autocomplete function takes two arguments,
the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  let onInput = (e)=>  {
      showItems.value = true;
      emit('input',e.target.value);
  };
  
// function to add some delay
function debounce(func, timeout = 300){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}
/*execute a function when someone clicks in the document:*/

const onSelectItem = (index)=> {
    let { valueKey, items,labelKey } = props;
    let value = ( valueKey )? 
                items[index][valueKey]:
                items[index]; 
    
        value = JSON.parse(JSON.stringify(value)); 
        selectedIndex.value = index;
        showItems.value = false;
        selectedValue.value =  items[index][labelKey]; 
    emit('on-selected',{ index , value });
};

onBeforeMount(()=> {
    onInput = lodash.debounce(onInput,100000);
});
</script>