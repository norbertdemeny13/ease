<!-- eslint-disable -->
<template>
  <portal to="modal">
    <es-modal
      id="modal"
      size="sm"
      :on-dismiss="() => $emit('is-open', false)"
    >
      <div class="container es-login-modal mt-12">
        <div id="es-modal-dialog" class="es-phone-validation-modal">
          <div class="modal_header">
            <h3>{{ $t('generic.validate_phone_number') }}</h3>
            <button v-if="canCloseModal" type="button" class="mfp-close" @click.prevent="$emit('is-open', false)"></button>
          </div>
          <a href="" @click.prevent="$emit('is-open', false); $emit('show-validate-phone-modal', true)">{{ $t('generic.back') }}</a>
          <div class="validate-phone-wrapper mt-4">
            <div class="form-group">
              <label>{{ $t('generic.enter_code') }} {{ getUser.phone_number }}</label>
              <input type="text" required class="form-control" name="phone" id="phone" v-model="validationCode">
            </div>
            <div class="d-flex">
              <button class="btn_1 mr-2" @click.prevent="requestValidatePhoneNumber()">{{ $t('generic.confirm') }}</button>
              <button class="btn_1" @click.prevent="requestPhoneNumberValidationCode()">{{ $t('lbl_resend_code') }}</button>
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
  import { mapGetters, mapActions } from 'vuex';
  import { nanoid } from 'nanoid';

  export default Vue.extend({
    name: 'es-phone-confirmation-modal',

    model: {
      prop: 'is-open',
      event: 'is-open',
    }, // model

    props: {
      actionType: {
        default: 'add',
        type: String as PropType<string>,
      },
      canCloseModal: {
        default: true,
        type: Boolean,
      },
      isOpen: {
        required: true,
        type: Boolean as PropType<boolean>,
      },
    },

    data: () => ({
      validationCode: null,
    }),

    computed: {
      ...mapGetters({ getUser: 'session/getUser' }),
    },

    watch: {
      getUser(newVal, oldVal) {
        if (newVal.phone_number_confirmed) {
          (this as any).$toasts.toasts.push({
            id: nanoid(),
            intent: 'success',
            title: this.$t('toast.congrats_title'),
            message: this.$t('toast.phone_number_confirmed'),
          });
          this.$emit('is-open', false);
        }
      },
    },

    methods: {
      ...mapActions({
        requestValidationCode: 'session/requestValidationCode',
        validatePhoneNumber: 'session/validatePhoneNumber',
      }),

      async requestPhoneNumberValidationCode() {
        await this.requestValidationCode(this.getUser.phone_number);
      },

      async requestValidatePhoneNumber() {
        await this.validatePhoneNumber(this.validationCode);
      },
    },
  });
</script>
