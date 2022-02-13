<template>
  <div class="es_pro-password-container content">
    <h4>{{ $t('generic.change_password') }}</h4>
    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <label>{{ $t('generic.old_password') }}</label>
          <input
            id="old-password"
            v-model="oldPassword"
            :type="newPassType"
            class="form-control"
            name="old-password"
          >
          <span v-if="newPassType === 'password'" class="show-password-btn" @click.prevent="newPassType = 'text'">{{ $t('generic.show') }}</span>
          <span v-if="newPassType === 'text'" class="show-password-btn" @click.prevent="newPassType = 'password'">{{ $t('generic.hide') }}</span>
        </div>
        <div class="form-group">
          <label>{{ $t('generic.new_password') }}</label>
          <input
            id="new-password"
            v-model="newPassword"
            :type="oldPassType"
            class="form-control"
            name="new-password"
          >
          <span v-if="oldPassType === 'password'" class="show-password-btn" @click.prevent="oldPassType = 'text'">{{ $t('generic.show') }}</span>
          <span v-if="oldPassType === 'text'" class="show-password-btn" @click.prevent="oldPassType = 'password'">{{ $t('generic.hide') }}</span>
        </div>
        <div class="d-flex justify-content-end">
          <div class="d-flex align-items-center mr-4">
            <a href="" @click.prevent="isForgotPasswordModalOpen = true">
              {{ $t('generic.forgot_password') }}
            </a>
          </div>
          <button
            class="btn btn-sm btn-pink btn-pill my-4 px-6"
            @click.prevent="onSave()"
          >
            {{ $t('generic.save') }}
          </button>
        </div>
      </div>
    </div>
    <es-forgot-password-modal
      v-if="isForgotPasswordModalOpen"
      v-model="isForgotPasswordModalOpen"
      :is-open="isForgotPasswordModalOpen"
      type="elite"
    />
    <es-reset-password-modal
      v-if="isResetPasswordModalOpen"
      v-model="isResetPasswordModalOpen"
      :is-open="isResetPasswordModalOpen"
    />
  </div>
</template>

<script lang="ts">
  /* eslint-disable */
  import Vue from 'vue';
  import { mapActions } from 'vuex';
  import { ForgotPasswordModal } from '@/components/shared/forgot-password-modal';
  import { ResetPasswordModal } from '@/components/shared/reset-password-modal';

  export default Vue.extend({
    name: 'es-pro-password',

    components: {
      'es-forgot-password-modal': ForgotPasswordModal,
      'es-reset-password-modal': ResetPasswordModal,
    },

    data: () => ({
      isForgotPasswordModalOpen: false,
      isResetPasswordModalOpen: false,
      showPassword: false,
      oldPassword: null,
      newPassword: null,
      newPassType: 'password',
      oldPassType: 'password',
    }),
    methods: {
      ...mapActions({
        changePassword: 'session/changePassword',
      }),
      onSave(): void {
        const { newPassword, oldPassword } = this;
        const hasPassword = this.newPassword && this.oldPassword;

        if (hasPassword) {
          this.changePassword({ old_password: oldPassword, new_password: newPassword });
        } else {
          (this as any).$toasts.toast({
            id: 'password-toast',
            title: this.$t('toast.error_title'),
            message: this.$t('toast.wrong_password'),
            intent: 'warning',
          });
        }
      },
    },
  });
</script>
