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
                <h6 class="m-0">{{ getReservationName(item) }}</h6>
                <div class="m-2">{{ item.start_time.substr(0, 10) }}</div>
                <div class="d-flex flex-column align-items-center m-2">
                  <div v-if="getReservationJobs(item).slice(0, 2).length > 0" class="d-flex flex-row align-items-center">
                    <figure v-for="job in getReservationJobs(item).slice(0, 2)" :key="job.id" class="mb-0">
                      <img
                        v-if="job.avatar"
                        class="radius-50 m-1"
                        :src="job.avatar"
                        alt=""
                        width="40px"
                        height="40px"
                        @click="onEliteSelect(job.eliteId)"
                      >
                      <img
                        v-else
                        class="radius-50 m-1"
                        src="@/assets/svg/pro-placeholder.svg"
                        alt=""
                        width="40px"
                        height="40px"
                        @click="onEliteSelect(job.eliteId)"
                      >
                    </figure>
                  </div>
                  <div v-if="getReservationJobs(item).slice(2).length > 0" class="d-flex flex-row align-items-center">
                    <figure v-for="job in getReservationJobs(item).slice(2)" :key="job.id" class="mb-0">
                      <img
                        v-if="job.avatar"
                        class="radius-50 m-1"
                        :src="job.avatar"
                        alt=""
                        width="40px"
                        height="40px"
                        @click="onEliteSelect(job.eliteId)"
                      >
                      <img
                        v-else
                        class="radius-50 m-1"
                        src="@/assets/svg/pro-placeholder.svg"
                        alt=""
                        width="40px"
                        height="40px"
                      >
                    </figure>
                  </div>
                  <span class="ml-2">{{ getEliteName(item.reservation_jobs[0].elite) }}</span>
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
                <div v-for="job in getReservationJobs(selectedReservation)" :key="job.id" class="d-flex flex-column align-items-center">
                  <figure class="mb-0">
                    <img
                      v-if="job.avatar"
                      class="radius-50 m-1"
                      :src="job.avatar"
                      alt=""
                      width="40px"
                      height="40px"
                      @click="onEliteSelect(job.eliteId)"
                    >
                    <img
                      v-else
                      class="radius-50 m-1"
                      src="@/assets/svg/pro-placeholder.svg"
                      alt=""
                      width="40px"
                      height="40px"
                      @click="onEliteSelect(job.eliteId)"
                    >
                  </figure>
                  <a class="ml-2" href="" @click.prevent="">{{ getEliteName(job.elite) }}</a>
                </div>
                <span class="ml-2">{{ getStatus(selectedReservation.status) }}</span>
              </li>
            </ul>
            <h6>Detalii rezervare</h6>
            <ul class="summary_list">
              <li><strong>Numarul rezervarii</strong> {{ selectedReservation.reservation_id }}</li>
              <li><strong>Data rezervarii</strong> {{ getCreatedReservationDate }}</li>
              <li><strong>Adresa</strong> {{ getAddress }}</li>
              <li><strong>Telefon</strong> {{ selectedReservation.user.phone_number }}</li>
            </ul>
            <h6>Sumar comanda</h6>
            <ul class="summary_list col-md-6">
              <li class="my-4"><strong>Pentru data de</strong> {{ getReservationDate }}</li>
              <li v-if="isCoupleMassage" class="d-flex justify-content-between">
                <strong>Masaj Cuplu, {{ selectedReservation.reservation_service.massage_one.service.duration }} min</strong><span>{{ `${selectedReservation.reservation_service.price} Lei` }}</span>
              </li>
              <template v-for="(service, i) in reservationServices">
                <li v-if="reservationServices.length > 1" :key="i">Serviciu {{ i + 1 }}</li>
                <li :key="`${service.id}-summary`" class="d-flex justify-content-between">
                  <strong>{{ service.name }}</strong><span v-if="!isCoupleMassage">{{ `${service.price} Lei` }}</span>
                </li>
                <li v-for="complementaryService in service.complementaryServices" :key="`${complementaryService.id}-${service.id}`" class="d-flex justify-content-between ml-4">
                  <strong>{{ complementaryService.name }}</strong> <span>{{ `${complementaryService.price} Lei` }}</span>
                </li>
                <li v-if="service.therapeuticForm && parseInt(service.therapeuticForm.price, 10) > 0" :key="service.therapeuticForm.id" class="d-flex justify-content-between ml-4">
                  <strong>{{ service.therapeuticForm.name }}</strong> <span>{{ `${service.therapeuticForm.price} Lei` }}</span>
                </li>
              </template>
              <es-divider />
              <li class="d-flex justify-content-between"><strong>Subtotal</strong> {{ `${selectedReservation.total} Lei` }}</li>
              <li v-if="parseInt(selectedReservation.subscription_service_discount, 10) > 0" class="d-flex justify-content-between"><strong>Abonament discount</strong> - {{ `${selectedReservation.subscription_service_discount} Lei` }}</li>
              <li v-if="parseInt(selectedReservation.subscription_discount, 10) > 0" class="d-flex justify-content-between"><strong>Discount abonament</strong> - {{ `${selectedReservation.subscription_discount} Lei` }}</li>
              <li v-if="parseInt(selectedReservation.promo_code_discount, 10) > 0" class="d-flex justify-content-between"><strong>Discount promo cod</strong> - {{ `${selectedReservation.promo_code_discount} Lei` }}</li>
              <li v-if="parseInt(selectedReservation.gift_card_discount, 10) > 0" class="d-flex justify-content-between"><strong>Discount card cadou</strong> - {{ `${selectedReservation.gift_card_discount} Lei` }}</li>
              <li v-if="parseInt(selectedReservation.ease_credit_used, 10) > 0" class="d-flex justify-content-between"><strong>Credit Used</strong> - {{ `${selectedReservation.ease_credit_used} Lei` }}</li>
              <li class="d-flex justify-content-between"><strong>Total</strong> {{ `${selectedReservation.to_pay} Lei` }}</li>
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
        <p>{{ getCancelationText }}</p>
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
      getCancelationText() {
        const difference = getDifferenceInMinutes(this.selectedReservation?.start_time);
        let text = '';
        if (difference > 120 && difference < 240) {
          text = 'Pentru anularea rezervarii in acest moment se va retine o taxa de 80% din valoarea rezervarii';
        } else if (difference > 60 && difference < 120) {
          text = 'Pentru anularea rezervarii in acest moment se va retine o taxa de 50% din valoarea rezervarii';
        } else {
          text = 'Pentru anularea rezervarii in acest moment suma platita nu se mai ramburseaza';
        }

        return text;
      },
      getUpcomingAndActiveReservations() {
        return [...this.getActiveReservations, ...this.getUpcomingReservations];
      },
      getReservationList() {
        return this.selectedType === 'upcoming' ? this.getUpcomingAndActiveReservations : this.getPastReservations;
      },
      getCreatedReservationDate() {
        return getZonedDateTime(this.selectedReservation.created_at);
      },
      getReservationDate() {
        return getZonedDateTime(this.selectedReservation.start_time);
      },
      isCoupleMassage() {
        return this.selectedReservation.reservation_service_type.includes('CoupleMassageReservation');
      },
      isPaidCancelation() {
        const isConfirmed = this.selectedReservation?.status === 'confirmed'; 
        const difference = getDifferenceInMinutes(this.selectedReservation?.start_time);
        return isConfirmed
          ? difference < 240
          : false;
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

      onEliteSelect(id) {
        if (!id) {
          return;
        }
        this.$router.push(`/elite/${id}`);
      },

      getEliteName(elite) {
        const first_name = elite?.first_name;
        const last_name = elite?.last_name;
        return first_name ? `${first_name} ${last_name?.substr(0,1)}.` : '';
      },

      getReservationJobs(item) {
        const jobs = item.reservation_jobs.map(job => ({
          elite: job.elite,
          avatar: job.elite?.avatar_path,
          id: job.id,
          eliteId: job.elite?.id,
        }));
        return jobs;
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

      getReservationName(item) {
        let name = item.reservation_id;
        if (item.reservation_service_type === 'CoupleMassageReservation') {
          name = 'Masaj Cuplu';
        } else if (item.reservation_service_type === 'BeautyReservation') {
          name = item.reservation_service.beauty_service_reservations[0].service.name;
        } else if (item.reservation_service_type === 'FitnessReservation') {
          name = item.reservation_service.service.name;
        } else {
          name = item.reservation_service.service.name;
        }
        return name;
      },

      async onContinue() {
        const id = this.selectedReservation?.id;
        if (id) {
          await this.cancelReservation(id);
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
