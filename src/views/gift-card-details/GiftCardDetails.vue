<template>
  <div class="content bg_gray">
    <div class="es_gift-card-details-page container margin_30_20">
      <a class="back-button" href="" @click.prevent="$router.push('/carduri-cadou')">
        {{ $t('generic.back') }}
      </a>
      <div class="row d-flex justify-content-center">
        <div class="col-md-5">
          <img class="mb-4" :src="getGiftCard.absolute_image_url" width="500" height="350">
          <div class="form-group">
            <label>{{ $t('generic.gift_value') }}</label>
            <select
              id="value"
              v-model="form.value"
              name="value"
              class="form-control wide"
            >
              <option
                v-for="amount in amountList"
                :key="amount"
                :value="amount"
              >
                {{ amount }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>{{ $t('generic.for') }}</label>
            <input
              v-model="form.name"
              type="text"
              :placeholder="$t('generic.name_of_beneficiary')"
              class="form-control"
              name="name"
            >
          </div>
          <div class="form-group">
            <input
              v-model="form.email"
              type="text"
              :placeholder="$t('generic.email_of_beneficiary')"
              class="form-control"
              name="email"
            >
          </div>
          <div class="form-group">
            <label>{{ $t('generic.from') }}</label>
            <input
              v-model="form.from_name"
              type="text"
              :placeholder="$t('generic.name_of_sender')"
              class="form-control"
              name="from-name"
            >
          </div>
          <div class="form-group">
            <input
              v-model="form.from_email"
              type="text"
              :placeholder="$t('generic.email_of_sender')"
              class="form-control"
              name="from-email"
            >
          </div>
          <div class="form-group my-4">
            <label>{{ $t('generic.when_to_send_gift') }}</label>
            <es-datepicker
              :options="{
                minDate: 'today',
              }"
            >
              <input
                id="datepicker-default"
                v-model="form.send_at"
                class="datepicker-input"
                name="datepicker-default"
                type="text"
                size="md"
                :placeholder="$t('generic.choose_a_date')"
              >
            </es-datepicker>
          </div>
          <div class="form-group my-4">
            <label>{{ $t('generic.message') }}</label>
            <textarea
              v-model="form.message"
              type="text"
              :placeholder="$t('generic.message_optional')"
              class="form-control"
              name="message"
            />
          </div>
          <div class="d-flex justify-content-center">
            <a
              class="btn btn-sm btn-pink btn-pill mt-4 px-6"
              href=""
              @click.prevent="onSubmit()"
            >
              {{ $t('generic.continue') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';
  import { Datepicker } from '@/components/shared/datepicker';

  export default Vue.extend({
    name: 'es-gift-card-details',

    components: {
      'es-datepicker': Datepicker,
    },

    data() {
      return {
        amountList: [50, 100, 150, 250, 500],
        form: {
          name: '',
          email: '',
          from_name: '',
          from_email: '',
          value: 100,
          message: this.$t('gift_card_message').toString(),
          send_at: '',
          card_design_id: null,
        },
      };
    },

    computed: {
      ...mapGetters({
        getGiftCard: 'giftCards/getGiftCard',
        getGiftCards: 'giftCards/getGiftCards',
        getSelectedGiftCard: 'giftCards/getSelectedGiftCard',
      }),
    },

    watch: {
      getSelectedGiftCard(newVal) {
        const { id } = this.$router.currentRoute.params;
        if (newVal.gift_card_id) {
          this.$router.push(`/carduri-cadou/${id}/plata`);
        }
      },
    },

    created() {
      this.form.card_design_id = this.getGiftCard.id;
      this.form.send_at = new Date();
    },

    methods: {
      ...mapActions({
        createGiftCard: 'giftCards/createGiftCard',
      }),

      onSubmit() {
        const { id } = this.$router.currentRoute.params;
        const form = {
          ...this.form,
          card_design_id: id,
        }
        this.createGiftCard(form);
      },
    },
  });
</script>
