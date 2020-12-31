<template>
  <div class="content">
    <div class="es_reserve-massage-service-page container margin_30_20">
      <router-link class="back-button" to="/servicii/">
        Inapoi
      </router-link>
      <div class="row my-4">
        <div class="col-xl-6 col-lg-6 col-md-6 px-6">
          <div class="row">
            <div class="col-12 owl-carousel owl-theme categories_carousel_in">
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
          <div v-if="isFetching">Fetching ...</div>
          <div v-else class="p-5">
            <h3 class="text-right">De la {{ selectedService.price_from }}</h3>
            <div v-for="filter in massageFilters" :key="filter.id" class="form-group">
              <label>{{ filter.label }}</label>
              <div class="d-flex flex-inline my-2">
                <button
                  v-for="choice in filter.choices"
                  :key="choice.value"
                  :class="`btn btn-choice btn-small border px-6 mr-4 ${ choice.value === massageForm[filter.key] ? 'active' : ''}`"
                  @click="setValue(filter.key, choice.value)"
                >
                  {{ choice.label }}
                </button>
              </div>
            </div>
            <es-additional-services
              :services="selectedService.complementary_services"
            />
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
  import { MASSAGE_FILTERS_SINGLE, MASSAGE_FILTERS_COUPLE } from '@/constants/massage-filters';

  export default Vue.extend({
    name: 'es-reserve-massage',

    components: {
      'es-additional-services': AdditionalServices,
    },

    data: () => ({
      selectedService: null,
      massageForm: {
        type: '',
        genre: 'oricare',
        duration: '60',
        form: 'clasic',
        terapeut: 'single',
      },
    }),

    computed: {
      ...mapGetters({
        getServicesByType: 'getServicesByType',
        isFetching: 'isFetching',
      }),

      massageFilters() {
        return this.massageForm.type === 'single'
          ? MASSAGE_FILTERS_SINGLE
          : MASSAGE_FILTERS_COUPLE;
      },
      services() {
        return this.getServicesByType[0]?.services;
      },
    },

    watch: {
      isFetching(newVal) {
        if (!newVal) {
          setTimeout(() => {
            window.initMassageCarousel(this.getActiveCarouselId);
          }, 300);
        }
      },
      getServicesByType(newVal) {
        const [service] = newVal;
        const [firstService] = service.services;
        if (newVal) {
          this.selectedService = firstService;
        }
      },

      'massageForm.type': function onTypeChange(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.fetchServicesByType({ type: newVal });
        }
      },
    },

    created() {
      const { type } = this.$router.currentRoute.query;
      this.massageForm.type = type;
      this.fetchServicesByType({ type });
    },

    methods: {
      ...mapActions({
        fetchServicesByType: 'fetchServicesByType',
      }),
      setValue(key, value) {
        this.massageForm[key] = value;
      },
      getActiveCarouselId(info) {
        const index = info ? info.item.index : 0;
        this.selectedService = this.services ? this.services[index] : null;
      },
    },
  });
</script>
