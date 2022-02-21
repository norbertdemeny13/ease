<template>
  <div class="es-payment-container">
    <h5>{{ $t('generic.address') }}</h5>
    <div v-if="getLocalAddresses.length">
      <div class="row mb-4">
        <div class="col-6">
          <div class="my-2 form-group">
            <div class="custom_select submit">
              <select
                id="address"
                v-model="getSelectedAddress"
                name="address"
                class="form-control wide"
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
      </div>
    </div>
    <div v-else class="my-4">
      <p>{{ $t('generic.please_add_an_address') }}</p>
    </div>
    <div v-if="!disabled" class="my-4">
      <a href="" class="my-4" @click.prevent="$emit('on-show-address-modal')">
        <i class="icon_plus" />
        {{ $t('generic.add_address') }}
      </a>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';

  export default Vue.extend({
    name: 'es-address-details',

    props: {
      disabled: {
        default: false,
        type: Boolean,
      },
    },

    data: () => ({
      selectedAddress: 0,
    }),

    computed: {
      ...mapGetters({
        getAddresses: 'address/getAddresses',
        getReservationAddress: 'address/getReservationAddress',
        getDefaultAddress: 'session/getUserDefaultAddress',
      }),

      getSelectedAddress: {
        get(): number {
          return this.selectedAddress;
        },
        set(val: number) {
          const routeName = this.$router.currentRoute.name;
          this.selectedAddress = val;
          this.setReservationAddress(val);

          if (routeName === 'Plata rezervare') {
            const address = this.getAddresses.find((item: any) => item.id === val);
            this.createReservationAddress({ address });
          }
        },
      },

      getLocalAddresses(): { id: string; label: string }[] {
        /* eslint-disable */
        const { getAddresses, selectedAddress } = this;
        const address = getAddresses.find((address: any) => address.id === selectedAddress);
        const isRestrictedView = this.$router.currentRoute.name === 'Plata rezervare';
        const filterAddress = address && isRestrictedView;
        return getAddresses && getAddresses
          .filter(({ city }: { city: any }) => filterAddress ? city.id === address.city.id : true)
          .map((
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
    },

    created() {
      this.fetchAddresses();
    },

    watch: {
      getAddresses(newVal) {
        if (newVal.length) {
          const addressId = this.getReservationAddress
              ? this.getReservationAddress.id
              : newVal.find((item: any) => item.main).id;
          this.selectedAddress = addressId;
          this.setReservationAddress(addressId);
        }
      },
    },

    methods: {
      ...mapActions({
        fetchAddresses: 'address/fetchAddresses',
        setReservationAddress: 'address/setReservationAddress',
        createReservationAddress: 'services/setReservationAddress',
      }),
    },
  });
</script>
