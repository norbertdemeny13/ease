<!-- eslint-disable -->
<template>
  <div class="es_services-container content">
    <div class="container margin_30_20">
      <es-address-bar @on-address-change="onAddressChange" />
      <services-list-skeleton v-if="isFetching" />
      <services-list
        v-else
        :services="services"
      />
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { mapGetters, mapActions } from 'vuex';
  import { ServicesList, ServicesListSkeleton } from '@/components/features/services-list';
  import ogImage from '@/assets/jpg/lucreaza_cu_noi.jpg';
  import { isEqual } from 'lodash-es';

  export default Vue.extend({
    name: 'es-services',

    components: {
      'services-list': ServicesList,
      'services-list-skeleton': ServicesListSkeleton,
    },
    /* eslint-disable */
    metaInfo: {
      title: 'Obtine o experienta ca la salon in siguranta casei tale',
      titleTemplate: null,
      description: 'Descopera serviciile Ease si bucura-te de o experienta personalizata, preturi transparente, fara sa irosesti timp in trafic sau in sali de asteptare.',
      meta: [
        { name: 'og:title', content: 'Obtine o experienta ca la salon in siguranta casei tale' },
        { name: 'og:description', content: 'Descopera serviciile Ease si bucura-te de o experienta personalizata, preturi transparente, fara sa irosesti timp in trafic sau in sali de asteptare.' },
        { name: 'og:image', content: ogImage },
      ],
    },

    computed: {
      ...mapGetters({
        getServices: 'services/getServices',
        isFetching: 'services/isFetching',
        getLocation: 'address/getLocation',
      }),

      services() {
        return this.getServices;
      },
    },

    watch: {
      isFetching(newVal) {
        if (!newVal) {
          setTimeout(() => {
            window.initEase();
          }, 0);
        }
      },
      $route: {
        handler(newVal, oldVal) {
          const { query } = newVal;
          if (!isEqual(newVal, oldVal)) {
            if (query && query.pro_id) {
              this.fetchServices(query.pro_id);
            } else {
              this.fetchServices();
            }
          }
        },
        deep: true,
      },

    },

    created() {
      const { query } = this.$router.currentRoute;

      if (query && query.pro_id) {
        this.fetchServices(query.pro_id);
      } else {
        this.fetchServices();
      }
      this.$store.commit('services/removeSelectedServices');
    },

    mounted() {
      window.initEase();
    },

    methods: {
      ...mapActions({
        fetchLocation: 'address/fetchLocation',
        fetchServices: 'services/fetchServices',
        setDefaultAddress: 'address/setDefaultAddress',
      }),
      async onAddressChange(address) {
        const id = address?.id;
        const { query } = this.$router.currentRoute;
        const city = address.address_components
          ? address.address_components.filter(item => item.types.includes('locality'))
          : address.city;

        let cityId = city.id;

        if (!cityId) {
          cityId = city[0]?.short_name?.toLowerCase().includes('cluj') ? 1 : 2;
        }

        if (cityId) {
          localStorage.setItem('city_id', cityId || null);
        }

        if (cityId && id) {
          await this.setDefaultAddress({ id, cityId });
        }

        if (query && query.pro_id) {
          this.fetchServices(query.pro_id);
        } else {
          this.fetchServices();
        }
      },
    },
  });
</script>
