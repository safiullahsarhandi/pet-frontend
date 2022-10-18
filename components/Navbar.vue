<script setup>
import menuItems from "~~/content/menuItems";
import { useUserStore } from "~~/stores/user";
import ProfileMenu from "./layout/ProfileMenu.vue";
import AuthMenu from "./layout/AuthMenu.vue";
const router = useRouter();
const store = useUserStore();
</script>
<template>
  <header class="position-fixed w-100">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light">
        <nuxt-link class="navbar-brand" :to="{ name: 'index' }">
          <img
            src="/assets/images/logo.png"
            alt="Logo"
            class="mw-100"
            draggable="false"
          />
        </nuxt-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse justify-content-md-around"
          id="navbarNav"
        >
          <ul class="navbar-nav">
            <li
              :key="itemIndex"
              v-for="(item, itemIndex) in menuItems"
              class="nav-item"
            >
              <nuxt-link class="nav-link" :to="item?.route">{{
                item?.label
              }}</nuxt-link>
            </li>
          </ul>
          <auth-menu v-if="!store.user" />
          <profile-menu v-else />
          <ul class="navbar-nav">
            <li class="nav-item">
              <nuxt-link
                class="nav-link secondary-theme-button shadow"
                :to="{name : 'pets-donation-create'}"
                >Donate a Pet</nuxt-link
              >
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped></style>
