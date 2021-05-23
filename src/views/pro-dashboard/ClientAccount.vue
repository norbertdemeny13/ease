<template>
  <div class="es_client-account-container content">
    <h4>Profil</h4>
    <div class="row">
      <div class="col-md-8">
        <div class="profile-pic-container my-4">
          <figure>
            <img v-if="getUser.avatar && getUser.avatar.url" :src="getUser.avatar.url" alt="Profile Pic">
            <img v-else src="@/assets/png/avatar-profesionist.png" alt="Profile Pic">
            <input
              id="profile-picture"
              ref="profile-picture"
              class="change-profile-picture"
              type="file"
              @change="handleFileUpload()"
            >
            <i class="icon_camera" @click.prevent="$refs['profile-picture'].click()" />
          </figure>
        </div>
        <a v-if="profilePicture" href="" @click.prevent="onSavePicture()">Save</a>
      </div>
      <div v-if="getBalance" class="col-md-4">
        <h6>Balanta ta</h6>
        <h3>{{ `${getBalance.available} Lei` }}</h3>
        <h6>{{ `${getBalance.pending} Lei disponibili` }}</h6>
        <div class="d-flex justify-content-start">
          <button
            class="btn btn-sm btn-stripe my-4 px-6"
          >
            Contul meu stripe
          </button>
        </div>
      </div>
    </div>
    <es-divider />
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
      isProfilePictureModalOpen: false,
      profilePicture: {} as any,
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
      this.fetchStatistics();
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
        getStatistics: 'session/getStatistics'
      }),
      getBalance(): Record<string, any> {
        return this.getStatistics.balance;
      },
    },

    methods: {
      ...mapActions({
        fetchStatistics: 'session/fetchStatistics',
        updateElite: 'session/updateElite',
        updateProfilePicture: 'session/updateProfilePicture',
      }),
      handleFileUpload() {
        this.profilePicture = (this.$refs['profile-picture'] as any).files[0];
      },
      async onSavePicture() {
        let formData = new FormData();
        formData.append('avatar', this.profilePicture, this.profilePicture.name);
        this.updateProfilePicture(formData);
      },

      onSave(): void {
        this.updateElite(this.$data);
      },
    },
  });
</script>

<style lang="scss">
  #profile-picture {
    visibility: hidden;
  }

  .profile-pic-container {
    border-color: #ffffff;
    border-radius: 50%;
    border-style: solid;
    box-shadow: 0 0 8px 3px #b8b8b8;
    height: 140px;
    position: relative;
    width: 140px;
  }

  .profile-pic-container img {
    border-radius: 50%;
    height: 100%;
    width: 100%;
  }

  .profile-pic-container i {
    align-items: center;
    background-color: white;
    border-radius: 50%;
    bottom: 20px;
    box-shadow: 0 0 8px 3px #b8b8b8;
    color: #d00007;
    display: flex !important;
    height: 30px;
    justify-content: center;
    position: absolute;
    right: -7px;
    width: 30px;
  }
</style>
