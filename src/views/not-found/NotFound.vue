<template>
  <div id="not-found-page">
    <div class="container">
      <div class="row justify-content-center text-center">
        <div class="col-xl-7 col-lg-9">
          <figure>
            <img
              src="@/assets/svg/404.svg"
              alt=""
              class="img-fluid"
              width="550"
              height="234"
            >
          </figure>
          <p>{{ $t('generic.not_found') }}</p>
          <div class="text-center">
            <router-link class="btn btn-pill btn-sm btn-pink mt-4 px-5" to="/">{{ $t('generic.back') }}</router-link>
          </div>
        </div>
      </div>
      <!-- /row -->
    </div>
    <!-- /container -->
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'es-not-found',
  });
</script>
