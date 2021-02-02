<!-- eslint-disable -->
<template>
  <portal to="modal">
    <es-modal
      id="modal"
      size="sm"
      :on-dismiss="() => $emit('is-open', false)"
    >
      <div class="container es-login-modal mt-12">
        <div id="es-modal-dialog" class="es-forgot-password-modal">
          <div class="modal_header">
            <h3>Am uitat parola</h3>
            <button type="button" class="mfp-close" @click.prevent="$emit('is-open', false)"></button>
          </div>
          <div class="forgot-password-modal-wrapper">
            <div class="form-group">
              <label>Introdu adresa ta de email pentru resetarea parolei</label>
              <input
                id="email"
                v-model="email"
                type="text"
                class="form-control"
                name="email"
              >
              <i class="icon_mail_alt" />
            </div>
            <div class="d-flex justify-content-between">
              <button class="btn_1 px-4" @click="onSubmit()">Reseteaza parola</button>
            </div>
          </div>
          <!--form -->
        </div>
        <!-- /Sign In Modal -->
      </div>
    </es-modal>
  </portal>
</template>

<script lang="ts">
  /* eslint-disable */
  import Vue, { PropType } from 'vue';
  import { mapActions } from 'vuex';

  export default Vue.extend({
    name: 'es-forgot-password-modal',

    model: {
      prop: 'is-open',
      event: 'is-open',
    }, // model

    props: {
      isOpen: {
        required: true,
        type: Boolean as PropType<boolean>,
      },
    },

    data: () => ({
      email: null,
    }),

    methods: {
      ...mapActions({
        forgotPassword: 'forgotPassword',
      }),
      onSubmit() {
        console.log(this.email);
        this.$emit('show-reset-password-modal', true);
      },
    },
  });
</script>
