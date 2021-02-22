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
        <div v-if="isSubscriptionActivated" class="col-lg-6 col-md-6 p-8">
          <div class="title d-flex flex-column align-items-center">
            <figure>
              <img
                src="@/assets/png/succes.png"
                alt=""
                class="lazy"
              >
            </figure>
            <h3 class="px-10 text-center">Felicitari, abonamentul tau a fost activat!</h3>
          </div>
          <p class="my-6 px-8">Vezi mai multe detalii despre abonamentul tau pe ease.ro sau in aplicatie</p>
          <p class="px-8">Doresti mai mult de o singura sedinta de masaj pe luna?
          Ai 20% discount la toate sedintele de masaj rezervate pe langa sedinta de masaj inclusa la abonamentul tau lunar. Discountul se aplica automat la check-out</p>
        </div>
        <div v-else class="col-lg-6 col-md-6 p-8">
          <h5>Adresa</h5>
          <p>{{ getAddress() }}</p>
          <div v-show="!showAddPayment">
            <h5>Metoda de plata</h5>
            <div v-if="!!getCards.length">
              <p>Selecteaza metoda de plata</p>
              <div class="row mb-4">
                <div class="col-6">
                  <div class="my-2 form-group">
                    <div class="custom_select submit">
                      <select name="credit-card" id="credit-card" class="form-control wide" v-model="selectedCard" @mouseover="initCustomSelect">
                        <option
                          v-for="card in getCards"
                          :key="card.id"
                          :value="card.id"
                        >
                          &#128179 {{ card.brand.toUpperCase() }} **** {{ card.last4 }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a href="" class="mt-4" @click.prevent="addPayment()">
              <i class="icon_plus" />
              Adauga metoda de plata
            </a>
          </div>
          <div v-show="showAddPayment">
            <h5>Te rugam sa introduci datele</h5>
            <es-payment
              class="mt-4"
              :is-fetching="isFetching"
              @on-add-card="onAddCard"
              @on-cancel="showAddPayment = false"
            />
          </div>
          <div class="d-flex justify-content-center">
            <button
              class="btn btn-sm btn-pink btn-pill mt-4 px-6"
              @click.prevent="activateSubscription()"
              :disabled="!getCards.length"
            >
              Activeaza
            </button>
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
  import { nanoid } from 'nanoid';
  import { Payment } from '@/components/shared/payment';

  export default Vue.extend({
    name: 'es-subscription-payment-view',

    components: {
      'es-payment': Payment,
    },

    data: () => ({
      showAddPayment: false,
      selectedCard: null,
      isSubscriptionActivated: false,
    }),

    computed: {
      ...mapGetters({
        getActivatedStatus: 'subscriptions/getActivatedStatus',
        getSelectedSubscription: 'subscriptions/getSelectedSubscription',
        getErrors: 'subscriptions/getErrors',
        getCards: 'cards/getCards',
        isFetching: 'cards/isFetching',
      }),
    },

    watch: {
      getActivatedStatus(newVal) {
        if (newVal) {
          this.isSubscriptionActivated = true;
        }
      },
      getCards(newVal) {
        if (newVal && newVal.length) {
          const [selectedCard] = newVal.filter((item: any) => item.primary);
          this.selectedCard = selectedCard ? selectedCard.id : newVal[0].id;
          (window as any).destroyCustomSelect();
          (window as any).initCustomSelect();
        }
      },
      getErrors(newVal) {
        if (newVal.length) {
          newVal.forEach((error: any) => {
            (this as any).$toasts.toasts.push({
              title: 'Atentie!',
              intent: error.status === 400 ? 'error' : 'warning',
              message: error.data.error,
              id: nanoid(),
            });
          });
        }
      },
    },

    created() {
      this.fetchCards();
    },

    destroyed() {
      (window as any).destroyCustomSelect();
      this.removeStripeCards();
    },

    methods: {
      ...mapActions({
        fetchCards: 'cards/fetchCards',
        removeStripeCards: 'cards/removeStripeCards',
        addCard: 'cards/addCard',
        activateSubscription: 'subscriptions/activateSubscription',
      }),

      initCustomSelect() {
        (window as any).initCustomSelect();
      },

      getAddress() {
        return sessionStorage.getItem('address');
      },

      async onAddCard() {
        await this.fetchCards();
        this.showAddPayment = false;
      },

      addPayment() {
        this.addCard();
        this.showAddPayment = true;
      },
    },
  });
</script>
