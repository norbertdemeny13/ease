<template>
  <div class="es_client-reservations-container content">
    <div class="row">
      <div class="col-md-8 col-sm-6">
        <h4>Rezervarile mele</h4>
        <es-divider />
        <div v-if="isListView">
          <ul id="pricing-tab" class="nav nav-pills pricing-tab mb-4" role="tablist">
            <li class="nav-item" @click="selectedType = 'past'">
              <a
                id="past-tab"
                :class="`nav-link ${selectedType === 'past' ? 'active' : ''}`"
                data-toggle="pill"
                href="#past"
                role="tab"
                aria-controls="past"
                :aria-selected="selectedType === 'past' ? 'true' : 'false'"
              >Rezervari anterioare</a>
            </li>
            <li class="nav-item" @click="selectedType = 'upcoming'">
              <a
                id="upcoming-tab"
                :class="`nav-link ${selectedType === 'upcoming' ? 'active' : ''}`"
                data-toggle="pill"
                href="#upcoming"
                role="tab"
                aria-controls="upcoming"
                :aria-selected="selectedType === 'upcoming' ? 'true' : 'false'"
              >Rezervari viitoare</a>
            </li>
          </ul>

          <div id="pricing-tab-content" class="tab-content pricing-tab-content">
            <div v-if="getReservationList.length">
              <div v-for="(item, i) in getReservationList" :key="`${item.id}-${i}`" class="reservation-list-item d-flex align-items-center justify-content-between my-2">
                <h6 class="m-0">{{ item.reservation_id }}</h6>
                <div class="m-2">{{ item.start_time.substr(0, 10) }}</div>
                <div class="d-flex flex-column align-items-center m-2">
                  <figure class="mb-0">
                    <img
                      class="radius-50"
                      src="@/assets/svg/pro-placeholder.svg"
                      alt=""
                      width="40px"
                      height="40px"
                    >
                  </figure>
                  <span class="ml-2">{{ getEliteName(item) }}</span>
                </div>
                <div class="ml-2">
                  <span>{{ getStatus(item.status) }}</span>
                </div>
                <div class="my-4">
                  <a class="pricing-plan-link" href="" @click.prevent="onSelect(item)">
                    Vezi detalii
                  </a>
                </div>
              </div>
            </div>
            <div v-else class="d-flex align-items-center justify-content-between my-2 mx-4">
              <h4>Momentan nu exista nici o rezervare {{ selectedType === 'upcoming' ? 'viitoare' : 'anterioara' }}</h4>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <button
              class="btn btn-sm btn-pink btn-pill my-4 px-6"
              @click.prevent="$router.push('/servicii')"
            >
              Rezerva
            </button>
          </div>
        </div>
        <div v-else>
          <a class="back-button" href="" @click.prevent="onBack()">
            Inapoi
          </a>
          <div class="mt-4">
            <ul class="summary_list">
              <li class="d-flex align-items-center">
                <figure class="mb-0">
                  <img
                    class="radius-50"
                    src="@/assets/svg/pro-placeholder.svg"
                    alt=""
                    width="40px"
                    height="40px"
                  >
                </figure>
                <a class="ml-2" href="" @click.prevent="">{{ getEliteName(selectedReservation) }}</a>
                <span class="ml-2">{{ getStatus(selectedReservation.status) }}</span>
              </li>
            </ul>
            <h6>Detalii rezervare</h6>
            <ul class="summary_list">
              <li><strong>Data rezervarii</strong> {{ getCreatedReservationDate }}</li>
              <li><strong>Adresa</strong> {{ getAddress }}</li>
              <li><strong>Telefon</strong> {{ selectedReservation.user.phone_number }}</li>
            </ul>
            <h6>Sumar comanda</h6>
            <ul class="summary_list col-md-6">
              <li class="my-4"><strong>Data rezervarii</strong> {{ getReservationDate }}</li>
              <template v-for="service in reservationServices">
                <li :key="`${service.id}-summary`" class="d-flex justify-content-between">
                  <strong>{{ service.name }}</strong><span>{{ `${service.price} Lei` }}</span>
                </li>
                <li v-for="complementaryService in service.complementaryServices" :key="`${complementaryService.id}-${service.id}`" class="d-flex justify-content-between ml-4">
                  <strong>{{ complementaryService.name }}</strong> <span>{{ `${complementaryService.price} Lei` }}</span>
                </li>
                <li v-if="service.therapeuticForm && parseInt(service.therapeuticForm.price, 10) > 0" :key="service.therapeuticForm.id" class="d-flex justify-content-between ml-4">
                  <strong>{{ service.therapeuticForm.name }}</strong> <span>{{ `${service.therapeuticForm.price} Lei` }}</span>
                </li>
              </template>
              <es-divider />
              <li class="d-flex justify-content-between"><strong>Subtotal</strong> {{ selectedReservation.total }}</li>
              <li v-if="parseInt(selectedReservation.ease_credit_used, 10) > 0" class="d-flex justify-content-between"><strong>Credit Used</strong> {{ selectedReservation.ease_credit_used }}</li>
              <li v-if="parseInt(selectedReservation.subscription_discount, 10) > 0" class="d-flex justify-content-between"><strong>Discount abonament</strong> {{ selectedReservation.subscription_discount }}</li>
              <li v-if="parseInt(selectedReservation.promo_code_discount, 10) > 0" class="d-flex justify-content-between"><strong>Discount promo cod</strong> {{ selectedReservation.promo_code_discount }}</li>
              <li v-if="parseInt(selectedReservation.gift_card_discount, 10) > 0" class="d-flex justify-content-between"><strong>Discount card cadou</strong> {{ selectedReservation.gift_card_discount }}</li>
              <li class="d-flex justify-content-between"><strong>Total</strong> {{ selectedReservation.to_pay }}</li>
            </ul>
            <div v-if="canCancelReservation" class="d-flex justify-content-start">
              <button
                class="btn btn-sm btn-pink btn-pill my-4 px-6"
                @click.prevent="isConfirmModalOpen = true"
              >
                Anuleaza rezervarea
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <es-confirm-modal v-if="isPaidCancelation" v-model="isConfirmModalOpen" cta="Anuleaza contracost" @on-confirm="onContinue()">
      <template slot="title">Anulare rezervare</template>
      <template slot="message">
        <p>Pentru anularea rezervarii in acest moment suma platita nu se mai ramburseaza</p>
        <p>Aceasta <a href="tbd" target="_blank">Politica de anulare</a> este in vigoare pentru a compensa profesionistii pentru rezervarea timpului si renuntarea la alte oportunitati de munca. Deoarece suntem la cerere, profesionistii pierd venituri daca pastreaza un loc disponibil pentru dumneavoastra fara remunerare.</p>
      </template>
    </es-confirm-modal>
    <es-confirm-modal v-else v-model="isConfirmModalOpen" cta="Da, anuleaza gratuit" @on-confirm="onContinue()">
      <template slot="title">Anulare rezervare</template>
      <template slot="message">
        <p>Vrei sa anulezi rezervarea?</p>
      </template>
    </es-confirm-modal>
  </div>
