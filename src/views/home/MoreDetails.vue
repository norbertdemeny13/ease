<!-- eslint-disable -->
<template>
  <div class="more-details">
    <div class="pb-6 pt-0">
      <div class="d-flex">
        <img
          src="@/assets/jpg/servicii.jpg"
          alt="Servicii"
        >
      </div>
      <div class="text-center text-content mt-4 d-flex align-items-start flex-column justify-content-center">
        <h3 class="text-left">50+ servicii profesionale de masaj, beauty si fitness la dispozitia ta</h3>
        <p class="my-2 text-left">Rezerva cu usurinta masaj, unghii, coafura, make up, fitness plus multe alte servicii si beneficiezi de preturi transparente fara sa astepti in trafic sau in locuri aglomerate </p>
        <router-link class="btn btn-pink btn-pill gradient mt-4 px-6" to="/servicii">Rezerva acum</router-link>
      </div>
    </div>
    <div class="py-6">
      <div class="text-center text-content mt-4 d-flex align-items-start flex-column justify-content-center">
        <h3 class="text-left">Noul tau ritual de wellnesss</h3>
        <p class="my-2 text-left">Cu abonamentele Ease te bucuri de servicii wellness lunare la tine, in timp ce economisesti 20-25% din fiecare rezervare, plus ai beneficii aditionale de membru pe tot parcursul anului</p>
        <router-link class="btn btn-small btn-pink btn-pill gradient mt-4 px-6" to="/abonamente">Activeaza acum</router-link>
      </div>
      <div class="d-flex reverse-order">
        <img
          src="@/assets/jpg/abonamente.jpg"
          alt="Abonamente"
        >
      </div>
    </div>
    <div class="py-6">
      <div class="d-flex">
        <img
          src="@/assets/jpg/faq.jpg"
          alt="Faq"
        >
      </div>
      <div class="col-md-6 text-content col-lg-6 text-center mt-4 d-flex align-items-start flex-column justify-content-center">
        <h3 class="text-left">Servicii superioare, rezultate de încredere</h3>
        <p class="my-2 text-left">Toti profesionistii din reteaua Ease au sute de ore de experienta si sunt deplin certificati, licentiati, asigurati si atent verificati prin sistemul nostru avansat de securitate. Stii cine vine la tine de fiecare data cand rezervi cu noi</p>
        <router-link class="btn btn-pink btn-pill gradient mt-4 px-6" to="/intrebari-frecvente">Afla mai multe</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'es-home-more-details',
  });
</script>
