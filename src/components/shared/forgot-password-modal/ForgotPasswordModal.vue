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
                class="pl-6 form-control"
                name="email"
              >
              <i class="icon_mail_alt" />
            </div>
            <div class="d-flex justify-content-between">
              <button class="btn_1 px-4" @click="onSubmit()">Trimite</button>
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
  import { validateEmail } from '@/utils/validate-email';

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
        forgotPassword: 'session/forgotPassword',
      }),
      async onSubmit() {
        if (validateEmail(this.email)) {
          await this.forgotPassword(this.email);
          (this as any).$toasts.toast({
            id: 'forgot-password',
            title: 'Atentie',
            message: 'Vei primi in curand un email cu un link prin care poti sa resetezi parola.',
            intent: 'warning',
          });
          this.$emit('is-open', false);
        } else {
          (this as any).$toasts.toast({
            id: 'forgot-password',
            title: 'Atentie',
            message: 'Te rog sa introduci un email valid.',
            intent: 'warning',
          });
        }
      },
    },
  });
</script>
