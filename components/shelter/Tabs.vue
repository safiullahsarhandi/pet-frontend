<template>
  <section class="privateOwner">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <ul class="nav nav-tabs border-0" id="myTab" role="tablist">
            <li class="nav-item">
              <a
                class="nav-link"
                id="shelter-tab"
                :class="{active : (tab == 'about')}"
                @click="tab = 'about'"
                href="javascript:void(0)"
                >About Shelter</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{active : (tab == 'pet')}"
                @click="tab = 'pet'"
                href="javascript:void(0)"
                >View Pets</a
              >
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
                <component :shelter="shelter" :is="selectedTab[tab]"></component>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>

const tab = ref('about');
const selectedTab = {
    about : resolveComponent('shelterAbout'),    
    pet : resolveComponent('shelterPets'),
} 
const props = defineProps({
    shelter : {
        type  : Object,
        default : ()=> ({}),
    }
});
</script>