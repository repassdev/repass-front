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
                  <span class="font-weight-light">Vender Ingresso</span>
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
                  <v-select
                    :items="eventsArray"
                    label="Evento"
                    background-color="#69f0ae"
                    color="#69f0ae"
                    outline 
                    @change="onChange"
                    :error="errorD"
                  ></v-select>
                </v-layout>
                <v-layout>
                  <v-text-field
                    v-model="eventPlace"
                    label="Lugar"
                    background-color="#9ef5cb"
                    color="#9ef5cb"
                    disabled
                    outline
                  ></v-text-field>
                </v-layout>
                <v-layout>
                  <v-text-field
                    v-model="date"
                    label="Data"
                    background-color="#69f0ae"
                    color="#69f0ae"
                    mask="date-with-time"
                    outline
                    required
                    :error="errorD"
                  ></v-text-field>
                </v-layout>
                <v-layout>
                  <v-text-field
                    v-model="price"
                    label="Preço"
                    background-color="#69f0ae"
                    color="#69f0ae"
                    value="10.00"
                    prefix="R$"
                    type="number"
                    step="0.05"
                    outline
                    required
                    :error="errorD"
                  ></v-text-field>
                </v-layout>
                <v-layout>
                  <v-textarea
                    v-model="description"
                    label="Descrição"
                    background-color="#69f0ae"
                    color="#69f0ae"
                    outline
                    required
                    :error="errorD"
                  ></v-textarea>
                </v-layout>
                <v-card-actions>
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
import TicketService from "@/services/TicketService";
import * as moment from "moment";

export default {
  data: () => ({
    name: "",
    event: "",
    date: "",
    price: "100.00",
    description: "",
    eventPlace: "",
    events: null,
    eventsArray: [],
    errorD: false
  }),
  methods: {
    onChange(value){
      this.event = this.events[value]["_id"];
      this.eventPlace = this.events[value].place;
    },
    onSubmit() {
      TicketService.postTicket(
        { name: this.name, date: moment(this.date, 'DD/MM/YYYY hh:mm'), price: this.price, description: this.description, event: this.event },
        localStorage.getItem("jwt"))
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
  },
  mounted() {
    this.date = moment().format('DD/MM/YYYY hh:mm');
    EventService.getEvents()
      .then(res => {
        this.events = res.data.events;
        for (let i = 0; i < this.events.length; i++) {
          this.eventsArray.push({
            text: this.events[i].name,
            value: i
            });
        }
      })
      .catch(() => {});
  }
};
</script>

<style scoped>
.v-card__actions {
    padding: 0px;
}
</style>
