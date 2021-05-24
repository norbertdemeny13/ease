<template>
  <div class="content">
    <div class="es_reserve-massage-service-page container margin_30_20">
      <router-link class="back-button" to="/servicii/">
        Inapoi
      </router-link>
      <es-reserve-massage-skeleton v-if="isFetching" />
      <div v-else class="row my-4">
        <div class="col-xl-6 col-lg-6 col-md-6 px-6">
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
                  <h3>{{ item.name }}</h3>
                  <p>{{ item.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-6 col-lg-6 col-md-6 bg_gray">
          <div class="p-5">
            <h3 class="text-right">De la {{ selectedService.price_from }}</h3>
            <div v-for="filter in massageFilters.slice(0,2)" :key="filter.id" class="form-group">
              <label>{{ filter.label }}</label>
              <div class="d-flex my-2">
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
            <h3 v-if="massageType === 'couple'">Masaj 1</h3>
            <div v-for="filter in massageFilters.slice(2)" :key="filter.id" class="form-group">
              <label>{{ filter.label }}</label>
              <div class="d-flex my-2">
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
              <h6>Adauga puterea uleiurilor esentiale 100% pure</h6>
              <a href="#modal-dialog" class="modal_dialog" @click.prevent>Mai multe</a>
            </div>
            <es-additional-services
              :services="getComplementaryServices"
            />
            <div class="d-flex justify-content-center">
              <a
                class="btn btn-sm btn-pink btn-pill mt-4 px-6"
                href=""
                @click.prevent="onContinue"
              >
                Continua
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
        getServicesByType: 'services/getServicesByType',
        getServiceById: 'services/getServiceById',
        getSelectedServices: 'services/getSelectedServices',
        getMassageInfo: 'services/getMassageInfo',
        isFetching: 'services/isFetching',
        isAuthenticated: 'session/isAuthenticated',
      }),

      massageFilters() {
        const { durations, therapeutic_forms } = this.selectedService;
        return [
          {
            label: 'Durata Masaj',
            key: 'duration',
            length: durations.length,
            choices: durations.map(item => ({ label: `${item} min`, value: item })),
          },
          {
            label: 'Numar Terapeut',
            key: 'terapeut',
            isCouple: true,
            choices: [
              {
                label: '1 - Masaj pe rand',
                value: 'single',
              },
              {
                label: '2 - Masaj simultan',
                value: 'double',
              },
            ],
          },
          {
            label: 'Gen Terapeut',
            key: 'genre',
            length: 3,
            choices: [
              {
                label: 'Feminin',
                value: 'female',
              },
              {
                label: 'Oricare',
                value: 'any_gender',
              },
              {
                label: 'Masculin',
                value: 'male',
              },
            ],
          },
          {
            label: 'Forma Masaj',
            key: 'form',
            length: therapeutic_forms.length,
            choices: therapeutic_forms.map(({ id }) => (
              {
                label: id === 1 ? 'Classic' : 'Aromaterapeutic',
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
          const index = this.services.map(item => item.uuid).indexOf(this.selectedService?.uuid);
          setTimeout(() => {
            window.initMassageCarousel(this.getActiveCarouselId);
            window.goToMassageCarouselIndex([index, 250]);
            window.initModal();
          }, 300);
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
      this.fetchServicesByType({ type });
    },

    methods: {
      ...mapActions({
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

      async onContinue() {
        const {
          type,
          terapeut,
          duration,
          genre,
        } = this.massageForm;
        const { massageType } = this;
        const { uuid } = this.selectedService;

        if (!this.isAuthenticated && massageType === 'single') {
          this.$root.$emit('on-show-login');
          return;
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

        if (massageType === 'single') {
          await this.$store.dispatch('services/createMassageReservation');
          await this.$router.push(`/servicii/${type}/${uuid}/rezerva`);
        } else {
          await this.$router.push(`/new/servicii/masaj?type=${type}`);
        }
      },
    },
  });
</script>
