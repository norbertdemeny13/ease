<template>
  <portal to="modal">
    <es-modal
      id="modal"
      size="sm"
      :on-dismiss="() => $emit('is-open', false)"
    >
      <div class="container es-address-modal mt-12">
        <!-- Sign In Modal -->
        <div id="es-modal-dialog" class="es-request-phone-validation-modal">
          <div class="modal_header">
            <h3>Adauga adresa</h3>
            <button type="button" class="mfp-close" @click.prevent="$emit('is-open', false)" />
          </div>
          <div class="address-wrapper">
            <div class="d-flex flex-column form-group">
              <label>Cauta adresa ta</label>
              <div class="d-flex align-items-center">
                <input
                  ref="search"
                  v-model="location"
                  placeholder="Introdu o locatie"
                  class="form-control pr-6"
                  type="text"
                >
                <a v-if="location" href="" @click.prevent="location = null"><i class="ml-n4 icon_trash" /></a>
              </div>
            </div>
            <div class="form-group">
              <label>Strada</label>
              <input
                v-model="address.street_name"
                disabled
                type="text"
                class="form-control"
                name="street"
              >
            </div>
            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label>Numar</label>
                  <input
                    v-model="address.street_number"
                    disabled
                    type="text"
                    class="form-control"
                    name="number"
                  >
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label>Ap</label>
                  <input
                    v-model="address.apartment_number"
                    type="text"
                    class="form-control"
                    name="app"
                  >
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label>Etaj</label>
                  <input
                    v-model="address.floor"
                    type="text"
                    class="form-control"
                    name="floor"
                  >
                </div>
              </div>
            </div>
            <div class="form-group">
              <label>Oras</label>
              <input
                :value="city"
                disabled
                type="text"
                class="form-control"
                name="city"
              >
            </div>
            <div class="form-group">
              <label>Nota</label>
              <input
                v-model="address.notes"
                type="text"
                class="form-control"
                name="notes"
              >
            </div>
            <div class="text-left my-2">
              <button
                class="btn_1"
                @click.prevent="onAddAddress()"
              >
                Adauga
              </button>
            </div>
          </div>
          <!--form -->
        </div>
        <!-- /Sign In Modal -->
      </div>
    </es-modal>
  </portal>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue';
  import { mapGetters, mapActions } from 'vuex';

  export default Vue.extend({
    name: 'es-address-modal',

    model: {
      prop: 'is-open',
      event: 'is-open',
    }, // model

    props: {
      isOpen: {
        required: true,
        type: Boolean as PropType<boolean>,
      },
    },
    /* eslint-disable */
    data: () => ({
      location: null,
      city: '',
      address: {
        street_name: null,
        street_number: null,
        address_type: null,
        pets: null,
        parking: null,
        notes: null,
        floor: null,
        apartment_number: null,
        postcode: null,
        lat: null,
        lng: null,
        equipment_ids: [],
      },
    }),

    computed: {
      ...mapGetters({
        getLocationError: 'address/getLocationError',
        getLocationById: 'address/getLocationById',
        isFetching: 'address/isFetching',
      }),
    },

    watch: {
      getLocationError(newVal) {
        (this as any).$toasts.toast({
          intent: 'error',
          id: 'address-toast',
          title: 'Action required',
          message: 'Te rugam sa introduci o adresa corecta!',
        });
      },

      getLocationById(newVal, oldVal) {
        this.fetchAddresses();
        this.$emit('is-open', false);
      },
    },

    mounted() {
      (window as any).checkAndAttachMapScript(this.initLocationSearch);
    },

    methods: {
      ...mapActions({
        fetchLocation: 'address/fetchLocation',
        fetchAddresses: 'address/fetchAddresses',
        setAddress: 'address/setAddress',
      }),

      async initLocationSearch() {
        await this.$nextTick();
        const autocomplete = new (window as any).google.maps.places.Autocomplete(this.$refs.search);
        autocomplete.setFields(['geometry.location','address_component','formatted_address', 'name']);
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          const selectedCity = place.address_components
            .filter((item: any) => item.types.includes('locality'))[0].short_name;
          this.address.street_number = place.address_components
            .find((item: any) => item.types[0] === 'street_number').short_name;
          this.address.street_name = place.address_components
            .find((item: any) => item.types[0] === 'route').short_name;
          this.city = place.address_components
            .find((item: any) => item.types[0] === 'locality').short_name;
          this.address.lat = place.geometry.location.lat();
          this.address.lng = place.geometry.location.lng();
          this.location = place.formatted_address;
        });
      },

      onAddAddress(): void {
        const { address, city } = this;
        const { street_number, street_name } = address;

        if (street_name && street_number && city) {
          this.setAddress(this.address);
        } else {
          (this as any).$toasts.toast({
            id: 'address-modal',
            title: 'Atentie!',
            intent: 'warning',
            message: 'Te rugam sa introduci adresa completa. Oras, strada, numar',
          });
        }
      },
    },
  });
</script>
