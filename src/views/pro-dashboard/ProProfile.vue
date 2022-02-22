<template>
  <div class="es_pro-account-container content">
    <h2>{{ $t('views.pro_dashboard.profile') }}</h2>
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
        <h6>Sold</h6>
        <h3>{{ `${getBalance.available} Lei` }}</h3>
        <h6>{{ `${getBalance.pending} Lei disponibili` }}</h6>
        <div class="d-flex justify-content-start">
          <a
            class="btn btn-sm btn-stripe my-4 px-6"
            :href="getStripeUrl"
            target="_blank"
          >
            {{ $t('views.pro_dashboard.my_stripe_account') }}
          </a>
        </div>
      </div>
    </div>
    <es-divider />
    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <label>{{ $t('generic.first_name') }}</label>
          <input
            v-model="user.first_name"
            type="text"
            class="form-control"
            name="name"
          >
        </div>
        <div class="form-group">
          <label>{{ $t('generic.name') }}</label>
          <input
            v-model="user.last_name"
            type="text"
            class="form-control"
            name="firstName"
          >
        </div>
        <div class="form-group">
          <label>{{ $t('generic.email_address') }}</label>
          <input
            v-model="user.email"
            class="form-control"
            disabled
            type="text"
            name="email"
          >
        </div>
        <div class="form-group">
          <label>{{ $t('generic.notifications') }}</label>
          <div class="radio_c_group">
            <label
              class="container_check"
            >{{ $t('generic.email') }}
              <input type="checkbox" value="checkbox" name="notification-email-type" :checked="account_settings.email_news ? 'checked' : ''">
              <span class="checkmark" />
            </label>
            <label
              class="container_check"
            >{{ $t('generic.sms') }}
              <input type="checkbox" value="checkbox" name="notification-sms-type" :checked="account_settings.sms_news ? 'checked' : ''">
              <span class="checkmark" />
            </label>
            <label
              class="container_check"
            >{{ $t('generic.phone') }}
              <input type="checkbox" value="checkbox" name="notification-phone-type" :checked="account_settings.phone_news ? 'checked' : ''">
              <span class="checkmark" />
            </label>
          </div>
        </div>
        <div class="form-group">
          <label>{{ $t('views.pro_dashboard.years_of_experience') }}</label>
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
          <label>{{ $t('views.pro_dashboard.spoken_languages') }}</label>
          <input
            v-model="user.languages"
            type="text"
            class="form-control"
            name="languages"
          >
        </div>
        <div class="form-group">
          <label>{{ $t('views.pro_dashboard.bio') }}</label>
          <textarea
            v-model="user.bio"
            class="form-control"
            :placeholder="
              $t('views.pro_dashboard.bio_placeholder')"
            name="bio"
          />
        </div>
        <div class="d-flex justify-content-end">
          <button
            class="btn btn-sm btn-pink btn-pill my-4 px-6"
            @click.prevent="onSave()"
          >
            {{ $t('generic.save') }}
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
    name: 'es-pro-account',

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
      this.fetchStripeSSO();
      // TODO: Get stripe url, or generate if you don't have it 
      // this.registerEliteStripe();
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
            title: this.$t('toast.success_title'),
            message: this.$t('toast.account_update'),
            intent: 'success',
          });
        }
      },
    },

    computed: {
      ...mapGetters({
        getUser: 'session/getUser',
        getStatistics: 'elite/getStatistics',
        getStripeSSO: 'elite/getStripeSSO',
      }),
      getBalance() {
        return this.getStatistics?.balance;
      },
      getStripeUrl() {
        return this.getStripeSSO?.url || '';
      },
    },

    methods: {
      ...mapActions({
        fetchStatistics: 'elite/fetchStatistics',
        registerEliteStripe: 'elite/registerEliteStripe',
        updateElite: 'session/updateElite',
        updateProfilePicture: 'session/updateProfilePicture',
        fetchStripeSSO: 'elite/fetchStripeSSO',
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
