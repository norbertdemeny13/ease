<template>
  <div class="content bg_gray">
    <div class="es_reserve-massage-service-page container margin_30_20">
      <div class="d-flex justify-content-between">
        <a href="" class="back-button" @click.prevent="onBack()">
          {{ $t('generic.back') }}
        </a>
        <div v-if="$router.currentRoute.query.pro_id" class="d-flex align-items-center">
          <div class="profile-pic-container">
            <figure>
              <img v-if="getElite.avatar_path" :src="getElite.avatar_path" alt="Profile Pic" class="radius-50">
              <img v-else src="@/assets/png/avatar-profesionist.png" alt="Profile Pic">
            </figure>
          </div>
          <div class="d-flex align-getElites-center flex-column ml-2">
            <span>Rezervi cu</span>
            <span class="text-center">{{ getElite.display_name }}</span>
            <div class="ml-2"><i class="icon_star" /><span class="mt-1 ml-2">{{ Number(getElite.rating) > 0 ? getElite.rating : '0.0' }}</span></div>
          </div>
        </div>
      </div>
      <es-reserve-massage-skeleton v-if="isFetching" />
      <div v-else class="row my-4">
        <div class="col-xl-6 col-lg-6 col-md-12 px-6">
          <div class="row">
            <div class="col-12 owl-carousel massage-owl-carousel owl-theme categories_carousel_in">
              <div v-for="item in services" :key="item.uuid">
                <figure>
                  <img
                    :src="item.absolute_image_url_large"
                    :data-src="item.absolute_image_url_large"
                    class="img-fluid lazy"
                    alt=""
                  >
                </figure>
                <div class="text-center">
                  <h3>{{ $t(item.name) }}</h3>
                  <p>{{ $t(item.description) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-6 col-lg-6 col-md-12">
          <div class="px-3 pb-5">
            <div v-for="filter in massageFilters.slice(0,2)" :key="filter.id" class="form-group">
              <label v-if="!filter.isHidden">{{ filter.label }}</label>
              <div v-if="!filter.isHidden" class="my-2 row filters">
                <button
                  v-for="choice in filter.choices"
                  :key="choice.value"
                  :class="`btn btn-choice btn-small border px-6 mr-md-4 selection-item ${ choice.value === massageForm[filter.key] ? 'active' : ''} ${choice.disabled ? 'disabled' : ''}`"
                  @click="setValue(filter.key, choice.value)"
                >
                  {{ choice.label }}
                </button>
              </div>
            </div>
            <h3 v-if="massageType === 'couple'">{{ $t('summary.massageOne') }}</h3>
            <div v-for="filter in massageFilters.slice(2)" :key="filter.id" class="form-group">
              <label v-if="!filter.isHidden">{{ filter.label }}</label>
              <div v-if="!filter.isHidden" class="d-flex flex-wrap my-2">
                <button
                  v-for="choice in filter.choices"
                  :key="choice.value"
                  :class="`${filter.length === 1 ? 'col-3' : 'col'} btn btn-choice btn-small border px-6 mr-4 ${ choice.value === massageForm[filter.key] ? 'active' : ''}`"
                  @click="setValue(filter.key, choice.value)"
                >
                  {{ choice.label }}
                </button>
              </div>
            </div>
            <div v-if="massageForm.form === 'aromaterapeutic'" class="d-flex flex-column align-items-center">
              <h6>{{ $t('generic.add_aromatherapeutic_oil') }}</h6>
              <a href="#modal-dialog" class="modal_dialog text-pink" @click.prevent>{{ $t('generic.learn_more') }}</a>
            </div>
            <es-additional-services
              :services="getComplementaryServices"
            />
            <div class="d-flex justify-content-end">
              <a
                class="btn btn-sm btn-pink btn-pill mt-4 px-6"
                href=""
                @click.prevent="onContinue"
              >
                {{ $t('generic.continue') }}
              </a>
            </div>
            <es-aromaterapeutic-modal v-if="selectedService.therapeutic_forms.length > 1" :product="selectedService.therapeutic_forms[1]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { mapGetters, mapActions } from 'vuex';
  import { AdditionalServices } from '@/components/shared/additional-services';
  import { AromaterapeuticModal } from '@/components/features/aromaterapeutic-modal';
  import ReserveMassageSkeleton from './ReserveMassageSkeleton.vue';
  /* eslint-disable */
  export default Vue.extend({
    name: 'es-reserve-massage',

    components: {
      'es-additional-services': AdditionalServices,
      'es-aromaterapeutic-modal': AromaterapeuticModal,
      'es-reserve-massage-skeleton': ReserveMassageSkeleton,
    },

    data: () => ({
      selectedService: null,
      showAromaterapeuticModal: false,
      massageType: null,
      isTargetedReservation: false,
      massageForm: {
        type: '',
        genre: 'any_gender',
        duration: 60,
        form: 'classic',
        terapeut: 'single',
      },
    }),

    computed: {
      ...mapGetters({
        getElite: 'elite/getElite',
        getServicesByType: 'services/getServicesByType',
        getServiceById: 'services/getServiceById',
        getSelectedServices: 'services/getSelectedServices',
        getMassageInfo: 'services/getMassageInfo',
        isFetching: 'services/isFetching',
        isAuthenticated: 'session/isAuthenticated',
        getUser: 'session/getUser',
      }),

      massageFilters() {
        const { durations, therapeutic_forms } = this.selectedService;
        return [
          {
            label: this.$t('massage.massageDuration'),
            key: 'duration',
            length: durations.length,
            choices: durations.map(item => ({ label: `${item} min`, value: item })),
          },
          {
            label: this.$t('generic.therapist_number'),
            key: 'terapeut',
            isCouple: true,
            choices: [
              {
                label: this.$t('generic.one_therapist'),
                value: 'single',
              },
              {
                label: this.$t('generic.two_therapists'),
                value: 'double',
                disabled: this.isTargetedReservation,
              },
            ],
          },
          {
            label: this.$t('massage.gender'),
            key: 'genre',
            isHidden: this.isTargetedReservation,
            length: 3,
            choices: [
              {
                label: this.$t('massage.genderF'),
                value: 'female',
              },
              {
                label: this.$t('massage.genderAny'),
                value: 'any_gender',
              },
              {
                label: this.$t('massage.genderM'),
                value: 'male',
              },
            ],
          },
          {
            label: this.$t('massage.form'),
            key: 'form',
            length: therapeutic_forms.length,
            choices: therapeutic_forms.map(({ id }) => (
              {
                label: id === 1 ? this.$t('massage.formClassic') : this.$t('massage.fromAroma'),
                value: id === 1 ? 'classic' : 'aromaterapeutic',
              }),
            ),
          },
        ].filter(item => this.massageType === 'single' && item.key === 'terapeut' ? false : true);
      },

      getComplementaryServices() {
        const { terapeut } = this.massageForm;
        const { type } = this.$router.currentRoute.query;
        return this.selectedService.complementary_services
          .filter(item => (type === 'couple' && terapeut === 'single') ? !item.is_four_hands : item);
      },
      services() {
        return this.getServicesByType[0]?.services
          .map(item => ({
            ...item,
            complementary_services: item.complementary_services
              .map(complementaryItem => ({ ...complementaryItem, selectedCount: 0 })),
          }));
      },
    },

    watch: {
      isFetching(newVal) {
        if (!newVal) {
          const index = this.services?.map(item => item.uuid).indexOf(this.selectedService?.uuid);
          setTimeout(() => {
            window.initMassageCarousel(this.getActiveCarouselId);
            window.goToMassageCarouselIndex([index, 250]);
            window.initModal();
          }, 300);
        }
      },
      selectedService(newVal) {
        if (newVal.durations.length === 1) {
          this.massageForm.duration = 60;
        }
      },
      getServicesByType(newVal) {
        const [selectedService] = this.getSelectedServices;
        const [service] = newVal;

        const [firstService] = service.services
          .map(item => ({
            ...item,
            complementary_services: item.complementary_services
              .map(complementaryItem => ({ ...complementaryItem, selectedCount: 0 })),
          }));
        if (newVal) {
          this.selectedService = selectedService || firstService;
        }
      },
      'massageForm.form': {
        handler() {
          setTimeout(() => {
            window.initModal();
          }, 300);
        },
      },
    },

    mounted() {
      window.initModal();
    },

    created() {
      const { type } = this.$router.currentRoute.query;
      const { query } = this.$router.currentRoute;
      const { getMassageInfo } = this;

      if (getMassageInfo) {
        const { duration, terapeut, genre } = getMassageInfo;
        this.massageForm.terapeut = terapeut;
        this.massageForm.duration = duration;
        this.massageForm.genre = genre;
      }

      this.massageType = type;

      const [selectedService] = this.getSelectedServices;

      if (selectedService) {
        const { massageForm } = selectedService;
        this.selectedService = selectedService;
        this.massageForm.duration = massageForm.duration;
        this.massageForm.form = massageForm.form;
        this.massageForm.genre = massageForm.genre;
      }

      this.massageForm.type = type;

      if (query && query.pro_id) {
        this.isTargetedReservation = true;
        this.fetchServicesByType({ type, id: this.getElite.id });
      } else {
        this.fetchServicesByType({ type });
      }
    },

    methods: {
      ...mapActions({
        fetchElite: 'elite/fetchElite',
        fetchServicesByType: 'services/fetchServicesByType',
        fetchServiceById: 'services/fetchServiceById',
      }),

      setValue(key, value) {
        this.massageForm[key] = value;
      },
      getActiveCarouselId(info) {
        const index = info ? info.item.index : 0;
        this.selectedService = this.services ? this.services[index] : null;
      },

      onBack() {
        const { query } = this.$router.currentRoute;
        let endpoint = query?.pro_id
          ? `/servicii?pro_id=${query.pro_id}`
          : '/servicii';
        this.$router.push(endpoint);
        this.$store.commit('services/removeReservationDetails');
      },

      async onContinue() {
        const {
          type,
          terapeut,
          duration,
          genre,
        } = this.massageForm;
        const { query } = this.$router.currentRoute;
        const eliteId = this.getElite.id;
        const { massageType } = this;
        const { uuid } = this.selectedService;

        if (!this.isAuthenticated && massageType === 'single') {
          this.$root.$emit('on-show-login');
          return;
        }

        if (this.isAuthenticated) {
          if (this.getUser.user_type === 'elite') {
            this.$toasts.toast({
              id: 'warning-toast',
              intent: 'warning',
              message: this.$t('toast.login_as_client'),
              title: this.$t('toast.warning_title'),
            });

            return;
          }

          // show phone modal if address is not set
          if (!this.getUser.phone_number_confirmed) {
            this.$root.$emit('on-show-validate-phone-modal');
            return;
          }

          // show address modal if address is not set
          if (!this.getUser.addresses.length) {
            this.$root.$emit('on-show-address-modal');
            return;
          }
        }

        await this.fetchServiceById({ type, id: uuid, duration, terapeut });
        const selectedService = {
          ...this.selectedService,
          massageType: 'couple_1',
          massageForm: this.massageForm,
          prices: this.getServiceById.prices,
        };
        this.$store.commit('services/setSelectedMassageService', { service: selectedService, type: massageType });
        this.$store.commit('services/setMassageInfo', { terapeut, duration, genre });

        const isReflexoMassage = this.selectedService.name.includes('reflexo');

        if (isReflexoMassage) {
          this.$toasts.toast({
            id: 'warning-toast',
            intent: 'warning',
            message: this.$t('massage.reflexoAlertDescription'),
            title: this.$t('toast.warning_title'),
          });
        }

        if (massageType === 'single') {
          await this.$store.dispatch('services/createMassageReservation', eliteId);
          await this.$router.push(`/servicii/${type}/${uuid}/rezerva`);
        } else {
          let endpoint = query?.pro_id
            ? `/new/servicii/masaj?type=${type}&pro_id=${query.pro_id}`
            : `/new/servicii/masaj?type=${type}`;
          await this.$router.push(endpoint);
        }
      },
      getFilterClasses(filter) {
        switch (filter.length) {
          case 1:
            return 'col-3';
          case 2:
            return 'col-sm-12 col-md-8 col-lg-4';
          case 3:
            return 'col-sm-12 col-md-8 col-lg-3'
          default:
            return 'col-sm-12 col-md-8 col-lg-5';
        }
      }
    },
  });
</script>

<style type="text/css" scoped>
  i.icon_star {
    color: #fad055;
    font-size: 1.3rem;
  }

  .profile-pic-container img {
    height: 60px;
    width: 60px;
  }
</style>
