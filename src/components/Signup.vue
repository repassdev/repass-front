<template>
  <div>
    <v-container fluid grid-list-xs>
      <v-layout row justify-center>
        <v-flex md8 sm10 xs12>
          <v-form>
            <v-container
                class="pa-0"
                style="background-color:#ffffff;border-top: 1px solid rgb(212,251,232);
            border-left: 1px solid rgb(212,251,232);
            border-right: 1px solid rgb(212,251,232);"
              >
              <div class="py-4">
              <v-layout class="display-1" row justify-center>
                <div>
                  <span>Re</span>
                  <span class="font-weight-light">pass</span>
                </div>
              </v-layout>
              <v-layout class="headline" row justify-center>
                <span class="font-weight-light">Registrar</span>
              </v-layout>
              </div>
            </v-container>
            <v-stepper v-model="e1" style="border-bottom: 1px solid rgb(212,251,232);
            border-left: 1px solid rgb(212,251,232);
            border-right: 1px solid rgb(212,251,232);" class="elevation-0">
              <v-stepper-header class="elevation-0">
                <v-stepper-step color="#ae69f0" :complete="e1 > 1" step="1">Informações basicas</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step color="#ae69f0" :complete="e1 > 2" step="2">Endereço</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step color="#ae69f0" step="3">Informações finais</v-stepper-step>
              </v-stepper-header>

              <v-stepper-items>
                <v-stepper-content step="1">
                  <v-text-field
                    v-model="name"
                    label="Nome"
                    background-color="#69f0ae"
                    color="#69f0ae"
                    :rules="[rules.requiredName]"
                    outline
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="email"
                    label="Email"
                    background-color="#69f0ae"
                    color="#69f0ae"
                    :rules="[rules.requiredEmail, rules.email]"
                    outline
                    required
                    :error="errorD"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    background-color="#69f0ae"
                    color="#69f0ae"
                    label="Senha"
                    :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                    :type="showPassword ? 'text' : 'password'"
                    :rules="[rules.requiredPassword, rules.counterMin]"
                    @click:append="showPassword = !showPassword"
                    loading
                    outline
                    :error="errorD"
                  >
                    <v-progress-linear slot="progress" :value="progress" :color="color" height="2"></v-progress-linear>
                  </v-text-field>
                  <v-card-actions class="pb-2">
                    <v-spacer></v-spacer>
                    <v-btn depressed large color="#ae69f0" dark @click="e1 = 2">Continuar</v-btn>
                  </v-card-actions>
                </v-stepper-content>

                <v-stepper-content step="2">
                  <v-select
                    v-model="addressCountry"
                    :items="countrys"
                    label="País"
                    background-color="#69f0ae"
                    color="#69f0ae"
                    outline
                    :error="errorD"
                  ></v-select>
                  <v-select
                    v-model="addressState"
                    :items="states"
                    label="Estado"
                    background-color="#69f0ae"
                    color="#69f0ae"
                    outline
                    :error="errorD"
                  ></v-select>
                  <v-text-field
                    v-model="addressCity"
                    label="Cidade"
                    background-color="#69f0ae"
                    color="#69f0ae"
                    outline
                    required
                    :error="errorD"
                  ></v-text-field>
                  <v-text-field
                    v-model="addressStreet"
                    label="Rua"
                    background-color="#69f0ae"
                    color="#69f0ae"
                    outline
                    required
                    :error="errorD"
                  ></v-text-field>
                  <v-text-field
                    v-model="addressNumber"
                    label="Numero"
                    background-color="#69f0ae"
                    color="#69f0ae"
                    type="number"
                    outline
                    required
                    :error="errorD"
                  ></v-text-field>
                  <v-card-actions class="pb-2">
                    <v-spacer></v-spacer>
                    <v-btn depressed large flat color="#ae69f0" dark @click="e1 = 1">Voltar</v-btn>
                    <v-btn depressed large color="#ae69f0" dark @click="e1 = 3">Continuar</v-btn>
                  </v-card-actions>
                </v-stepper-content>

                <v-stepper-content step="3">
                  <v-text-field
                    v-model="cpf"
                    label="CPF"
                    background-color="#69f0ae"
                    color="#69f0ae"
                    outline
                    required
                    :error="errorD"
                  ></v-text-field>
                  <v-text-field
                    v-model="phone"
                    label="Telefone"
                    background-color="#69f0ae"
                    color="#69f0ae"
                    outline
                    required
                    :error="errorD"
                  ></v-text-field>
                  <v-card-actions class="pb-1">
                    <v-spacer></v-spacer>
                    <v-btn depressed large flat color="#ae69f0" dark @click="e1 = 2">Voltar</v-btn>
                    <v-btn depressed large color="#ae69f0" dark  @click="onSubmit">Enviar</v-btn>
                  </v-card-actions>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
    <v-snackbar v-model="errorD" :timeout="5000" bottom>
      <span>Dados incompletos.</span>
      <v-btn color="#a457ee" flat @click="errorD = false">Fechar</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import UserService from "@/services/UserService";

export default {
  data: () => ({
    showPassword: false,
    name: "",
    email: "",
    password: "",
    addressCountry: "",
    addressState: "",
    addressCity: "",
    addressStreet: "",
    addressNumber: 1,
    cpf: "",
    phone: "",
    errorD: false,
    e1: 0,
    countrys: ["Brasil"],
    states: ["SP"],
    rules: {
      requiredName: value => !!value || "Digite seu nome.",
      requiredEmail: value => !!value || "Digite seu email.",
      requiredPassword: value => !!value || "Digite uma senha.",
      counterMin: value => value.length >= 8 || "Minimo de 8 caracteres.",
      counterMax: value => value.length <= 20 || "Maximo de 20 caracteres.",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Email invalido.";
      }
    }
  }),
  computed: {
    progress() {
      return Math.min(100, this.password.length * 12.5);
    },
    color() {
      return ["error", "warning", "success"][Math.floor(this.progress / 50)];
    }
  },
  methods: {
    onSubmit: function() {
      UserService.signup({ name: this.name, email: this.email, password: this.password,
        addressCountry: this.addressCountry, addressState: this.addressState,
        addressCity: this.addressCity, addressStreet: this.addressStreet,
        addressNumber: this.addressNumber, cpf: this.cpf, phone: this.phone })
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
.v-input .v-progress-linear {
  top: 100%;
}
.v-card__actions {
  padding: 0px;
}
.v-stepper {
    box-shadow: 0px !important;
}
</style>
