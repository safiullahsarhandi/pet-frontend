<template>
  <div class="filter-box shadow rounded-10 py-3">
    <div class="bg-white filter-title py-0">
      <h4 v-if="title" class="mb-0">{{title}}</h4>
    </div>
    <div class="filter-feilds">
      <ul
        class="
          navbar-nav
          align-items-center
          avatar-box
          flex-md-nowrap flex-md-row
          gap-15
        "
      >
        <li class="nav-item position-relative">
          <a href="#" class="avatar-image image-size-adjust">
            <img
              :src="owner?.file?.file_url"
              alt="Avatar"
              class="mw-100"
              draggable="false"
            />
          </a>
          <span class="user-status"></span>
        </li>
        <li class="nav-item">
          <div class="d-flex align-items-center">
            <div class="owner-name">
              <p class="mb-0">{{ owner?.name }}</p>
            </div>
            <div class="icon-boxs pl-2">
              <img
                src="/assets/images/trust.png"
                alt="Trust"
                draggable="false"
                class="mw-100"
              />
            </div>
          </div>
        </li>
      </ul>
      <ul class="left-info">
        <!-- {{data?.owner}} -->
        <li v-if="owner?.phone_number" class="nav-item icon-red">
          <a :href="`tel:${owner?.phone_number}`"
            ><i class="fa fa-phone"></i>{{ owner?.phone_number }}</a
          >
        </li>
        <li v-if="owner?.email" class="nav-item icon-blue">
          <a :href="`mailto:${owner?.email}`"
            ><i class="fa fa-envelope"></i>{{ owner?.email }}</a
          >
        </li>
        <slot></slot>
      </ul>
      <div class="viewPin text-center mt-5">
        <button class="secondary-theme-button shadow btn bg-brown py-2">
          View Pin Location
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
    owner : {
        type : Object,
        default : ()=> ({}),
    },
    title : {
        type : String,
        default : 'Owner Details',
    }
});
</script>