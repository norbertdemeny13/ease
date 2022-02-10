<template>
  <div class="es_pro-account-container content">
    <h4>{{ $t('views.pro_dashboard.profile') }}</h4>
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
            <h6>{{ getUser.first_name }}</h6>
            <p class="m-0">{{ getUser.elite_id }}</p>
          </div>
        </div>
      </div>
      <div v-if="getUser.stripe_account_created && getBalance && getStripeUrl" class="col-md-4">
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
          <label>{{ $t('generic.display_name') }}</label>
          <input
            v-model="user.display_name"
            type="text"
            class="form-control"
            name="displayName"
          >
        </div>
        <div class="form-group">
          <label>{{ $t('generic.name') }}</label>
          <input
            v-model="user.last_name"
            class="form-control"
            type="text"
            name="lastName"
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
      </div>
    </div>
    <div v-if="!getUser.heard_from" class="row">
      <div class="col-md-4">
        <div class="form-group">
          <label>{{ $t('views.pro_dashboard.how_did_you_find_out_about_ease') }}</label>
          <div class="radio_c_group d-flex flex-column">
            <label
              v-for="option in heardFromUs"
              :key="option.value"
              class="container_radio"
              @click="user.heard_from = option.value"
            >{{ option.label }}
              <input type="radio" value="checkbox" name="type" :checked="option.value === user.heard_from ? 'checked' : ''">
              <span class="checkmark" />
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <label required>{{ $t('views.pro_dashboard.gender') }}</label>
          <div class="radio_c_group d-flex flex-column">
            <label
              class="container_radio"
              @click="user.gender = 'male'"
            >{{ $t('gender_male') }}
              <input type="radio" value="checkbox" name="gender" :checked="user.gender === 'male' ? 'checked' : ''">
              <span class="checkmark" />
            </label>
          </div>
          <div class="radio_c_group d-flex flex-column">
            <label
              class="container_radio"
              @click="user.gender = 'female'"
            >{{ $t('gender_female') }}
              <input type="radio" value="checkbox" name="gender" :checked="user.gender === 'female' ? 'checked' : ''">
              <span class="checkmark" />
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <label required>{{ $t('views.pro_dashboard.active_city') }}</label>
          <div class="radio_c_group d-flex flex-column">
            <label
              class="container_radio"
              @click="user.working_city_id = 2"
            >{{ $t('city.bucuresti') }}
              <input type="radio" value="checkbox" name="active-city" :checked="user.working_city_id === 2 ? 'checked' : ''">
              <span class="checkmark" />
            </label>
          </div>
          <div class="radio_c_group d-flex flex-column">
            <label
              class="container_radio"
              @click="user.working_city_id = 1"
            >{{ $t('city.cluj_napoca') }}
              <input type="radio" value="checkbox" name="active-city" :checked="user.working_city_id === 1 ? 'checked' : ''">
              <span class="checkmark" />
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <label>{{ $t('views.pro_dashboard.company_name') }}</label>
          <input
            v-model="user.company_name"
            type="text"
            class="form-control"
            name="company_name"
          >
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <label>{{ $t('views.pro_dashboard.cif_number') }}</label>
          <input
            v-model="user.cif_number"
            type="text"
            class="form-control"
            name="cif_number"
          >
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <label>{{ $t('views.pro_dashboard.registration_number') }}</label>
          <input
            v-model="user.registration_number"
            type="text"
            class="form-control"
            name="registration_number"
          >
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div v-if="!getUser.expected_salary" class="form-group">
          <label required>{{ $t('views.pro_dashboard.how_much_you_hope_to_earn') }}</label>
          <input
            id="earning"
            v-model="user.expected_salary"
            type="text"
            required
            class="form-control"
            name="earning"
          >
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
  import { getUtcToZonedTime } from '@/utils/date-helpers';
  import { Datepicker } from '@/components/shared/datepicker';

  export default Vue.extend({
    name: 'es-pro-account',

    components: {
      'es-datepicker': Datepicker,
    },

    data() {
      return {
        services: {},
        heardFromUs: [
          { value: 'bestjobs', label: this.$t('views.pro_dashboard.heard_from_bestjobs') },
          { value: 'ejobs', label: this.$t('views.pro_dashboard.heard_from_ejobs') },
          { value: 'google', label: this.$t('views.pro_dashboard.heard_from_google') },
          { value: 'article', label: this.$t('views.pro_dashboard.heard_from_press_article') },
          { value: 'instagram', label: this.$t('views.pro_dashboard.heard_from_instagram') },
          { value: 'facebook', label: this.$t('views.pro_dashboard.heard_from_facebook') },
          { value: 'prieten', label: this.$t('views.pro_dashboard.heard_from_friend') },
          { value: 'ease_pro', label: this.$t('views.pro_dashboard.heard_from_ease_pro') },
          { value: 'other', label: this.$t('views.pro_dashboard.heard_from_other') },
        ],
        isProfilePictureModalOpen: false,
        image: '',
        profilePicture: {},
        user: {
          first_name: '',
          last_name: '',
          email: '',
          expected_salary: '',
          bio: '',
          languages: '',
          started_working_at: '',
          gender: '',
          heard_from: '',
          working_city_id: '',
        },
        account_settings: {
          send_app_notifications: false,
          sms_news: false,
          email_news: false,
          phone_news: false,
        },
      };
    },

    created() {
      const { stripe_account_created } = this.getUser;
      const { query } = this.$router.currentRoute;

      this.fetchStatistics();

      if (stripe_account_created) {
        this.fetchStripeSSO();
      }


      if (query && query.code && !stripe_account_created) {
        this.registerEliteStripe(query.code);
      }
      this.user = { ...this.getUser };
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
        return this.getStripeSSO?.url;
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
        this.user.started_working_at = getUtcToZonedTime(this.$data.user.started_working_at).toDateString();
        this.onSavePicture();
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
