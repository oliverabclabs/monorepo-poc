<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <LibraryComponent></LibraryComponent>
</template>
<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import axios from "axios";
import LibraryComponent from "@careos/components/LibraryComponent.vue";
axios.get("https://google.com").then((res) => console.log(res));
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
