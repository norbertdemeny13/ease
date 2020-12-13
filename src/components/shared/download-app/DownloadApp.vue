<!-- eslint-disable -->
<template>
  <div class="download-app-container">
    <div class="container margin_30_40">
      <div class="row d-flex align-items-center justify-content-center">
        <img
          src="@/assets/png/ease-logo.png"
          alt=""
          width="70"
          height="70"
        >
        <div class="logo-container d-flex flex-column align-items-center ml-3">
          <h2>Descarca applicatia</h2>
          <div>
            <img
              src="@/assets/png/google-play.png"
              alt=""
              width="100"
              height="30"
            >
            <img
              class="ml-2"
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
    name: 'es-download-app',
  });
</script>
