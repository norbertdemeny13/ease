<template>
  <div class="es_client-phone-container content">
    <h2>{{ $t('generic.phone_nr') }}</h2>
    <div class="row">
      <div class="col-md-4">
        <div v-if="phone" class="form-group">
          <label>{{ $t('generic.phone_nr_verified') }}</label>
          <es-phone-number-input
            id="phone"
            v-model="phone"
            :no-example="true"
            :required="true"
            :translations="translations"
            name="phone"
            default-country-code="RO"
            color="#ced4da"
            disabled
          />
        </div>
        <div v-else>
          <p>{{ $t('generic.please_add_your_phone_nr') }}</p>
        </div>
        <div class="d-flex justify-content-start">
          <button
            class="btn btn-sm btn-pink btn-pill my-4 px-6"
            @click.prevent="isPhoneValidateModalOpen = true"
          >
            {{ phone ? 'Modifica' : 'Adauga' }}
          </button>
        </div>
      </div>
    </div>
    <es-phone-validate-modal
      v-if="isPhoneValidateModalOpen"
      v-model="isPhoneValidateModalOpen"
      :is-open="isPhoneValidateModalOpen"
      @show-phone-confirmation-modal="isPhoneConfirmationModalOpen = true"
    />
    <es-phone-confirmation-modal
      v-if="isPhoneConfirmationModalOpen"
      v-model="isPhoneConfirmationModalOpen"
      :is-open="isPhoneConfirmationModalOpen"
    />
  </div>
</template>

<script lang="ts">
  /* eslint-disable */
  import Vue from 'vue';
  import { mapGetters } from 'vuex';
  import VuePhoneNumberInput from 'vue-phone-number-input';
  import { ValidatePhoneModal } from '@/components/shared/validate-phone-modal';
  import { PhoneConfirmationModal } from '@/components/shared/phone-confirmation-modal';

  export default Vue.extend({
    name: 'es-client-phone',

    components: {
      'es-phone-validate-modal': ValidatePhoneModal,
      'es-phone-confirmation-modal': PhoneConfirmationModal,
      'es-phone-number-input': VuePhoneNumberInput,
    },

    data() {
      return {
        translations: {
          countrySelectorLabel: this.$t('generic.phone_nr_country_selector'),
          countrySelectorError: this.$t('generic.phone_nr_selector_error'),
          phoneNumberLabel: this.$t('generic.phone_nr_label'),
          example: this.$t('generic.phone_nr_example')
        },
        phone: '',
        isPhoneConfirmationModalOpen: false,
        isPhoneValidateModalOpen: false,
      }
    },

    watch: {
      getUser(newVal, oldVal) {
        if (newVal.phone_number !== oldVal.phone_number) {
          this.phone = newVal.phone_number;
        }
      },
    },

    computed: {
      ...mapGetters({
        getUser: 'session/getUser',
      }),
    },
    created() {
      const { phone_number } = this.getUser;
      this.phone = phone_number;
    },
  });
</script>
