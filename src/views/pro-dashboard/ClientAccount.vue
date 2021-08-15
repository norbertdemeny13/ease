<template>
  <div class="es_client-account-container content">
    <h4>Profil</h4>
    <div class="row">
      <div class="col-md-8">
        <div class="d-flex align-items-center">
          <div class="profile-pic-container my-4">
            <figure>
              <img v-if="image" :src="image" alt="Profile Pic">
              <img v-else-if="getUser.avatar && getUser.avatar.url" :src="getUser.avatar.url" alt="Profile Pic">
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
          <div class="ml-4">
            <h6>{{ getUser.display_name }}</h6>
            <p>{{ getUser.elite_id }}</p>
            <a v-if="image" href="" @click.prevent="onSavePicture()">Save</a>
          </div>
        </div>
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
            >Email
              <input type="checkbox" value="checkbox" name="notification-email-type" :checked="account_settings.email_news ? 'checked' : ''">
              <span class="checkmark" />
            </label>
            <label
              class="container_check"
            >SMS
              <input type="checkbox" value="checkbox" name="notification-sms-type" :checked="account_settings.sms_news ? 'checked' : ''">
              <span class="checkmark" />
            </label>
            <label
              class="container_check"
            >Telefon
              <input type="checkbox" value="checkbox" name="notification-phone-type" :checked="account_settings.phone_news ? 'checked' : ''">
              <span class="checkmark" />
            </label>
          </div>
        </div>
        <div class="form-group">
          <label>Ani experienta</label>
          <es-datepicker
            :options="{
              maxDate: 'today',
            }"
          >
            <input
              id="datepicker-default"
              v-model="user.started_working_at"
              class="datepicker-input"
              name="datepicker-default"
              type="text"
              size="md"
              placeholder="Alege o data"
            >
          </es-datepicker>
        </div>
        <div class="form-group">
          <label>Limbi vorbite</label>
          <input
            v-model="user.languages"
            type="text"
            class="form-control"
            name="languages"
          >
        </div>
        <div class="form-group">
          <label>BIO* Scrie despre lucrurile care te pasioneaza</label>
          <textarea
            v-model="user.bio"
            class="form-control"
            :placeholder="
              `ex: Terapeut de masaj autorizat, practicând din 2013. Am experiență cu o clientelă diversă și sunt pricepută într-o varietate de tehnici de masaj. Imbin cele mai eficiente tehnici pentru o sesiune personalizată, adaptată nevoilor și preferințelor individuale.`"
            name="bio"
          />
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

<script>
  /* eslint-disable */
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';
  import { isEqual } from 'lodash-es';
  import { Datepicker } from '@/components/shared/datepicker';

  export default Vue.extend({
    name: 'es-client-account',

    components: {
      'es-datepicker': Datepicker,
    },

    data: () => ({
      isProfilePictureModalOpen: false,
      image: '',
      profilePicture: {},
      user: {
        first_name: '',
        last_name: '',
        email: '',
        bio: '',
        languages: '',
        started_working_at: '',
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
      const {
        first_name,
        last_name,
        email,
        account_setting,
        bio,
        languages,
        started_working_at,
      } = this.getUser;
      this.user = {
        first_name,
        last_name,
        email,
        bio,
        languages,
        started_working_at,
      };
      this.account_settings = { ...account_setting };
    },

    watch: {
      getUser(newVal, oldVal) {
        if (!isEqual(newVal, oldVal)) {
          this.$toasts.toast({
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
        getStatistics: 'elite/getStatistics'
      }),
      getBalance() {
        return this.getStatistics?.balance;
      },
    },

    methods: {
      ...mapActions({
        fetchStatistics: 'elite/fetchStatistics',
        updateElite: 'session/updateElite',
        updateProfilePicture: 'session/updateProfilePicture',
      }),
      handleFileUpload() {
        this.profilePicture = this.$refs['profile-picture'].files[0];
        this.createImage(this.profilePicture);
      },
      createImage(file) {
        var image = new Image();
        var reader = new FileReader();

        reader.onload = (e) => {
          this.image = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      async onSavePicture() {
        let formData = new FormData();
        formData.append('avatar', this.profilePicture, this.profilePicture.name);
        this.updateProfilePicture(formData);
      },

      onSave() {
        const {
          sms_news,
          email_news,
          phone_news,
        } = this.account_settings;
        if (sms_news || email_news || phone_news) {
          this.account_settings.send_app_notifications = true;
        }
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
    align-items: center;
    border-color: #ffffff;
    border-radius: 50%;
    border-style: solid;
    box-shadow: 0 0 8px 3px #b8b8b8;
    display: flex;
    height: 140px;
    justify-content: center;
    position: relative;
    width: 140px;
  }

  .profile-pic-container img,
  .profile-pic-container figure {
    border-radius: 50%;
    height: 140px;
    margin: 0;
    width: 140px;
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
