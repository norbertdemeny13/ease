<template>
  <div class="companies-container bg-white">
    <div class="container margin_30_40">
      <div class="main_title center">
        <h2>Beneficiile Ease la locul de munca</h2>
      </div>
      <div class="row">
        <div class="col-md-6 col-lg-4">
          <div class="box_how">
            <figure class="mb-4">
              <img
                src="@/assets/icons/headphones.svg"
                data-src="@/assets/icons/headphones.svg"
                alt=""
                width="45"
                height="45"
                class="lazy"
              >
            </figure>
            <p>Serviciu personalizat pentru companii cu un manager de cont dedicat si rezervare digitala</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="box_how">
            <figure class="mb-4">
              <img
                src="@/assets/icons/lotus.svg"
                data-src="@/assets/icons/lotus.svg"
                alt=""
                width="45"
                height="45"
                class="lazy"
              >
            </figure>
            <p>Masajele de relaxare pe scaun sau masa elibereaza tensiunea din zona gatului, spatelui si a bratelor</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="box_how">
            <figure class="mb-4">
              <img
                src="@/assets/icons/certificate.svg"
                data-src="@/assets/icons/certificate.svg"
                alt=""
                width="45"
                height="45"
                class="lazy"
              >
            </figure>
            <p>Toti profesionistii de pe platforma Ease sunt autorizati, asigurati si examinati.</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="box_how">
            <figure class="mb-4">
              <img
                src="@/assets/icons/massage-table.svg"
                data-src="@/assets/icons/massage-table.svg"
                alt=""
                width="45"
                height="45"
                class="lazy"
              >
            </figure>
            <p>Profesionistii ajung cu toate echipamentele necesare pentru a-ti oferi o experienta excelenta</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="box_how">
            <figure class="mb-4">
              <img
                src="@/assets/icons/office.svg"
                data-src="@/assets/icons/office.svg"
                alt=""
                width="45"
                height="45"
                class="lazy"
              >
            </figure>
            <p>Masaj si stretching la birou la ora, locatia si frecventa preferata</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="box_how">
            <figure class="mb-4">
              <img
                src="@/assets/icons/chart-display.svg"
                data-src="@/assets/icons/chart-display.svg"
                alt=""
                width="45"
                height="45"
                class="lazy"
              >
            </figure>
            <p>Stretching-ul la birou stimuleaza musculatura si articulatiile angajatilor, crescand productivitatea acestora cu fiecare sesiune</p>
          </div>
        </div>
      </div>
    </div>
    <div class="container bg-pink p-5">
      <div class="row">
        <div class="col-md-4 col-lg-4 mb-4">
          <h2 class="text-white">Sa incepem</h2>
          <div class="form-group">
            <input
              id="name"
              v-model="name"
              type="text"
              class="form-control"
              placeholder="Nume si Prenume"
              name="name"
            >
          </div>
          <div class="form-group">
            <input
              id="email"
              v-model="email"
              type="email"
              class="form-control pl-6"
              name="email"
            >
            <i class="icon_mail_alt" />
          </div>
          <div class="form-group">
            <input
              id="company"
              v-model="company"
              type="text"
              class="form-control"
              placeholder="Denumirea companiei"
              name="company"
            >
          </div>
          <div class="form-group">
            <input
              id="phone"
              v-model="phone"
              type="text"
              class="form-control pl-6"
              name="phone"
            >
            <i class="icon_phone" />
          </div>
          <div class="form-group">
            <textarea
              id="message"
              v-model="message"
              class="form-control"
              placeholder="Mesaj"
              name="message"
            />
          </div>
          <small class="terms text-white">Prin apasarea butonului „Trimite”, sunt de acord ca Ease sau reprezentantii sai sa ma contacteze prin e-mail, telefonic ori prin SMS, la adresa de e-mail sau numarul de telefon specificat, inclusiv pentru campanii de marketing, si ca informatiile mele sa fie folosite conform Politicii de confidentialitate Ease.
          </small>
          <div class="text-center">
            <button class="btn btn-pill btn-sm btn-pink mt-4 px-5" @click="onSubmit()">Trimite</button>
          </div>
        </div>
        <div class="col-md-6 offset-md-2 col-lg-6 d-flex align-items-center flex-column">
          <figure>
            <img
              src="@/assets/png/ease-for-companies.png"
              data-src="@/assets/png/ease-for-companies.png"
              alt=""
              width="390"
              height="360"
              class="ease-for-company lazy"
            >
          </figure>
          <es-download-app />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapActions } from 'vuex';
  import { DownloadApp } from '@/components/shared/download-app';

  export default Vue.extend({
    name: 'es-companies',

    components: {
      'es-download-app': DownloadApp,
    },

    data: () => ({
      email: null,
      name: null,
      message: null,
      phone: null,
      company: null,
    }),

    methods: {
      ...mapActions({
        officeRequest: 'officeRequest',
      }),

      onSubmit() {
        this.officeRequest(this.$data);
      },
    },
  });
</script>