</template>

<script>
  /* eslint-disable */
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';
  import { getZonedDateTime, getDifferenceInMinutes } from '@/utils/date-helpers';

  export default Vue.extend({
    name: 'es-client-reservations',

    data: () => ({
      isListView: true,
      isConfirmModalOpen: false,
      selectedType: 'upcoming',
      selectedReservation: null,
    }),

    computed: {
      ...mapGetters({
        getActiveReservations: 'reservations/getActiveReservations',
        getUpcomingReservations: 'reservations/getUpcomingReservations',
        getPastReservations: 'reservations/getPastReservations',
        getReservation: 'reservations/getReservation',
        getCanceledReservation: 'reservations/getCanceledReservation',
      }),
      canCancelReservation() {
        const statuses = [
          'waiting_confirmation',
          'confirmed',
          'on_the_way',
          'arrived',
        ];
        return statuses.includes(this.selectedReservation.status);
      },
      getAddress() {
        const { user_address } = this.selectedReservation;
        return `${user_address.street_name}, ${user_address.street_number}, ${user_address.city.name}`;
      },
      getReservationList() {
        return this.selectedType === 'upcoming' ? this.getUpcomingReservations : this.getPastReservations;
      },
      getCreatedReservationDate() {
        return getZonedDateTime(this.selectedReservation.created_at);
      },
      getReservationDate() {
        return getZonedDateTime(this.selectedReservation.start_time);
      },
      isPaidCancelation() {
        const difference = getDifferenceInMinutes(this.selectedReservation?.start_time);
        return difference < 60;
      },
      reservationServices() {
        const reservationType = this.selectedReservation.reservation_service_type;
        const reservationService = this.selectedReservation.reservation_service;

        if (reservationType === 'BeautyReservation') {
          const beautyService = reservationService.beauty_service_reservations;
          const formattedService = beautyService.map(item => ({ 
            name: item.service.name,
            price: item.price,
            id: item.id,
            complementaryServices: item.complementary_services
              .map(complementaryItem => ({ name: complementaryItem.complementary_service.name, price: complementaryItem.price, id: complementaryItem.id })),
          }));
          return formattedService;
        } else if (reservationType === 'CoupleMassageReservation') {
          const massageOne = {
            name: reservationService.massage_one.service.name,
            price: reservationService.massage_one.price,
            id: reservationService.massage_one.id,
            complementaryServices: reservationService.massage_one.complementary_massages
              .map(item => ({ name: item.name, price: item.price, id: item.id })),
          };
          const massageTwo = {
            name: reservationService.massage_two.service.name,
            price: reservationService.massage_two.price,
            id: reservationService.massage_two.id,
            complementaryServices: reservationService.massage_two.complementary_massages
              .map(item => ({ name: item.name, price: item.price, id: item.id })),
          };
          return [massageOne, massageTwo];
        } else if (reservationType === 'MassageReservation') {
          const message = {
            name: reservationService.service.name,
            price: reservationService.price,
            id: reservationService.id,
            complementaryServices: reservationService.complementary_massages
              .map(item => ({ name: item.name, price: item.price, id: item.id })),
            therapeuticForm: reservationService.therapeutic_form,
          };
          return [message];
        } else if (reservationType === 'FitnessReservation') {
          const formattedService = { 
            name: reservationService.service.name,
            price: reservationService.price,
            id: reservationService.id,
          };
          return [formattedService];
        }
        return reservationService;
      },
    },

    created() {
      this.fetchActiveReservations();
      this.fetchUpcomingReservations();
      this.fetchPastReservations();
    },

    watch: {
      async getCanceledReservation(newVal) {
        if (newVal && newVal.status === 'reservation_cancelled_by_user') {
          await this.fetchActiveReservations();
          await this.fetchUpcomingReservations();
          this.isListView = true;
          this.$toasts.toast({
            id: 'cancel-reservation',
            title: 'Success',
            message: 'Rezervarea a fost anulata cu success!',
            intent: 'success',
          });
        }
      },
    },

    methods: {
      ...mapActions({
        fetchUpcomingReservations: 'reservations/fetchUpcomingReservations',
        fetchPastReservations: 'reservations/fetchPastReservations',
        fetchActiveReservations: 'reservations/fetchActiveReservations',
        showReservation: 'reservations/showReservation',
        cancelReservation: 'reservations/cancelReservation',
      }),

      getEliteName(item) {
        const reservationJobs = item.reservation_jobs;
        const first_name = !!reservationJobs.length && reservationJobs[0].elite?.first_name;
        const last_name = !!reservationJobs.length && reservationJobs[0].elite?.last_name;
        return first_name ? `${first_name} ${last_name?.substr(0,1)}.` : '';
      },

      getStatus(status) {
        const satatusLabel = {
          auto_cancelled: 'Anulata automat',
          reservation_cancelled_by_user: 'Anulata de user',
          reservation_cancelled_by_elite: 'Anulata de pro',
          reservation_cancelled_by_admin: 'Anulata de serviciu clienti',
          payment_ongoing: 'Plata in curs',
          incomplete: 'Incompleta',
          waiting_confirmation: 'Rezervat',
          confirmed: 'Confirmat',
          on_the_way: 'Pe drum',
          arrived: 'Sosit',
          completed: 'Completa',
          admin_refunded: 'Ramubrsata',
        };
        return satatusLabel[status];
      },

      onBack() {
        this.selectedReservation = null;
        this.isListView = true;
      },

      onSelect(item) {
        this.selectedReservation = item;
        this.isListView = false;
        this.showReservation(item.id);
      },

      async onContinue() {
        const id = this.selectedReservation?.id;
        if (id) {
          await this.cancelReservation();
        }
      },
    },
  });
</script>

<style type="text/css">
  .reservation-list-item {
    border: 1px solid #d0d4da;
    padding: 16px;
  }

  ul.summary_list {
    list-style: none;
    margin: 15px 0 25px 0;
    padding: 0;
  }

  ul.summary_list li {
    margin-bottom: 5px;
  }

  ul.summary_list li strong {
    display: inline-block;
    width: 150px;
  }

  @media (max-width: 767px) {
    ul.summary_list li strong {
      /* For less than 767px */
      display: block;
      width: auto;
    }
  }
</style>
