<template>
  <div class="row d-flex justify-content-center align-items-center vh-100">
    <b-card class="w-auto acesso">
      <b-form-group label="Documento">
        <b-form-input
          v-model="inicio.Documento"
          cols="2"
          placeholder="Documento"
        ></b-form-input>
      </b-form-group>

      <b-form-group class="mt-2" label="Contagem">
        <b-form-input
          v-model="inicio.Contagem"
          cols="2"
          placeholder="Contagem"
        ></b-form-input>
      </b-form-group>

      <div class="d-flex justify-content-center">
        <b-button class="mt-3" variant="success" @click="entrar()"
          >Entrar</b-button
        >
      </div>
    </b-card>
  </div>
</template>

<script>
import store from "@/config/store";
export default {
  name: "telaHome",
  data() {
    return {
      inicio: [],
    };
  },

  methods: {
    entrar() {
      try {
        const tarefas = localStorage.getItem(this.inicio.Documento + " - " + this.inicio.Contagem);
        const dadosRecuperados = tarefas ? JSON.parse(tarefas) : [];
        store.lstDados = dadosRecuperados;
      }
      catch (e)
      {
        console.error("Erro ao recuperar os dados do localStorage:", e);
      }
      store.state.dados.Documento = this.inicio.Documento;
      store.state.dados.Contagem = this.inicio.Contagem;
      this.$router.push({ path: "/Principal" });
    },
  },
};
</script>

<style>
.acesso {
  background: rgba(106, 117, 125, 0.9) !important;
  font-family: system-ui;
  font-size: 16px;
}
</style>