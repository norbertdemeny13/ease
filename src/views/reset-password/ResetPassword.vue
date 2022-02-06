<template>
  <div class="bg_gray content">
    <div class="container margin_30_20">
      <div class="row bg-white p-4">
        <div class="col-md-4">
          <h4>{{ $t('generic.change_password') }}</h4>
          <div class="form-group">
            <label>{{ $t('generic.new_password') }}</label>
            <input
              id="password"
              v-model="password"
              :type="newPassType"
              class="form-control"
              name="old-password"
            >
            <span v-if="newPassType === 'password'" class="show-password-btn" @click.prevent="newPassType = 'text'">{{ $t('generic.password_show') }}</span>
            <span v-if="newPassType === 'text'" class="show-password-btn" @click.prevent="newPassType = 'password'">{{ $t('generic.password_hide') }}</span>
          </div>
          <div class="form-group">
            <label>{{ $t('generic.confirm_password') }}</label>
            <input
              id="confirm-password"
              v-model="confirmPassword"
              :type="confirmPassType"
              class="form-control"
              name="new-password"
            >
            <span v-if="confirmPassType === 'password'" class="show-password-btn" @click.prevent="confirmPassType = 'text'">  {{ $t('generic.show') }}</span>
            <span v-if="confirmPassType === 'text'" class="show-password-btn" @click.prevent="confirmPassType = 'password'">{{ $t('generic.hide') }}</span>
          </div>
          <div class="d-flex justify-content-end">
            <button
              :class="`btn btn-sm btn-pink btn-pill my-4 px-6 ${password && confirmPassword ? '' : 'disabled'}`"
              @click.prevent="onChange()"
            >
              {{ $t('generic.change_password') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { mapActions } from 'vuex';
  import { nanoid } from 'nanoid';

  export default Vue.extend({
    name: 'es-forgot-password',
    data: () => ({
      showPassword: false,
      password: null,
      confirmPassword: null,
      newPassType: 'password',
      confirmPassType: 'password',
      token: '',
    }),
    created() {
      const { token } = this.$router.currentRoute.query;
      this.token = token;
    },
    methods: {
      ...mapActions({ resetPassword: 'session/resetPassword' }),
      onChange() {
        if (this.password === this.confirmPassword) {
          this.resetPassword({ password: this.newPassword, token: this.token });
        } else {
          this.$toasts.toast({
            id: nanoid(),
            title: this.$t('toast.warning_title'),
            message: this.$t('generic.different_password'),
            intent: 'warning',
          });
        }
      },
    },
  });
</script>
