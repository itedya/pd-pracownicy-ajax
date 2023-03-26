<script setup>
import ErrorModal from "./components/ErrorModal.vue";
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <navbar></navbar>
  <router-view></router-view>
  <ErrorModal />
</template>
