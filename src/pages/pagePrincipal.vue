<template>
  <div class="container-fluid">
    <Principal style="background-color: rgb(230, 230, 230); 
 display: flex; flex-direction: column; justify-content: space-between; height: 100vh; overflow: auto;"></Principal>
  </div>
</template>

<script>
import Principal from "../components/compPrincipal.vue";
export default {
  name: "pagePrincipal",
  components: {
    Principal,
  },
};
</script>

<style>
</style>