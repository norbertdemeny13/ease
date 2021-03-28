<template>
  <div class="es_client-account-container content">
    <h4>Cont</h4>
    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <label>Prenume</label>
          <input
            v-model="user.first_name"
            type="text"
            class="form-control"
            name="name"
          >
        </div>
        <div class="form-group">
          <label>Nume</label>
          <input
            v-model="user.last_name"
            type="text"
            class="form-control"
            name="firstName"
          >
        </div>
        <div class="form-group">
          <label>Adresa de email</label>
          <input
            v-model="user.email"
            class="form-control"
            disabled
            type="text"
            name="email"
          >
        </div>
        <div class="form-group">
          <label>Vreau sa primesc oferte si notificari prin</label>
          <div class="radio_c_group">
            <label
              class="container_check"
              @click.prevent="account_settings.email_news = !account_settings.email_news"
            >Email
              <input type="checkbox" value="checkbox" name="notification-email-type" :checked="account_settings.email_news ? 'checked' : ''">
              <span class="checkmark" />
            </label>
            <label
              class="container_check"
              @click.prevent="account_settings.sms_news = !account_settings.sms_news"
            >SMS
              <input type="checkbox" value="checkbox" name="notification-sms-type" :checked="account_settings.sms_news ? 'checked' : ''">
              <span class="checkmark" />
            </label>
            <label
              class="container_check"
              @click.prevent="account_settings.phone_news = !account_settings.phone_news"
            >Telefon
              <input type="checkbox" value="checkbox" name="notification-phone-type" :checked="account_settings.phone_news ? 'checked' : ''">
              <span class="checkmark" />
            </label>
          </div>
        </div>
        <div class="d-flex justify-content-end">
          <button
            class="btn btn-sm btn-pink btn-pill my-4 px-6"
            @click.prevent="onSave()"
          >
            Salveaza
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  /* eslint-disable */
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';
  import { isEqual } from 'lodash-es';

  export default Vue.extend({
    name: 'es-client-account',

    data: () => ({
      user: {
        first_name: '',
        last_name: '',
        email: '',
      },
      account_settings: {
        send_app_notifications: false,
        sms_news: false,
        email_news: false,
        phone_news: false,
      },
    }),

    created() {
      const { first_name, last_name, email, account_setting } = this.getUser;
      this.user = { first_name, last_name, email };
      this.account_settings = { ...account_setting };
    },

    watch: {
      getUser(newVal, oldVal) {
        if (!isEqual(newVal, oldVal)) {
          (this as any).$toasts.toast({
            id: 'update-toast',
            title: 'Felicitari',
            message: 'Contul a fost modificat cu success!',
            intent: 'success',
          });
        }
      },
    },

    computed: {
      ...mapGetters({
        getUser: 'session/getUser',
      }),
    },

    methods: {
      ...mapActions({
        updateUser: 'session/updateUser',
      }),
      onSave(): void {
        this.updateUser(this.$data);
      },
    },
  });
</script>
