<template>
  <div class="es_client-reservations-container content">
    <div class="row">
      <div class="col-md-6">
        <h4>Rezervarile mele</h4>
        <es-divider />
        <div v-if="isListView">
          <ul id="pricing-tab" class="nav nav-pills pricing-tab mb-4" role="tablist">
            <li class="nav-item" @click="selectedType = 'past'">
              <a
                id="past-tab"
                class="nav-link"
                data-toggle="pill"
                href="#past"
                role="tab"
                aria-controls="past"
                aria-selected="false"
              >Rezervari anterioare</a>
            </li>
            <li class="nav-item" @click="selectedType = 'upcoming'">
              <a
                id="upcoming-tab"
                class="nav-link active"
                data-toggle="pill"
                href="#upcoming"
                role="tab"
                aria-controls="upcoming"
                aria-selected="true"
              >Rezervari viitoare</a>
            </li>
          </ul>

          <div id="pricing-tab-content" class="tab-content pricing-tab-content">
            <div v-for="item in getReservationList" :key="item.id" class="reservation-list-item d-flex align-items-center justify-content-between my-2">
              <h6 class="m-0">{{ item.reservation_id }}</h6>
              <div class="m-2">{{ item.start_time.substr(0, 10) }}</div>
              <div class="d-flex align-items-center m-2">
                <figure class="mb-0">
                  <img
                    class="radius-50"
                    src="@/assets/jpg/avatar.jpg"
                    alt=""
                    width="40px"
                    height="40px"
                  >
                </figure>
                <span class="ml-2">{{ getEliteName(item) }}</span>
              </div>
              <div class="my-4">
                <a class="pricing-plan-link" href="" @click.prevent="onSelect(item)">
                  Vezi detalii
                </a>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <button
              class="btn btn-sm btn-pink btn-pill my-4 px-6"
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
                    src="@/assets/jpg/avatar.jpg"
                    alt=""
                    width="40px"
                    height="40px"
                  >
                </figure>
                <a class="ml-2" href="" @click.prevent="">{{ getEliteName(selectedReservation) }}</a>
              </li>
            </ul>
            <h6>Detalii rezervare</h6>
            <ul class="summary_list">
              <li><strong>Data rezervarii</strong> {{ selectedReservation.start_time.substr(0, 10) }}</li>
              <li><strong>Adresa</strong> {{ getAddress }}</li>
              <li><strong>Telefon</strong> {{ selectedReservation.user.phone_number }}</li>
            </ul>
            <h6>Sumar comanda</h6>
            <ul class="summary_list">
              <li><strong>Data rezervarii</strong> {{ selectedReservation.start_time.substr(0, 10) }}</li>
              <li><strong>Adresa</strong> {{ getAddress }}</li>
              <li><strong>Telefon</strong> {{ selectedReservation.user.phone_number }}</li>
            </ul>
            <div v-if="selectedReservation.status === 'confirmed'" class="d-flex justify-content-end">
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
    <es-confirm-modal v-model="isConfirmModalOpen" cta="Anuleaza contracost" @on-confirm="onContinue()">
      <template slot="title">Pentru anularea rezervarii in acest moment se va retine o taxa de 20100% din total</template>
      <template slot="message">
        Aceasta politica de anulare este in vigoare pentru a compensa profesionistii pentru rezervarea timpului si renuntarea la alte oportunitati de munca. Deoarece suntem la cerere, profesionistii pierd venituri daca pastreaza un loc disponibil pentru dumneavoastra fara remunerare.
      </template>
    </es-confirm-modal>
  </div>
</template>

<script lang="ts">
  /* eslint-disable */
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';

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
      }),
      getAddress(): string {
        const { user_address } = this.selectedReservation as any;
        return `${user_address.street_name}, ${user_address.street_number}, ${user_address.city.name}`;
      },
      getReservationList(): string {
        return this.selectedType === 'upcoming' ? this.getUpcomingReservations : this.getPastReservations;
      },
    },

    created() {
      this.fetchActiveReservations();
      this.fetchUpcomingReservations();
      this.fetchPastReservations();
    },

    methods: {
      ...mapActions({
        fetchUpcomingReservations: 'reservations/fetchUpcomingReservations',
        fetchPastReservations: 'reservations/fetchPastReservations',
        fetchActiveReservations: 'reservations/fetchActiveReservations',
      }),

      getEliteName(item: any): string {
        const reservationJobs = item.reservation_jobs;
        const first_name = !!reservationJobs.length && reservationJobs[0].elite?.first_name;
        const last_name = !!reservationJobs.length && reservationJobs[0].elite?.last_name;
        return reservationJobs ? `${first_name} ${last_name?.substr(0,1)}.` : 'N/A';
      },

      onBack() {
        this.selectedReservation = null;
        this.isListView = true;
      },

      onSelect(item: any): void {
        this.selectedReservation = item;
        this.isListView = false;
      },

      onContinue() {
        // cancel reservation
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
