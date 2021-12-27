<!-- eslint-disable -->
<template>
  <portal to="modal">
    <es-modal
      id="modal"
      size="sm"
      :on-dismiss="() => $emit('is-open', false)"
    >
      <div class="container es-login-modal mt-12">
        <!-- Sign In Modal -->
        <div id="es-modal-dialog" class="es-request-phone-validation-modal">
          <div class="modal_header">
            <h3>{{ $t('generic.validate_phone_number') }}</h3>
            <button v-if="canCloseModal" type="button" class="mfp-close" @click.prevent="$emit('is-open', false)"></button>
          </div>
            <div class="validate-phone-wrapper">
              <div class="form-group">
                <label>{{ $t('enter_your_mobile_number') }}</label>
                <es-phone-number-input
                  v-model="phone_number"
                  id="phone"
                  :required="true"
                  :translations="translations"
                  name="phone"
                  default-country-code="RO"
                  clearable
                  color="#ced4da"
                  :no-example="true"
                  @update="onPhoneNumberUpdate($event)"
                />
              </div>
              <div class="text-left my-2">
                <button
                  class="btn_1"
                  @click.prevent="requestPhoneNumberValidationCode()"
                >{{ $t('generic.send') }}</button>
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
  import VuePhoneNumberInput from 'vue-phone-number-input';

  export default Vue.extend({
    name: 'es-validate-phone-modal',

    components: {
      'es-phone-number-input': VuePhoneNumberInput,
    },

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

    computed: {
      ...mapGetters({ getUser: 'session/getUser' }),
    },

    data() {
      return {
        phone_number: null,
        formattedPhoneNumber: null,
        translations: {
          countrySelectorLabel: this.$t('generic.phone_nr_country_selector'),
          countrySelectorError: this.$t('generic.phone_nr_selector_error'),
          phoneNumberLabel: this.$t('generic.phone_nr_label'),
          example: this.$t('generic.phone_nr_example')
        },
      }
    },

    watch: {
      getUser(newVal) {
        if (newVal.phone_number) {
          this.$emit('show-phone-confirmation-modal', true);
          this.$emit('is-open', false);
        }
      },
    },

    methods: {
      ...mapActions({
        requestValidationCode: 'session/requestValidationCode',
      }),

      onPhoneNumberUpdate(evt: any) {
        this.formattedPhoneNumber = evt.formattedNumber;
      },

      async requestPhoneNumberValidationCode() {
        await this.requestValidationCode(this.formattedPhoneNumber);
      },
    },
  });
</script>

<style scoped>
  .select-country-container:focus {
    border-color: none !important;
    box-shadow: none !important;
    outline: none !important;
  }

  .country-selector__input {
    border: none !important;
  }
</style>
