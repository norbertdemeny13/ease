<!-- eslint-disable -->
<template>
  <div class="download-app-container">
    <div class="container margin_30_40">
      <div class="row d-flex align-items-center justify-content-center">
        <img
          src="@/assets/svg/appicon.svg"
          alt=""
          width="80"
          height="80"
        >
        <div class="logo-container d-flex flex-column align-items-center ml-3">
          <h2>{{ $t('generic.download_app') }}</h2>
          <div>
            <img
              src="@/assets/png/download-google-play-small.png"
              alt=""
              width="137"
              height="40"
            >
            <img
              class="ml-md-2"
              src="@/assets/png/download-appstore-small.png"
              alt=""
              width="137"
              height="40"
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
