<template>
  <div class="page_header my-4">
    <div class="container">
      <es-skeleton-item v-if="isFetching" heigth="18px" width="200px" />
      <div v-else-if="isAuthenticated && getAddresses.length" class="row">
        <div class="my-2 ml-4 form-group">
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
        <es-address-search v-else @on-cancel="changeAddress = false" />
      </div>
    <!-- /row -->
    </div>
  </div>
</template>

<script lang="ts">
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
        getLocation: 'address/getLocation',
        getAddresses: 'address/getAddresses',
        getReservationAddress: 'address/getReservationAddress',
        isFetching: 'address/isFetching',
        isAuthenticated: 'session/isAuthenticated',
      }),

      getSelectedAddress: {
        get(): number {
          return this.selectedAddress;
        },
        set(val: number) {
          const selectedAddress = this.getAddresses.find((address: any) => address.id === val);
          this.selectedAddress = val;
          this.setReservationAddress(val);
          this.$emit('on-address-change', selectedAddress);
        },
      },

      getLocalAddresses(): { id: string; label: string }[] {
        /* eslint-disable */
        const { getAddresses } = this;

        return getAddresses && getAddresses.map((
          {
            street_name,
            street_number,
            city,
            id,
          }: {
            street_number: string;
            street_name: string;
            id: string;
            city: any;
          },
        ) => {
          const label = `${street_number}, ${street_name}, ${this.$t(city.name)}`;
          return { id, label };
        });
      },

      hasAddress(): boolean {
        return this.getLocation && !this.changeAddress;
      },
    },

    async created() {
      if (this.isAuthenticated) {
        await this.fetchAddresses();
        const mainAddress = this.getAddresses.find(({ main }: { main: boolean}) => main);
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
          const selectedAddressId = newVal.find((item: any) => item.main).id;
          const addressId = this.getReservationAddress
            ? this.getReservationAddress.id
            : selectedAddressId;
          this.selectedAddress = addressId;
          this.setReservationAddress(addressId);
        }
      },
      isAuthenticated(newVal, oldVal) {
        if (newVal && newVal !== oldVal) {
          const mainAddress = this.getAddresses.find(({ main }: { main: boolean}) => main);
          this.selectedAddress = mainAddress?.id || 0;
        }
      },
    },

    methods: {
      ...mapActions({
        fetchAddresses: 'address/fetchAddresses',
        setReservationAddress: 'address/setReservationAddress',
      }),
    },
  });
</script>
