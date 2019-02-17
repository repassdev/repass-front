import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/components/Home';
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import Profile from '@/components/Profile';
import AddEvent from '@/components/AddEvent';
import Ticket from '@/components/ticket/Ticket';
import AddTicket from '@/components/ticket/AddTicket';
import MyTickets from '@/components/ticket/MyTickets';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/entrar', name: 'login', component: Login },
    { path: '/registrar', name: 'signup', component: Signup },
    { path: '/perfil', name: 'profile', component: Profile },
    { path: '/adicionar-evento', name: 'add-event', component: AddEvent },
    { path: '/adicionar-ingresso', name: 'add-ticket', component: AddTicket },
    { path: '/ingresso/:id', name: 'ticket', component: Ticket },
    { path: '/meus-ingressos', name: 'my-tickets', component: MyTickets },
    { path: '*', redirect: { name: 'home' } }
  ],
});