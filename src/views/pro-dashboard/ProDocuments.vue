<template>
  <div class="es_pro-phone-container content">
    <h4>Documente</h4>
    <div class="row">
      <div class="col-md-4">
        <div class="document-type d-flex d-column">
          <h6>Certificat de calificare</h6>
          <p>Poza dupa certificatul de calificare</p>
        </div>
        <div class="upload-button">
          <a href="" class="my-4" @click.prevent="$emit('on-show-address-modal')">
            Incarca
          </a>
          <span class="info"></span>
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
