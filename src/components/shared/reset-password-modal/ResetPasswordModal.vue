<!-- eslint-disable -->
<template>
  <portal to="modal">
    <es-modal
      id="modal"
      size="sm"
      :on-dismiss="() => $emit('is-open', false)"
    >
      <div class="container es-login-modal mt-12">
        <div id="es-modal-dialog" class="es-reset-password-modal">
          <div class="modal_header">
            <h3>{{ $t('generic.forgot_password') }}</h3>
            <button type="button" class="mfp-close" @click.prevent="$emit('is-open', false)"></button>
          </div>
          <div class="reset-passwrod-modal-wrapper">
            <div class="form-group">
              <label>{{ $t('lbl_enter_new_password') }}</label>
              <input
                :type="type"
                class="pl-6 form-control"
                name="password"
                id="password"
                v-model="password"
              >
                <span v-if="type === 'password'" class="show-password-btn" @click.prevent="type = 'text'">{{ $t('generic.password_show') }}</span>
                <span v-if="type === 'text'" class="show-password-btn" @click.prevent="type = 'password'">{{ $t('generic.password_hide') }}</span>
              <i class="icon_lock_alt" />
            </div>
            <div class="d-flex justify-content-between">
              <button class="btn_1 px-4" @click="onSubmit()">{{ $t('lbl_reset_password') }}</button>
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
    name: 'es-reset-password-modal',

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
      password: null,
      type: 'password',
    }),

    methods: {
      ...mapActions({
        resetPassword: 'resetPassword',
      }),
      onSubmit() {
        console.log(this.password);
      },
    },
  });
</script>
