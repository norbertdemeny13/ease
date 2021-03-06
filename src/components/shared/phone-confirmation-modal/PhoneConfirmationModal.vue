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
        <div id="es-modal-dialog" class="es-phone-validation-modal">
          <div class="modal_header">
            <h3>Valideaza numarul de telefon telefonul</h3>
            <button class="mfp-close" @click="$emit('is-open', false)"></button>
          </div>
          <a href="" @click.prevent="$emit('is-open', false); $emit('show-validate-phone-modal', true)">Inapoi</a>
          <div class="validate-phone-wrapper mt-4">
            <div class="form-group">
              <label>Introdu codul trimis la: {{ getUser.phone_number }}</label>
              <input type="text" required class="form-control" name="phone" id="phone" v-model="validationCode">
            </div>
            <div class="d-flex">
              <button class="btn_1 mr-2" @click.prevent="requestValidatePhoneNumber()">Confirma</button>
              <button class="btn_1" @click.prevent="requestPhoneNumberValidationCode()">Retrimite cod</button>
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
      getUser(newVal) {
        if (newVal.phone_number_confirmed) {
          (this as any).$toasts.toasts.push({
            id: nanoid(),
            intent: 'success',
            title: 'Felicitari!',
            message: 'Contul tau a fost creat cu success!',
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
