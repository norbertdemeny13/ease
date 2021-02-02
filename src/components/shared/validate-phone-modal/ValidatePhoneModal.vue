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
            <h3>Valideaza numarul de telefon telefonul</h3>
            <button type="button" class="mfp-close" @click.prevent="$emit('is-open', false)"></button>
          </div>
            <div class="validate-phone-wrapper">
              <div class="form-group">
                <label>Introdu numarul de telefon</label>
                <input
                  id="phone"
                  v-model="phone_number"
                  type="text"
                  class="form-control"
                  name="phone"
                >
                <i class="icon_phone" />
              </div>
              <div v-if="phone_number && phone_number.length > 9" class="text-left my-2">
                <input
                  type="text"
                  value="Trimite"
                  class="btn_1 px-0"
                  @click.prevent="requestPhoneNumberValidationCode()"
                />
              </div>
              <div v-if="sentSMS" class="form-group">
                <label>Introdu codul trimis la: {{ phone_number }}</label>
                <input type="text" required class="form-control" name="phone" id="phone" v-model="validationCode">
                <i class="icon_key_alt" />
              </div>
              <div v-if="sentSMS" class="d-flex justify-content-between">
                <input type="text" value="Confirma" class="btn_1 px-0" @click.prevent="requestValidatePhoneNumber()"/>
                <input type="text" value="Retrimite cod" class="btn_1 px-0" @click.prevent="requestPhoneNumberValidationCode()" />
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
  import { Loading } from '@/components/shared/loading';

  export default Vue.extend({
    name: 'es-validate-phone-modal',

    components: {
      'es-loading': Loading,
    },

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
      sentSMS: false,
      phone_number: null,
      validationCode: null,
    }),

    methods: {
      ...mapActions({
        requestValidationCode: 'requestValidationCode',
        validatePhoneNumber: 'validatePhoneNumber',
      }),

      async requestPhoneNumberValidationCode() {
        await this.requestValidationCode(this.phone_number);
        this.sentSMS = true;
      },

      async requestValidatePhoneNumber() {
        await this.validatePhoneNumber(this.validationCode);
        this.$emit('is-open', false);
      },
    },
  });
</script>
