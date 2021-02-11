<!-- eslint-disable -->
<template>
  <div class="es_reserve-service-container">
    <div class="container margin_30_40">
      <router-link class="back-button mb-2" to="/abonamente">Inapoi</router-link>
      <div class="row mt-4">
        <div class="col-lg-6 col-md-6 p-8 bg_gray">
          <h3>Detalii abonament</h3>
          <div class="main">
            <div class="d-flex justify-content-between pb-2 align-items-center flex-inline">
              <h5>{{ getSelectedSubscription.label }}</h5>
              <h6>{{ getSelectedSubscription.price }} Ron / {{ getSelectedSubscription.monthly ? 'Luna' : 'An' }}</h6>
            </div>
            <div class="d-flex border-top pt-4 justify-content-between align-items-center flex-inline">
              <h6>Subtotal</h6><h6>{{ getSelectedSubscription.price }} Ron</h6>
            </div>
            <div class="d-flex justify-content-between align-items-center flex-inline">
              <h6>Total</h6><h6>{{ getSelectedSubscription.price }} Ron</h6>
            </div>
            <div class="mt-4"><small>Prin apasarea butonului “Activeaza”, accepti Termenii si Conditiile noastre si Politica de Confidentialitate si activezi abonamentul Ritual masaj lunar de 60 minute. Abonamentul se reinnoieste automat in fiecare luna la data la care te-ai abonat, pana cand il anulezi. In fiecare luna se va efectua o plata automata de pe cardul tau pentru care primesti o sedinta de masaj (cu durata aleasa de tine). Poti sa anulezi abonamentul in orice moment, gratuit din aplicatie, de pe site-ul nostru ease.ro  sau apeland serviciu clienti.</small></div>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 p-8">
          <div v-if="!showAddPayment">
            <h5>Metoda de plata</h5>
            <p>Selecteaza metoda de plata</p>
            <div v-if="selectedCard.length">
              <div class="payment_select">
                <label class="container_radio">{{ selectedCard[0].number }}</label>
                <i class="icon_creditcard" />
              </div>
            </div>
            <a href="" class="mt-4" @click.prevent="showAddPayment = true">
              <i class="icon_plus" />
              Adauga metoda de plata
            </a>
          </div>
          <es-payment v-else class="mt-4" @on-add-card="onAddCard" />
          <div class="d-flex justify-content-center">
            <a
              class="btn btn-sm btn-pink btn-pill mt-4 px-6"
              href=""
              @click.prevent
            >
              Activeaza
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- /container -->
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';
  import { Payment } from '@/components/shared/payment';

  export default Vue.extend({
    name: 'es-subscription-payment-view',

    components: {
      'es-payment': Payment,
    },

    data: () => ({
      showAddPayment: false,
      selectedCard: [] as any,
    }),

    computed: {
      ...mapGetters({
        getSelectedSubscription: 'subscriptions/getSelectedSubscription',
        getCards: 'cards/getCards',
      }),
    },

    created() {
      this.fetchCards();
    },

    methods: {
      ...mapActions({
        fetchCards: 'cards/fetchCards',
      }),
      onAddCard(): void {
        this.selectedCard = [{
          number: '**** 4507',
        }];
        this.showAddPayment = false;
      },
    },
  });
</script>
