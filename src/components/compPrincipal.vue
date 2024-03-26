<template>
  <div class="row">
    <div class="col-12 inputs">
      <b-form-group class="col-12 mt-2" label="EAN">
        <b-form-input ref="inputDados" v-model="novoDado" placeholder="Ean" @keyup.enter="adicionarEan(novoDado)"
         @keydown.tab.prevent="adicionarEan(novoDado)"></b-form-input>
        <div class="barra col-12 mt-2">
          <b-table class="tbAlterada" striped hover :items="itensTable"></b-table>
        </div>
      </b-form-group>
    </div>

    <div class="d-flex justify-content-center">
      <b-button class="mb-2" variant="success" @click="exportar()">Encerrar</b-button>
    </div>
  </div>
</template>

<script>
import store from "@/config/store";
import axios from "axios";

export default {
  data() {
    return {      
      countInput: 0,
      novoDado: "",
    };
  },
  created: function () {
    this.$refs.inputDados.focus();   
   this.selectDb();
  },
  beforeDestroy() {
    this.$refs.inputDados.removeEventListener("keydown", this.handleKeyDown);
  },
  methods: {
    adicionarEan(dado) {
      this.countInput++;
      if (dado.trim() !== "") {
        const index = store.lstDados.findIndex((item) => item.EAN === dado);
        if (index > -1) {
          store.lstDados[index].Quantidade++;
        } else {
          store.lstDados.push({
            Documento: store.state.dados.Documento,
            Contagem: store.state.dados.Contagem,
            Quantidade: 1,
            EAN: dado,
          });
        }
        this.itensTable = store.lstDados.map((user) => ({
          EAN: user.EAN,
          Quantidade: user.Quantidade,
        }));
        this.novoDado = "";
      }
      if (this.countInput == 5) {
        try {
          localStorage.setItem(store.lstDados[0].Documento + " - " + store.lstDados[0].Contagem, JSON.stringify(store.lstDados));
        } catch (e) {
          console.error("Erro ao salvar o item no localStorage:", e);
        }
        this.countInput = 0;
      } 
    },

    exportar() {
      let arquivo = store.lstDados
        .map((obj) => Object.values(obj).join(";"))
        .join("\n");

      const blob = new Blob([arquivo], { type: "text/plain" });
      const file = new File([blob], store.lstDados[0].Documento + ".txt", {
        type: "text/plain",
      });

      const formData = new FormData();
      formData.append("destinatario", "suporte_ti@cmrcia.com.br");
      formData.append("assunto","Email referente ao Apontamento:" + store.lstDados[0].Documento);
      formData.append("mensagem","Segue email referente ao Documento de inventario " + store.lstDados[0].Documento + ", Contagem " + store.lstDados[0].Contagem);
      formData.append("file", file);

      try {
        axios.post("http://10.10.2.151:3000/sendEmail", formData);
        localStorage.removeItem(store.lstDados[0].Documento + " - " + store.lstDados[0].Contagem);
      } catch (error) {
        console.error("Erro ao enviar email:", error);
      }
    },

   selectDb(){
      if(store.lstDados.length > 0){
      this.itensTable = store.lstDados.map((user) => ({
          EAN: user.EAN,
          Quantidade: user.Quantidade,
        }));
    }
    }
  },
};
</script>

<style>
.inputs {
  background-color: rgba(229, 139, 42, 0.9);
  border-radius: 5px;
  display: flex;
}
.barra {
  max-height: 80vh;
  overflow: auto;
}
.tbAlterada > thead > tr > th:nth-child(1) {
  background-color: #363537;
  color: white;
}
.tbAlterada > thead > tr > th:nth-child(2) {
  background-color: #363537;
  color: white;
}
</style>
