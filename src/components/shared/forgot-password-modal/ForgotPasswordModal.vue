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
            <h3>{{ $t('generic.forgot_password') }}</h3>
            <button type="button" class="mfp-close" @click.prevent="$emit('is-open', false)"></button>
          </div>
          <div class="forgot-password-modal-wrapper">
            <div class="form-group">
              <label>{{ $t('desc_enter_email_reset_password') }}</label>
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
              <button class="btn_1 px-4" @click="onSubmit()">{{ $t('generic.send') }}</button>
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
      type: {
        default: 'client',
        type: String,
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
        const { email, type } = this;
        if (validateEmail(email)) {
          await this.forgotPassword({ email, type });
          (this as any).$toasts.toast({
            id: 'forgot-password',
            title: this.$t('toast.warning_title'),
            message: this.$t('toast.password_reset'),
            intent: 'warning',
          });
          this.$emit('is-open', false);
        } else {
          (this as any).$toasts.toast({
            id: 'forgot-password',
            title: this.$t('toast.warning_title'),
            message: this.$t('toast.invalid_email'),
            intent: 'warning',
          });
        }
      },
    },
  });
</script>
