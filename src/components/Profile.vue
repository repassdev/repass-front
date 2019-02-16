<template>
  <div>
    <v-container fluid>
      <v-container
        class="pa-0"
        style="background-color:rgba(255,255,255,1);border: 1px solid rgb(212,251,232);"
      >
        <v-layout row wrap>
          <v-flex xs12 sm4>
            <v-img
              src="http://www.placepuppy.net/1600/1600"
              lazy-src="http://www.placepuppy.net/100/100"
              class="grey lighten-2 px-auto"
              style="max-height:420px;"
            >
              <v-layout slot="placeholder"
                fill-height
                align-center
                justify-center
                ma-0>
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </v-layout>
            </v-img>
          </v-flex>
          <v-flex xs12 sm8 text-xs-center text-sm-left>
            <v-container style="height:100%;">
              <v-layout column justify-space-between fill-height>
                <template v-if="user">
                  <div>
                    <h1
                      class="display-1 grey--text text--darken-4"
                      style="border-bottom:2px solid rgb(105,240,174)"
                    >{{ user.name }}</h1>
                  </div>
                </template>
                <template v-else>
                  <div style="border-bottom:2px solid rgb(105,240,174)">
                    <div style="height:34px;width:70%;margin:0.2rem;background-color:#DDDBDD;"></div>
                  </div>
                </template>
                  <div class="mt-2">
                    <template v-if="user">
                      <span class="body-2 grey--text text--darken-4">País:</span>
                      <span class="body-1 grey--text text--darken-4">{{ user.addressCountry }}</span>
                      <v-divider class="my-2"></v-divider>
                      <span class="body-2 grey--text text--darken-4">Cidade:</span>
                      <span class="body-1 grey--text text--darken-4">{{ user.addressCity }}</span>
                      <v-divider class="my-2"></v-divider>
                      <span class="body-2 grey--text text--darken-4">Endereço:</span>
                      <span
                        class="body-1 grey--text text--darken-4"
                      >{{ user.addressStreet }}, n°{{ user.addressNumber }}</span>
                      <v-divider class="my-2"></v-divider>
                      <span class="body-2 grey--text text--darken-4">Telefone:</span>
                      <span class="body-1 grey--text text--darken-4">{{ user.phone }}</span>
                      <v-divider class="my-2"></v-divider>
                      <span class="body-2 grey--text text--darken-4">Email:</span>
                      <span class="body-1 grey--text text--darken-4">{{ user.email }}</span>
                      <v-divider class="my-2"></v-divider>
                      <span class="body-2 grey--text text--darken-4">CPF:</span>
                      <span class="body-1 grey--text text--darken-4">{{ user.cpf }}</span>
                    </template>
                    <template v-else>
                      <div style="height:14px;width:25%;background-color:#DDDBDD"></div>
                      <v-divider style="margin-top:0.87rem;margin-bottom:0.87rem;"></v-divider>
                      <div style="height:14px;width:30%;background-color:#DDDBDD"></div>
                      <v-divider style="margin-top:0.87rem;margin-bottom:0.87rem;"></v-divider>
                      <div style="height:14px;width:50%;background-color:#DDDBDD"></div>
                      <v-divider style="margin-top:0.87rem;margin-bottom:0.87rem;"></v-divider>
                      <div style="height:14px;width:40%;background-color:#DDDBDD"></div>
                      <v-divider style="margin-top:0.87rem;margin-bottom:0.87rem;"></v-divider>
                      <div style="height:14px;width:45%;background-color:#DDDBDD"></div>
                      <v-divider style="margin-top:0.87rem;margin-bottom:0.87rem;"></v-divider>
                      <div style="height:14px;width:35%;background-color:#DDDBDD"></div>
                    </template>
                  </div>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </v-container>
    </v-container>
  </div>
</template>

<script>
import UserService from "@/services/UserService";

export default {
  data: () => ({
    user: null,
    tab: null,
    items: ["Contato", "Outros"],
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  }),
  mounted() {
    UserService.get(localStorage.getItem("jwt"))
      .then(res => {
        this.user = res.data.user;
      })
      .catch(() => {});
  }
};
</script>

<style scoped>
</style>
