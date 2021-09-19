<template>
  <div class="es_pro-phone-container content">
    <h4>{{ $t('views.pro_dashboard.documents') }}</h4>
    <div class="row">
      <div class="col-md-4">
        <div class="document-type d-flex d-column">
          <h6>{{ $t('views.pro_dashboard.qualification_certificate') }}</h6>
          <p>{{ $t('views.pro_dashboard.qualification_certificate_photo') }}</p>
        </div>
        <div class="upload-button">
          <a href="" class="my-4" @click.prevent="$emit('on-show-address-modal')">
            {{ $t('views.pro_dashboard.upload') }}
          </a>
          <span class="info" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'es-pro-phone',
  });
</script>
