<template>
  <portal to="modal">
    <es-modal
      id="modal"
      size="sm"
      :on-dismiss="() => $emit('is-open', false)"
    >
      <div class="container es-login-modal mt-12">
        <div id="es-modal-dialog" class="es-auth-modal p-5">
          <div class="form-group">
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
    </es-modal>
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
