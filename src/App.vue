<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" style="width: 250px;" absolute temporary>
      <v-list-tile v-if="loggedIn == true" flat to="/adicionar-ingresso">
        <v-list-tile-content>
          <v-list-tile-title>Adicionar Ingresso</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="loggedIn == true" flat to="/adicionar-evento">
        <v-list-tile-content>
          <v-list-tile-title>Adicionar Evento</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="loggedIn == true" flat to="/meus-ingressos">
        <v-list-tile-content>
          <v-list-tile-title>Meus Ingressos</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="loggedIn == true" flat to="/perfil">
        <v-list-tile-content>
          <v-list-tile-title>Perfil</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="loggedIn == true" flat @click="logOut">
        <v-list-tile-content>
          <v-list-tile-title>Sair</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="loggedIn == false" flat to="/registrar">
        <v-list-tile-content>
          <v-list-tile-title>Registrar</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="loggedIn == false" flat to="/entrar">
        <v-list-tile-content>
          <v-list-tile-title>Entrar</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-navigation-drawer>
    <v-toolbar app color="#a457ee" dark style="border-bottom: 1px solid #ffffff;" flat>
      <v-toolbar-side-icon class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-items>
        <v-btn flat to="/">
          <v-toolbar-title class="headline">
            <span>Re</span>
            <span class="font-weight-light">pass</span>
          </v-toolbar-title>
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-if="loggedIn == true" flat to="/adicionar-ingresso">
          <span>Adicionar Ingresso</span>
        </v-btn>
        <v-btn v-if="loggedIn == true" flat to="/adicionar-evento">
          <span>Adicionar Evento</span>
        </v-btn>
        <v-btn v-if="loggedIn == true" flat to="/meus-ingressos">
          <span>Meus Ingressos</span>
        </v-btn>
        <v-btn v-if="loggedIn == true" flat to="/perfil">
          <span>Perfil</span>
        </v-btn>
        <v-btn
          v-if="loggedIn == true"
          flat
          @click="logOut"
        >
          <span>Sair</span>
        </v-btn>
        <v-btn v-if="loggedIn == false" flat to="/registrar">
          <span>Registrar</span>
        </v-btn>
        <v-btn v-if="loggedIn == false" flat to="/entrar">
          <span>Entrar</span>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content style="background-color: #f5f5f5;">
      <router-view></router-view>
    </v-content>
    <v-footer color="#fbfefd" style="border-top: 1px solid #bbf8da;">
      <v-spacer></v-spacer>
      <span class="px-3 grey--text text--darken-3">&copy; {{ new Date().getFullYear() }}</span>
      <v-spacer></v-spacer>
    </v-footer>
  </v-app>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      loggedIn: false,
      drawer: null
    };
  },
  beforeUpdate() {
    if (localStorage.getItem("jwt") != null) {
      this.loggedIn = true;
    }
  },
  methods: {
    logOut: function() {
      localStorage.removeItem("user");
      localStorage.removeItem("jwt");
      this.loggedIn = false;
      this.$router.push('/');
    }
  }
};
</script>
