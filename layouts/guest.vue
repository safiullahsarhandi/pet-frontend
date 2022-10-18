<script setup>
  provide('layout','meta');
  definePageMeta({
    middleware: ["guest"]
  });
</script>

<template>
    <navbar/>
    <slot></slot>
    <Footer/>
</template>