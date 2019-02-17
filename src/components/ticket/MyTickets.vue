<template>
  <div>
    <v-container fluid>
      <v-container
        class="pa-0"
        style="background-color:rgba(255,255,255,1);border: 1px solid #bbf8da;height: 300px"
      >
        <v-layout row wrap>
          <v-flex xs12>
            <v-list three-line subheader>
              <template v-for="(ticket, index) in tickets">
                <v-list-tile
                  :to="'ingresso/' + ticket['_id']"
                  :key="index"
                  style="border-bottom:1px solid rgba(0,0,0,0.12)"
                >
                  <v-list-tile-avatar>
                    <v-img
                      :src="ticket.event.image"
                      lazy-src="./placeholder.jpg"
                      class="grey lighten-2"
                    >
                      <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-layout>
                    </v-img>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title>{{ ticket.name }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ ticket.date | moment("DD/MM/YYYY hh:mm") }}</v-list-tile-sub-title>
                    <v-list-tile-sub-title>{{ ticket.price.toFixed(2) | real }}</v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-btn outline color="error" @click="deleteTicket($event, ticket['_id'])">Deletar</v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </template>
            </v-list>
          </v-flex>
        </v-layout>
      </v-container>
    </v-container>
  </div>
</template>

<script>
import TicketService from "@/services/TicketService";

export default {
  data: () => ({
    tickets: null
  }),
  mounted() {
    TicketService.getUserTickets(localStorage.getItem("jwt"))
      .then(res => {
        this.tickets = res.data.tickets;
      })
      .catch(() => {});
  },
  methods: {
    deleteTicket(e, id) {
      e.preventDefault();
      TicketService.deleteTicket(
        id,
        localStorage.getItem("jwt")
      )
        .then(() => {
          TicketService.getUserTickets(localStorage.getItem("jwt"))
          .then(res => {
            this.tickets = res.data.tickets;
          })
          .catch(() => {});
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>
</style>
