<template>
  <div>
    <v-container fluid grid-list-xs>
      <v-layout row justify-center>
        <v-flex md8 sm10 xs12>
          <v-form>
            <v-container
              class="pa-0"
              style="background-color:#ffffff;border: 1px solid rgb(212,251,232);"
            >
              <div class="pt-4">
                <v-layout class="display-1" row justify-center>
                  <div>
                    <span>Re</span>
                    <span class="font-weight-light">pass</span>
                  </div>
                </v-layout>
                <v-layout class="headline" row justify-center>
                  <span class="font-weight-light">Adicionar Evento</span>
                </v-layout>
              </div>
              <v-container>
                <v-layout>
                  <v-text-field
                    v-model="name"
                    label="Nome"
                    background-color="#69f0ae"
                    color="#69f0ae"
                    outline
                    required
                    :error="errorD"
                  ></v-text-field>
                </v-layout>
                <v-layout>
                  <v-text-field
                    v-model="place"
                    label="Local"
                    background-color="#69f0ae"
                    color="#69f0ae"
                    outline
                    required
                    :error="errorD"
                  ></v-text-field>
                </v-layout>
                <v-layout>
                  <v-text-field
                    v-model="image"
                    label="Imagem"
                    background-color="#69f0ae"
                    color="#69f0ae"
                    outline
                    required
                    :error="errorD"
                  ></v-text-field>
                </v-layout>
                <v-card-actions class="pb-1">
                  <v-spacer></v-spacer>
                  <v-btn depressed large color="#ae69f0" dark @click="onSubmit">Enviar</v-btn>
                </v-card-actions>
              </v-container>
            </v-container>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
    <v-snackbar v-model="errorD" :timeout="5000" bottom>
      <span>Dados incorretos.</span>
      <v-btn color="#a457ee" flat @click="errorD = false">Fechar</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import EventService from "@/services/EventService";

export default {
  data: () => ({
    name: "",
    place: "",
    image: "",
    errorD: false
  }),
  methods: {
    onSubmit: function() {
      EventService.postEvent({ name: this.name, place: this.place, image: this.image }, localStorage.getItem("jwt"))
        .then(res => {
          alert(res.data);
            if (this.$route.params.nextUrl != null) {
              this.$router.push(this.$route.params.nextUrl);
            } else {
              this.$router.push('/');
            }
        })
        .catch(() => {
          this.errorD = true;
        });
    }
  }
};
</script>

<style scoped>
.v-card__actions {
  padding: 0px;
}
</style>
