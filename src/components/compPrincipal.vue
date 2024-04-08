<template>
  <div class="row">    
    <div class="col-12 inputs">
      <b-form-group class="col-12 mt-2">
        <label class="mb-2">EAN</label>
        <b-form-input
        ref="inputDados"
        type="number"
        v-model="novoDado"
        placeholder="Ean"
        @keyup.enter="adicionarEan(novoDado)"
        @keydown.tab.prevent="adicionarEan(novoDado)"
        ></b-form-input>
        <div class="barra col-12 mt-2">
          <b-table a s
          class="tbAlterada"
          striped
          hover
          :items="itensTable"
          ></b-table>
          <b-alert ref="alerta" :variant="variante" fade :show="showAlert">{{ mensagemResult }}</b-alert>
        </div>
      </b-form-group>
    </div>

    <div class="mb-0">
    </div>
    
    <div class="d-flex justify-content-center mb-2">
      <b-form-input v-model="email" placeholder="Digite o Email"></b-form-input>
      <b-button variant="success" @click="exportar()">Enviar</b-button>
    </div>
  </div>
</template>

<script>
import store from "@/config/store";
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      novoDado: "",
      variante:'',
      showAlert: false, 
      mensagemResult:'',
      mostrarAlert:false
    };
  },
  created() {
    this.selectDb();
  },
  mounted() {
    this.$refs.inputDados.focus();
  },
  beforeDestroy() {
    this.$refs.inputDados.removeEventListener("keydown", this.handleKeyDown);
  },
  methods: {
    adicionarEan(dado) {
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
      try {
        localStorage.setItem(
          store.lstDados[0].Documento + " - " + store.lstDados[0].Contagem,
          JSON.stringify(store.lstDados)
        );
      } catch (e) {
        console.error("Erro ao salvar o item no localStorage:", e);
      }
    },

    async exportar() {
      if (this.email !== "") {
        let arquivo = store.lstDados
          .map((obj) => Object.values(obj).join(";"))
          .join("\n");

        const blob = new Blob([arquivo], { type: "text/plain" });
        const file = new File([blob], store.lstDados[0].Documento + ".txt", {
          type: "text/plain",
        });

        const formData = new FormData();
        formData.append("destinatario", this.email);
        formData.append(
          "assunto",
          "Email referente ao Apontamento:" + store.lstDados[0].Documento
        );
        formData.append(
          "mensagem",
          "Segue email referente ao Documento de inventario " +
            store.lstDados[0].Documento +
            ", Contagem " +
            store.lstDados[0].Contagem
        );
        formData.append("file", file);

        await axios.post("http://10.10.2.151:3000/sendEmail", formData).then((response) => {

          this.showMensagem("Sucesso");
          
          setTimeout(() => {    
            localStorage.removeItem(store.lstDados[0].Documento + " - " + store.lstDados[0].Contagem);
            this.$router.push({ path: "/" });
            console.log(response)        
          }, 5000);
        })
          .catch((error) => {
            if (error.response && error.response.data) {
              this.showMensagem("erro");              
            }
            else if (error.message)
            {
              this.showMensagem("erro");              
            }
          });
      }
      else {
        this.showMensagem("erro");        
      }
    },
    
    showMensagem(req) {
      if(req === "Sucesso")
      {
        this.mensagemResult = ' Email enviado com sucesso!',
        this.variante = 'success';
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false; 
        }, 5000); 
      }
      else if(req === "erro")
      {
        this.mensagemResult = 'Erro ao tentar enviar o email.',
        this.showAlert = true;
        this.variante = 'danger'
        setTimeout(() => {
          this.showAlert = false; 
        }, 5000); 
      }         
    },

    selectDb() {
      if (store.lstDados.length > 0) {
        this.itensTable = store.lstDados.map((user) => ({
          EAN: user.EAN,
          Quantidade: user.Quantidade,
        }));
      }
    },
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
  overflow-y: auto;
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
