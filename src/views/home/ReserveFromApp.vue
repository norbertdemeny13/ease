<!-- eslint-disable -->
<template>
  <div class="reserve-from-app-container">
    <div class="container margin_30_40">
      <div class="row my-4">
        <div class="mobile-container col-md-4 col-lg-4 offset-md-2 offset-lg-2 text-center mt-4 d-flex align-items-center justify-content-center">
          <img
            class="m-2"
            src="@/assets/png/i-phone-x-template.png"
            alt=""
            width="200"
            height="380"
          >
        </div>
        <div class="col-md-4 col-lg-4 justify-content-center d-flex flex-column">
          <h3>Rezerva de pe telefonul tau</h3>
          <p class="text-secondary">Introdu numarul tau de mobil si vei primi linkul aplicatiei.</p>
          <form class="">
            <div class="row no-gutters custom-search-input p-0">
              <div class="input-group">
                <input type="text" class="form-control" name="email" id="reserve-input" placeholder="Introdu numarul de mobil" aria-label="" aria-describedby="reserve" required>
                <div class="input-group-append">
                  <button class="btn_1 btn-pink font-size-12 py-2" type="button" id="reserve">Trimite-mi un link</button>
                </div>
              </div>
            </div>
            <!-- /row -->
          </form>
          <div class="my-4 justify-content-start d-flex">
            <img
              src="@/assets/png/google-play.png"
              alt=""
              width="100"
              height="30"
            >
            <img
              class="ml-3"
              src="@/assets/png/appstore.png"
              alt=""
              width="100"
              height="30"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'es-home-reserve-from-app',
  });
</script>
