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
              v-model="password"
              type="password"
              class="form-control"
              name="password"
            >
            <i class="icon_lock_alt" />
          </div>
          <div class="text-center">
            <button
              type="submit"
              class="btn_1"
              @click="authenticate()"
            >
              Authenticate
            </button>
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
