<template>
  <div class="container-fluid tela">
    <div class="">
      <telaHome></telaHome>
    </div>
  </div>
</template>

<script>
import telaHome from "../components/comphome.vue";
export default {
  name: "pageHome",
  components: {
    telaHome,
  },
  data() {
    return {};
  },

  
};
</script>

<style>
.tela {
  background: url(../assets/login.jpg);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
</style>