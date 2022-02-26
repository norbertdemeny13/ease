<!-- eslint-disable -->
<template>
  <div class="es_reserve-subscription-container">
    <div class="container margin_30_40">
      <a href="" class="back-button mb-2" @click.prevent="onBack">{{ $t('generic.back') }}</a>
      <div class="row mt-4">
        <div class="col-lg-6 col-md-6 mb-4">
          <div class="box_order">
            <div class="head">
              <h3>{{ $t('views.subscriptions.details') }}</h3>
            </div>
            <div class="main custom-subscriptions">
              <div class="d-flex justify-content-between pb-2 align-items-center flex-inline">
                <h5>{{ $t(getSelectedSubscription.label) }}</h5>
                <h6>{{ getSelectedSubscription.price.price }} Lei / {{ getSelectedSubscription.monthly ? 'Luna' : 'An' }}</h6>
              </div>
              <div class="d-flex border-top pt-4 justify-content-between align-items-center flex-inline">
                <h6>{{ $t('generic.subtotal') }}</h6><h6>{{ getSelectedSubscription.price.price }} Lei</h6>
              </div>
              <div class="d-flex justify-content-between align-items-center flex-inline custom-subscription-total">
                <h6>{{ $t('generic.total') }}</h6><h6>{{ getSelectedSubscription.price.price }} Lei</h6>
              </div>
              <div class="mt-4"><small>{{ getTermsAndConditions }}</small></div>
            </div>
          </div>
        </div>
        <div v-if="isSubscriptionActivated" class="col-lg-6 col-md-6">
          <div class="box_order">
            <div class="main">
              <div class="title d-flex flex-column align-items-center">
                <figure>
                  <img
                    src="@/assets/svg/succes.svg"
                    alt=""
                    class="lazy"
                  >
                </figure>
                <h3 class="px-10 text-center">{{ $t('views.subscriptions.activation_success_title') }}</h3>
              </div>
              <p class="my-6 px-8">{{ $t('views.subscriptions.activation_success_1') }}</p>
              <p class="px-8">{{ $t('views.subscriptions.activation_success_2') }}</p>
          </div>
          </div>
          <div class="d-flex justify-content-end">
            <button
              class="btn btn-sm btn-pink btn-pill mt-4 px-6"
              @click.prevent="$router.push('/servicii')"
            >
              {{ $t('generic.reserve_now') }}
            </button>
          </div>
        </div>
        <div v-else class="col-lg-6 col-md-6">
          <div class="box_order">
            <div class="head">
              <h3>Plata si Adresa</h3>
            </div>
            <div class="main">
              <es-address-details disabled />
              <es-payment-details>
              </es-payment-details>
            </div>
          </div>
          <div class="d-flex justify-content-end">
              <button
                  class="btn btn-sm btn-pink btn-pill mt-4 px-6"
                  @click.prevent="activateSubscription()"
                  :disabled="!getCards.length"
              >
                  {{ $t('generic.activate') }}
              </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';
  import { PaymentDetails } from '@/components/shared/payment';
  import { AddressDetails } from '@/components/shared/address-details';

  export default Vue.extend({
    name: 'es-subscription-payment-view',

    components: {
      'es-address-details': AddressDetails,
      'es-payment-details': PaymentDetails,
    },

    data: () => ({
      showAddPayment: false,
      selectedCard: null,
      isSubscriptionActivated: false,
      polling: 0,
    }),

    computed: {
      ...mapGetters({
        getActiveSubscription: 'subscriptions/getActiveSubscription',
        getActivatedStatus: 'subscriptions/getActivatedStatus',
        getSelectedSubscription: 'subscriptions/getSelectedSubscription',
        getCards: 'cards/getCards',
        isFetching: 'cards/isFetching',
        getActivePayment: 'services/getActivePayment',
      }),
      getTermsAndConditions(): string {
        const { type, uses, monthly } = this.getSelectedSubscription;
        let termsText = 'subscription.terms.body';
        const period = monthly ? 'monthly' : 'yearly';

        if (type === 'FitnessSubscription') {
          termsText += `.fitness.${uses}`;
        } else if (type === 'BeautySubscription') {
          termsText += `.beauty.${period}`;
        } else if (type === 'MassageSubscription') {
          termsText += `.single_massage.${period}`;
        } else {
          termsText += `.couple_massage.${period}`;
        }

        return this.$t(termsText).toString();
      },
    },

    watch: {
      getActiveSubscription(newVal): void {
        if (newVal && newVal.state === 'payment_pending') {
          this.initialisePaymentCheck();
        } else {
          this.isSubscriptionActivated = true;
          (this as any).$toasts.toast({
            id: 'subscription-toast',
            intent: 'success',
            title: this.$t('toast.congrats_title'),
            message: this.$t('toast.subscription_activation'),
          });
          clearInterval(this.polling);
        }
      },

      getCards(newVal): void {
        if (newVal && newVal.length) {
          const [selectedCard] = newVal.filter((item: any) => item.primary);
          this.selectedCard = selectedCard ? selectedCard.id : newVal[0].id;
        }
      },
    },

    beforeDestroy() {
      clearInterval(this.polling);
    },

    created() {
      this.fetchCards();
    },

    methods: {
      ...mapActions({
        fetchCards: 'cards/fetchCards',
        addCard: 'cards/addCard',
        fetchActiveSubscriptions: 'subscriptions/fetchActiveSubscriptions',
        activateSubscription: 'subscriptions/activateSubscription',
      }),

      initialisePaymentCheck(): void {
        this.polling = setInterval(() => {
          this.fetchActiveSubscriptions();
        }, 3000);
      },

      getAddress(): string {
        return sessionStorage.getItem('address') as string;
      },
      onBack(): void {
        if (this.getActivePayment) {
          this.$router.back();
        } else {
          this.$router.push('/abonamente');
        }
      },
    },
  });
</script>
