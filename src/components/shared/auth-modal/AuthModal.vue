<template>
  <portal to="modal">
    <div class="es-modal">
      <div
        id="sign-in-dialog"
        class="container"
      >
        <div class="sign-in-wrapper">
          <div class="form-group mt-4">
            <label>Parola</label>
            <input
              id="auth-password"
              type="password"
              class="form-control"
              name="password"
              v-model="password"
            >
            <i class="icon_lock_alt" />
          </div>
          <div class="text-center">
            <button type="submit" @click="authenticate()" class="btn_1">Authenticate</button>
          </div>
        </div>
      </div>
    </div>
  </portal>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapActions } from 'vuex';

  export default Vue.extend({
    name: 'auth-modal',

    data: () => ({
      password: null,
    }),

    methods: {
      ...mapActions({
        setToken: 'setToken',
      }),

      authenticate() {
        this.setToken(this.password);
      },
    }, // methods
  });
</script>
