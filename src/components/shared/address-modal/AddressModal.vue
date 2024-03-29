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
            <h3>{{ $t('generic.add_address') }}</h3>
            <button type="button" class="mfp-close" @click.prevent="$emit('is-open', false)" />
          </div>
          <div class="address-wrapper">
            <div class="d-flex flex-column form-group">
              <label>{{ $t('address.street') }}</label>
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
            <div class="row">
              <div :class="`${getUserType === 'elite' ? 'col-md-3' : 'col-md-4'}`">
                <div class="form-group">
                  <label>{{ $t('address.number') }}</label>
                  <input
                    v-model="address.street_number"
                    type="text"
                    class="form-control"
                    name="number"
                  >
                </div>
              </div>
              <div :class="`${getUserType === 'elite' ? 'col-md-3' : 'col-md-4'}`">
                <div class="form-group">
                  <label>{{ $t('address.apartment') }}</label>
                  <input
                    v-model="address.apartment_number"
                    type="text"
                    class="form-control"
                    name="app"
                  >
                </div>
              </div>
              <div :class="`${getUserType === 'elite' ? 'col-md-3' : 'col-md-4'}`">
                <div class="form-group">
                  <label>{{ $t('address.floors') }}</label>
                  <input
                    v-model="address.floor"
                    type="text"
                    class="form-control"
                    name="floor"
                  >
                </div>
              </div>
              <div v-if="getUserType === 'elite'" :class="`${getUserType === 'elite' ? 'col-md-3' : 'col-md-4'}`">
                <div class="form-group">
                  <label>{{ $t('address.postalcode') }}</label>
                  <input
                    v-model="address.postcode"
                    type="text"
                    class="form-control"
                    name="floor"
                  >
                </div>
              </div>
            </div>
            <div class="form-group">
              <label>{{ $t('address.city') }}</label>
              <input
                :value="$t(city)"
                disabled
                type="text"
                class="form-control"
                name="city"
              >
            </div>
            <div class="form-group">
              <label>{{ $t('address.notesTitle') }}</label>
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
                {{ $t('generic.add') }}
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
      isDifferentCity: false,
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
        getLocation: 'address/getLocation',
        getLocationError: 'address/getLocationError',
        getLocationById: 'address/getLocationById',
        isFetching: 'address/isFetching',
        getReservationAddress: 'address/getReservationAddress',
        getUserType: 'session/getUserType',
      }),
    },

    watch: {
      getLocation(newVal) {
        if (newVal) {
          const reservationAddressId = this.getReservationAddress
            ? this.getReservationAddress.city.id
            : localStorage.getItem('city_id');
          const newAddressId = newVal.city_id;
          this.isDifferentCity = reservationAddressId != newAddressId;
        }
      },

      getLocationError(newVal) {
        (this as any).$toasts.toast({
          intent: 'error',
          id: 'address-toast',
          title: this.$t('toast.warning_title'),
          message: this.$t('toast.address_outside_of_area'),
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
        getUser: 'session/getUser',
      }),

      async initLocationSearch() {
        await this.$nextTick();
        const autocomplete = new (window as any).google.maps.places.Autocomplete(this.$refs.search);
        autocomplete.setFields(['geometry.location','address_component','formatted_address', 'name']);
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          this.address.street_number = place.address_components
            .find((item: any) => item.types[0] === 'street_number')?.short_name;
          this.address.street_name = place.address_components
            .find((item: any) => item.types[0] === 'route')?.short_name;
          this.city = place.address_components
            .find((item: any) => item.types[0] === 'locality')?.short_name;
          this.address.lat = place.geometry.location.lat();
          this.address.lng = place.geometry.location.lng();
          this.location = place.formatted_address;
          this.fetchLocation(place);
        });
      },

      async onAddAddress(): Promise<void> {
        const { name } = this.$router.currentRoute;
        const { address, city } = this;
        const { street_number, street_name } = address;

        if (name === 'Plata rezervare' && this.isDifferentCity) {
          (this as any).$toasts.toast({
            id: 'address-modal',
            title: this.$t('toast.warning_title'),
            intent: 'warning',
            message: this.$t('toast.city_is_changed'),
          });
          return;
        }

        if (street_name && street_number && city) {
          await this.setAddress(this.address);
          await this.getUser();
        } else {
          (this as any).$toasts.toast({
            id: 'address-modal',
            title: this.$t('toast.warning_title'),
            intent: 'warning',
            message: this.$t('toast.address_is_incomplete'),
          });
        }
      },
    },
  });
</script>
