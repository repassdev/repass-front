<!-- 
#a457ee	#57eea4	#eea457
style="background: linear-gradient(65deg,#8cf3c1 0%,#c18cf3 100%);"
-->

<template>
  <div>
    <template v-if="tickets">
      <router-link tag="div" class="clickable" :to="'ingresso/' + tickets[0]['_id']">
        <v-responsive>
          <v-container fluid class="pa-0">
            <v-layout row wrap align-center style="background-color:#f5f5f5;">
              <v-flex xs12 sm4 text-xs-center>
                <v-img
                  :src="tickets[0].event.image"
                  lazy-src="./placeholder.jpg"
                  class="grey lighten-2"
                  style="height:320px;"
                >
                  <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                  </v-layout>
                </v-img>
              </v-flex>
              <v-flex
                xs12
                sm8
                text-xs-center
                text-sm-left
                style="background-color: #bf89f3;"
                class="jumbotron"
              >
                <v-container style="height:100%;">
                  <h1 class="display-2 white--text">{{ tickets[0].name }}</h1>
                  <h3
                    class="subheading font-weight-regular white--text mb-1"
                    style="border-bottom:2px solid rgb(255,255,255)"
                  >{{ tickets[0].date | moment("DD/MM/YYYY hh:mm") }}</h3>
                  <h4 class="body-1 white--text">{{ tickets[0].price.toFixed(2) | real }}</h4>
                </v-container>
              </v-flex>
            </v-layout>
          </v-container>
        </v-responsive>
      </router-link>
    </template>
    <template v-else>
      <v-responsive>
        <v-container fluid class="pa-0">
          <v-layout row wrap align-center style="background-color:#f5f5f5;">
            <v-flex xs12 sm4 text-xs-center>
              <v-img
                src="./placeholder.jpg"
                class="grey lighten-2"
                style="height:320px;"
              >
                <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-layout>
              </v-img>
            </v-flex>
            <v-flex
              xs12
              sm8
              text-xs-center
              text-sm-left
              style="background-color: #bf89f3;"
              class="jumbotron"
            >
              <v-container style="height:100%;">
                <div class="centralize-mobile" style="padding-top:0.5rem;padding-bottom:0.5rem;">
                  <div style="height:35px;width:35%;background-color:#DDDBDD;"></div>
                </div>
                <div class="centralize-mobile" style="padding-top:0.3rem;padding-bottom:0.45rem;border-bottom:2px solid rgb(255,255,255)">
                  <div style="height:14px;width:30%;background-color:#DDDBDD;"></div>
                </div>
                <div class="centralize-mobile" style="padding-top:0.3rem;padding-bottom:0.3rem;">
                  <div style="height:14px;width:20%;background-color:#DDDBDD;"></div>
                </div>
              </v-container>
            </v-flex>
          </v-layout>
        </v-container>
      </v-responsive>
    </template>
    <div
      style="background: #fbfefd;border-bottom: 1px solid #bbf8da;border-top: 1px solid #bbf8da;"
    >
      <v-container fluid>
        <v-layout row justify-center>
          <v-flex md6 xs12>
            <h1 class="headline font-weight-thin black--text text-xs-center">O lugar para</h1>
            <h1
              class="headline font-weight-light black--text text-xs-center"
            >conectar vendedores de ingressos a possíveis compradores</h1>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <div>
      <v-container fluid grid-list-md>
        <v-layout row wrap align-center>
          <v-flex xl4 md6 xs12 v-for="(ticket, key) in tickets" :key="key">
            <router-link tag="div" :to="'ingresso/' + ticket['_id']" class="pa-2">
              <v-container
                class="pa-0 clickable"
                style="background-color:#ffffff;border: 1px solid #bbf8da;"
              >
                <v-layout row wrap>
                  <v-flex xs12 sm4 text-xs-center>
                    <div style="overflow:hidden">
                      <v-img
                        :src="ticket.event.image"
                        lazy-src="./placeholder.jpg"
                        class="grey lighten-2 clickableImage"
                        height="100%"
                      >
                        <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-layout>
                      </v-img>
                    </div>
                  </v-flex>
                  <v-flex xs12 sm8 text-xs-center text-sm-left>
                    <v-container style="height:100%;">
                      <div class="pb-4">
                        <h2 class="display-1 black--text">{{ ticket.name }}</h2>
                        <h3
                          class="subheading font-weight-regular black--text mb-1"
                          style="border-bottom:1px solid rgb(0,0,0)"
                        >{{ ticket.date | moment("DD/MM/YYYY hh:mm") }}</h3>
                        <h4 class="body-1 black--text">{{ ticket.price.toFixed(2) | real }}</h4>
                      </div>
                    </v-container>
                  </v-flex>
                </v-layout>
              </v-container>
            </router-link>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import TicketService from "@/services/TicketService";

export default {
  data: () => ({
    tickets: null
  }),
  mounted() {
    TicketService.getTickets()
      .then(res => {
        this.tickets = res.data.tickets;
      })
      .catch(() => {});
  }
};
</script>

<style scoped>
.clickable:hover {
  cursor: pointer;
}
@media (min-width: 600px) {
  .jumbotron {
    height: 320px;
  }
}
.centralize-mobile{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

@media (min-width: 600px) {
  .centralize-mobile{
    justify-content: left;
    align-items: left;
  }
}
</style>
