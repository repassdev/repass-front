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
                  <span class="font-weight-light">Entrar</span>
                </v-layout>
              </div>
              <v-container>
                <v-layout>
                  <v-text-field
                    v-model="email"
                    label="Email"
                    background-color="#69f0ae"
                    color="#69f0ae"
                    outline
                    required
                    :error="errorD"
                  ></v-text-field>
                </v-layout>
                <v-layout>
                  <v-text-field
                    v-model="password"
                    label="Senha"
                    background-color="#69f0ae"
                    color="#69f0ae"
                    :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                    @input="errorD = false"
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
import UserService from "@/services/UserService";

export default {
  data: () => ({
    showPassword: false,
    email: "",
    password: "",
    errorD: false
  }),
  methods: {
    onSubmit: function() {
      UserService.login({ email: this.email, password: this.password })
        .then(res => {
          localStorage.setItem('user', res.data.user.name);
          localStorage.setItem('jwt', res.data.token);
          if (localStorage.getItem('jwt') != null) {
            this.$emit('loggedIn');
            if (this.$route.params.nextUrl != null) {
              this.$router.push(this.$route.params.nextUrl);
            } else {
              this.$router.push('/');
            }
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
