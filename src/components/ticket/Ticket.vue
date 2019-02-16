<template>
  <div>
    <v-container fluid>
      <v-container
        class="pa-0"
        style="background-color:rgba(255,255,255,1);border: 1px solid #bbf8da;"
      >
        <v-layout row wrap>
          <v-flex xs12 sm4>
            <template v-if="ticket">
              <v-img
                :src="ticket.event.image"
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
            </template>
            <template v-else>
              <v-img
                src="http://www.placepuppy.net/100/100"
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
            </template>
          </v-flex>
          <v-flex xs12 sm8 text-xs-center text-sm-left>
            <v-container style="height:100%;">
              <div class="pb-4">
                <h1 v-if="ticket" class="display-1 black--text">{{ ticket.name }}</h1>
                <h3
                  v-if="ticket"
                  class="subheading font-weight-regular black--text mb-1"
                  style="border-bottom:2px solid rgb(105,240,174)"
                >{{ ticket.date | moment("DD/MM/YYYY hh:mm") }}</h3>
                <h4 v-if="ticket" class="body-1 black--text">{{ ticket.price.toFixed(2) | real }}</h4>
              </div>
              <div>
                <v-btn dark depressed large block @click="dialog = true" color="#ae69f0">Contatar Vendedor</v-btn>
              </div>
            </v-container>
          </v-flex>
        </v-layout>
      </v-container>
    </v-container>
    <v-dialog
      v-if="ticket"
      v-model="dialog"
      max-width="600px"
    >
      <v-card>
        <v-card-title class="headline">
          Entre em contato com {{ ticket.owner.name }}:
        </v-card-title>

        <v-card-text>
          <span class="body-2 grey--text text--darken-4">Email:</span>
          <span class="body-1 grey--text text--darken-4">{{ ticket.owner.email }}</span>
          <v-divider class="my-2"></v-divider>
          <span class="body-2 grey--text text--darken-4">Telefone:</span>
          <span class="body-1 grey--text text--darken-4">{{ ticket.owner.phone }}</span>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed large color="#ae69f0" dark @click="dialog = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import TicketService from "@/services/TicketService";

export default {
  data: () => ({
    dialog: false,
    ticket: null
  }),
  mounted() {
    TicketService.getTicket(this.$route.params.id)
      .then(res => {
        this.ticket = res.data.ticket;
      })
      .catch(() => {});
  }
};
</script>

<style scoped>
</style>
