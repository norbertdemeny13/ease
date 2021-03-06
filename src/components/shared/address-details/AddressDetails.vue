<template>
  <div class="es-payment-container">
    <h5>Adresa</h5>
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
      <p>Te rugam sa adaugi o adresa</p>
    </div>
    <div class="my-4">
      <a href="" class="my-4" @click.prevent="$emit('on-show-address-modal')">
        <i class="icon_plus" />
        Adauga adresa
      </a>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapGetters } from 'vuex';

  export default Vue.extend({
    name: 'es-address-details',

    data: () => ({
      selectedAddress: 0,
    }),

    computed: {
      ...mapGetters({
        getAddresses: 'address/getAddresses',
        getDefaultAddress: 'session/getUserDefaultAddress',
      }),

      getSelectedAddress: {
        get(): number {
          return this.selectedAddress;
        },
        set(val: number) {
          this.selectedAddress = val;
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
          const label = `${street_number}, ${street_name}, ${city.name}`;
          return { id, label };
        });
      },
    },

    watch: {
      getAddresses(newVal) {
        if (newVal.length) {
          this.selectedAddress = newVal.filter((item: any) => item.main)[0].id;
        }
      },
    },
  });
</script>
