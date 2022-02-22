<template>
  <div class="es_client-reservations-container content">
    <div class="row">
      <div class="col-md-8 col-sm-6">
        <h2>{{ $t('generic.my_reservations') }}</h2>
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
              >{{ $t('generic.previous_reservations') }}</a>
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
              >{{ $t('generic.future_reservations') }}</a>
            </li>
          </ul>

          <div id="pricing-tab-content" class="tab-content pricing-tab-content">
            <div v-if="getReservationList.length">
              <div v-for="(item, i) in getReservationList" :key="`${item.id}-${i}`" class="reservation-list-item d-flex align-items-center justify-content-between my-2">
                <h6 class="m-0">{{ $t(getReservationName(item)) }}</h6>
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
                    {{ $t('generic.view_details') }}
                  </a>
                </div>
              </div>
            </div>
            <div v-else class="d-flex align-items-center justify-content-between my-2 mx-4">
              <h4>{{ $t('views.client_dashboard.my_reservations.description') }} {{ selectedType === 'upcoming' ? $t('generic.future') : $t('generic.previous') }}</h4>
            </div>
          </div>
          <div class="d-flex justify-content-start">
            <button
              class="btn btn-sm btn-pink btn-pill my-4 px-6"
              @click.prevent="$router.push('/servicii')"
            >
              {{ $t('generic.reserve') }}
            </button>
          </div>
        </div>
        <div v-else>
          <a class="back-button" href="" @click.prevent="onBack()">
            {{ $t('generic.back') }}
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
            <h6>{{ $t('lbl_reservation_details') }}</h6>
            <ul class="summary_list">
              <li><strong>{{ $t('bookings.details.number') }}</strong> {{ selectedReservation.reservation_id }}</li>
              <li><strong>{{ $t('bookings.details.bookingDate') }}</strong> {{ getCreatedReservationDate }}</li>
              <li><strong>{{ $t('views.client_dashboard.my_reservations.address') }}</strong> {{ getAddress }}</li>
              <li><strong>{{ $t('bookings.details.telephone') }}</strong> {{ selectedReservation.user.phone_number }}</li>
            </ul>
            <h6>{{ $t('reservation_summary') }}</h6>
            <ul class="summary_list col-md-6">
              <li class="my-4"><strong>{{ $t('views.client_dashboard.my_reservations.for_the_date_of') }}</strong> {{ getReservationDate }}</li>
              <li v-if="isCoupleMassage" class="d-flex justify-content-between">
                <strong>{{ $t('generic.couple_massage') }} {{ selectedReservation.reservation_service.massage_one.service.duration }} min</strong><span>{{ `${selectedReservation.reservation_service.price} Lei` }}</span>
              </li>
              <template v-for="(service, i) in reservationServices">
                <li v-if="reservationServices.length > 1" :key="i">Serviciu {{ i + 1 }}</li>
                <li :key="`${service.id}-summary`" class="d-flex justify-content-between">
                  <strong>{{ $t(service.name) }}</strong><span v-if="!isCoupleMassage">{{ `${service.price} Lei` }}</span>
                </li>
                <li v-for="complementaryService in service.complementaryServices" :key="`${complementaryService.id}-${service.id}`" class="d-flex justify-content-between ml-4">
                  <strong>{{ complementaryService.count ? `${complementaryService.count} x` : '' }} {{ $t(complementaryService.name) }}</strong> <span>{{ `${complementaryService.price} Lei` }}</span>
                </li>
                <li v-if="service.therapeuticForm && parseInt(service.therapeuticForm.price, 10) > 0" :key="service.therapeuticForm.id" class="d-flex justify-content-between ml-4">
                  <strong>{{ $t('aroma_therapy') }}</strong> <span>{{ `${service.therapeuticForm.price} Lei` }}</span>
                </li>
              </template>
              <es-divider />
              <li class="d-flex justify-content-between"><strong>{{ $t('bookings.details.subTotal') }}</strong> {{ `${selectedReservation.total} Lei` }}</li>
              <li v-if="parseInt(selectedReservation.subscription_service_discount, 10) > 0" class="d-flex justify-content-between"><strong>{{ $t(selectedReservation.user_subscription.subscription.name) }}</strong> - {{ `${selectedReservation.subscription_service_discount} Lei` }}</li>
              <li v-if="parseInt(selectedReservation.subscription_discount, 10) > 0" class="d-flex justify-content-between"><strong>{{ $t('bookings.details.subscriptionDiscount') }}</strong> - {{ `${selectedReservation.subscription_discount} Lei` }}</li>
              <li v-if="parseInt(selectedReservation.promo_code_discount, 10) > 0" class="d-flex justify-content-between"><strong>{{ $t('summary.promo_code') }}</strong> - {{ `${selectedReservation.promo_code_discount} Lei` }}</li>
              <li v-if="parseInt(selectedReservation.gift_card_discount, 10) > 0" class="d-flex justify-content-between"><strong>{{ $t('summary.easeCredit') }}</strong> - {{ `${selectedReservation.gift_card_discount} Lei` }}</li>
            <li v-if="parseInt(selectedReservation.ease_credit_used, 10) > 0" class="d-flex justify-content-between"><strong>{{ $t('summary.easeCredit') }}</strong> - {{ `${selectedReservation.ease_credit_used} Lei` }}</li>
              <li class="d-flex justify-content-between"><strong>{{ $t('generic.total') }}</strong> {{ `${selectedReservation.to_pay} Lei` }}</li>
            </ul>
            <div v-if="canCancelReservation" class="d-flex justify-content-start">
              <button
                class="btn btn-sm btn-pink btn-pill my-4 px-6"
                @click.prevent="isConfirmModalOpen = true"
              >
                {{ $t('lbl_cancel_reservation') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <es-confirm-modal v-if="isPaidCancelation" v-model="isConfirmModalOpen" cta="Anuleaza contracost" @on-confirm="onContinue()">
      <template slot="title">{{ $t('views.client_dashboard.my_reservations.cancel_reservation_title') }}</template>
      <template slot="message">
        <p>{{ getCancelationText }}</p>
        <p>{{ $t('generic.this') }} <a href="tbd" target="_blank">{{ $t('generic.cancel_policy') }}</a> {{ $t('generic.cancel_policy_description') }}</p>
      </template>
    </es-confirm-modal>
    <es-confirm-modal v-else v-model="isConfirmModalOpen" cta="Da, anuleaza gratuit" @on-confirm="onContinue()">
      <template slot="title">{{ $t('views.client_dashboard.my_reservations.cancel_reservation_title') }}</template>
      <template slot="message">
        <p>{{ $t('bookings.details.cancel.free.title') }}</p>
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
        return `${user_address.street_name}, ${user_address.street_number}, ${this.$t(user_address.city.name)}`;
      },
      getCancelationText() {
        const difference = getDifferenceInMinutes(this.selectedReservation?.start_time);
        let text = '';
        if (difference > 120 && difference < 240) {
          text = this.$t('bookings.details.cancel.20.body');
        } else if (difference > 60 && difference < 120) {
          text = this.$t('bookings.details.cancel.50.body');
        } else {
          text = this.$t('bookings.details.cancel.100.body');
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
              .map(complementaryItem => ({ name: complementaryItem.complementary_service.name, price: complementaryItem.price, id: complementaryItem.id, count: complementaryItem.count })),
          }));
          return formattedService;
        } else if (reservationType === 'CoupleMassageReservation') {
          const massageOne = {
            name: reservationService.massage_one.service.name,
            price: reservationService.massage_one.price,
            id: reservationService.massage_one.id,
            complementaryServices: reservationService.massage_one.complementary_massages
              .map(item => ({ name: item.name, price: item.price, id: item.id })),
            therapeuticForm: reservationService.massage_one.therapeutic_form,
          };
          const massageTwo = {
            name: reservationService.massage_two.service.name,
            price: reservationService.massage_two.price,
            id: reservationService.massage_two.id,
            complementaryServices: reservationService.massage_two.complementary_massages
              .map(item => ({ name: item.name, price: item.price, id: item.id })),
            therapeuticForm: reservationService.massage_two.therapeutic_form,
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
            title: this.$t('generic.success'),
            message: this.$t('toast.cancel_reservation'),
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
        this.$router.push(`/pro/${id}`);
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
          auto_cancelled: this.$t('auto_cancelled'),
          reservation_cancelled_by_user: this.$t('reservation_cancelled_by_user'),
          reservation_cancelled_by_elite: this.$t('reservation_cancelled_by_elite'),
          reservation_cancelled_by_admin: this.$t('auto_cancelled'),
          payment_ongoing: this.$t('payment_ongoing'),
          incomplete: this.$t('incomplete'),
          waiting_confirmation: this.$t('waiting_confirmation'),
          confirmed: this.$t('confirmed'),
          on_the_way: this.$t('on_the_way'),
          arrived: this.$t('arrived'),
          completed: this.$t('completed'),
          admin_refunded: this.$t('admin_refunded'),
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
