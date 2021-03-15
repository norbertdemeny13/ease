<template>
  <div class="es_client-phone-container content">
    <h4>Numar de telefon</h4>
    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <label>Numar de telefon mobil parola</label>
          <input
            id="phone-number"
            v-model="phone"
            type="text"
            class="form-control"
            name="phone-number"
          >
        </div>
        <div class="d-flex justify-content-end">
          <button
            class="btn btn-sm btn-pink btn-pill my-4 px-6"
          >
            Salveaza
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'es-client-phone',
    data: () => ({
      phone: '',
    }),
  });
</script>
