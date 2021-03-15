<template>
  <div class="es_client-password-container content">
    <h4>Schimba Parola</h4>
    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <label>Vechea parola</label>
          <input
            id="old-password"
            v-model="oldPassword"
            :type="newPassType"
            class="form-control"
            name="old-password"
          >
          <span v-if="newPassType === 'password'" class="show-password-btn" @click.prevent="newPassType = 'text'">Arata</span>
          <span v-if="newPassType === 'text'" class="show-password-btn" @click.prevent="newPassType = 'password'">Ascunde</span>
        </div>
        <div class="form-group">
          <label>Noua parola (minim 6 caractere)</label>
          <input
            id="new-password"
            v-model="newPassword"
            :type="oldPassType"
            class="form-control"
            name="new-password"
          >
          <span v-if="oldPassType === 'password'" class="show-password-btn" @click.prevent="oldPassType = 'text'">Arata</span>
          <span v-if="oldPassType === 'text'" class="show-password-btn" @click.prevent="oldPassType = 'password'">Ascunde</span>
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
    name: 'es-client-password',
    data: () => ({
      showPassword: false,
      oldPassword: null,
      newPassword: null,
      newPassType: 'password',
      oldPassType: 'password',
    }),
  });
</script>
