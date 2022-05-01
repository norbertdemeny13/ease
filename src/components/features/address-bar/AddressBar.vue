<template>
  <div class="page_header">
    <div :class="`container-fluid ${$router.currentRoute.query.pro_id ? 'd-flex justify-content-between' : ''}`">
      <es-skeleton-item v-if="isFetching" heigth="18px" width="200px" />
      <div v-else-if="isAuthenticated && getAddresses.length" class="row">
        <div class="my-2 mr-4 form-group">
          <div class="custom_select submit">
            <select
              id="address"
              v-model="getSelectedAddress"
              name="address"
              :class="`form-control wide ${disabled ? 'disable' : ''}`"
              :disabled="disabled"
            >
              <option
                v-for="address in getLocalAddresses"
                :key="address.id"
                :value="address.id"
              >
                {{ address.label }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div v-else class="row">
        <div v-if="hasAddress" class="ml-4 mt-2 d-md-block">
          <h1>{{ getLocation.formatted_address }}</h1>
          <a href="" @click.prevent="changeAddress = true">{{ $t('generic.change_address') }}</a>
        </div>
        <es-address-search v-else @on-cancel="changeAddress = false" @on-address-change="onAddressChange" />
      </div>
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
    <!-- /row -->
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';
  import { AddressSearch } from '@/components/shared/address-search';

  export default Vue.extend({
    name: 'es-address-bar',

    components: {
      'es-address-search': AddressSearch,
    },

    props: {
      disabled: {
        default: false,
        type: Boolean,
      },
    },

    data: () => ({
      changeAddress: false,
      selectedAddress: 0,
    }),

    computed: {
      ...mapGetters({
        getElite: 'elite/getElite',
        getLocation: 'address/getLocation',
        getAddresses: 'address/getAddresses',
        getReservationAddress: 'address/getReservationAddress',
        isFetching: 'address/isFetching',
        isAuthenticated: 'session/isAuthenticated',
      }),

      getSelectedAddress: {
        get() {
          return this.selectedAddress;
        },
        set(val) {
          const selectedAddress = this.getAddresses.find(address => address.id === val);
          this.selectedAddress = val;
          this.setReservationAddress(val);
          this.$emit('on-address-change', selectedAddress);
        },
      },

      getLocalAddresses() {
        /* eslint-disable */
        const { getAddresses } = this;

        return getAddresses && getAddresses.map((
          {
            street_name,
            street_number,
            city,
            id,
          }
        ) => {
          const label = `${street_number}, ${street_name}, ${this.$t(city.name)}`;
          return { id, label };
        });
      },

      hasAddress() {
        return this.getLocation && !this.changeAddress;
      },
    },

    async created() {
      const { query } = this.$router.currentRoute;

      if (query && query.pro_id) {
        this.fetchElite({ id: query.pro_id });
      }

      if (this.isAuthenticated) {
        await this.fetchAddresses();
        const mainAddress = this.getAddresses.find(({ main }) => main);
        this.selectedAddress = mainAddress?.id || 0;
      }
    },

    watch: {
      getLocation(newVal) {
        if (newVal) {
          this.changeAddress = false;
        }
      },
      getAddresses(newVal) {
        if (newVal.length) {
          const selectedAddressId = newVal.find((item) => item.main)?.id;
          const addressId = this.getReservationAddress
            ? this.getReservationAddress.id
            : selectedAddressId;
          this.selectedAddress = addressId;
          this.setReservationAddress(addressId);
        }
      },
      isAuthenticated(newVal, oldVal) {
        if (newVal && newVal !== oldVal) {
          this.fetchAddresses();
          const mainAddress = this.getAddresses.find(({ main }) => main);
          this.selectedAddress = mainAddress?.id || 0;
        }
      },
    },

    methods: {
      ...mapActions({
        fetchAddresses: 'address/fetchAddresses',
        setReservationAddress: 'address/setReservationAddress',
        fetchElite: 'elite/fetchElite',
        removeElite: 'elite/removeElite',
      }),
      onAddressChange(address) {
        this.$emit('on-address-change', address);
      },
    },
  });
</script>

<style type="text/css" scoped>
  i.icon_star {
    color: #fad055;
    font-size: 1.3rem;
  }

  .profile-pic-container img {
    width: 60px;
    height: 60px;
  }
</style>
