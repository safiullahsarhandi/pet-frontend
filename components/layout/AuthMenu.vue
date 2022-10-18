<template>
  <ul class="navbar-nav primary-theme-button align-items-center">
    <li class="nav-item">
      <nuxt-link class="nav-link" :to="{ name: 'login' }">Sign In</nuxt-link>
    </li>
    |
    <li class="nav-item">
      <nuxt-link class="nav-link" :to="{ name: 'register' }">Sign Up</nuxt-link>
    </li>
  </ul>
</template>