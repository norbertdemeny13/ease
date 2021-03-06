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
              <input
                ref="search"
                v-model="location"
                placeholder="Introdu o locatie"
                class="form-control pr-6"
                type="text"
              >
              <a v-if="location" href="" @click.prevent="location = null"><i class="ml-n4 icon_trash" /></a>
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
                    :value="address.floor"
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
              <label>Tip Adresa</label>
              <div class="radio_c_group">
                <label
                  v-for="option in typeOptions"
                  :key="option.value"
                  class="container_radio"
                  @click="address.address_type = option.value"
                >{{ option.label }}
                  <input type="radio" value="checkbox" name="type" :checked="option.value === address.address_type ? 'checked' : ''">
                  <span class="checkmark" />
                </label>
              </div>
            </div>
            <div v-if="isMassageView" class="form-group">
              <label>Masa de masaj</label>
              <div class="radio_c_group">
                <label class="container_check">Am masa mea
                  <input type="checkbox" :checked="address.equipment_ids.includes(1) ? 'checked' : ''" @click="onEquipmentChange(address.equipment_ids.includes(1))">
                  <span class="checkmark" />
                </label>
              </div>
            </div>
            <div class="form-group">
              <label>Animale de companie</label>
              <div class="radio_c_group">
                <label
                  v-for="option in petOptions"
                  :key="option.value"
                  class="container_radio"
                  @click="address.pets = option.value"
                >{{ option.label }}
                  <input type="radio" value="checkbox" name="pets" :checked="option.value === address.pets ? 'checked' : ''">
                  <span class="checkmark" />
                </label>
              </div>
            </div>
            <div class="form-group">
              <label>Parcare</label>
              <div class="radio_c_group">
                <label
                  v-for="option in parkingOptions"
                  :key="option.value"
                  class="container_radio"
                  @click="address.parking = option.value"
                >{{ option.label }}
                  <input type="radio" value="checkbox" name="parking" :checked="option.value === address.parking ? 'checked' : ''">
                  <span class="checkmark" />
                </label>
              </div>
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
      isMassageView: {
        required: true,
        type: Boolean as PropType<boolean>,
      },
    },
    /* eslint-disable */
    data: () => ({
      location: null,
      typeOptions: [
        { value: 'private_residence', label: 'Rezidenta Privata' },
        { value: 'office', label: 'Birou' },
        { value: 'hotel', label: 'Hotel' },
      ],
      petOptions: [
        { value: 'cat', label: 'Pisica' },
        { value: 'dog_and_cat', label: 'Caine si pisica' },
        { value: 'dog', label: 'Caine'},
      ],
      parkingOptions: [
        { value: 'free_on_street', label: 'Gratuita' },
        { value: 'paid_on_street', label: 'Cu plate' },
        { value: 'private_park', label: 'Privata' },
      ],
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
        lat: '44.429508',
        lng: '26.067228',
        equipment_ids: [1],
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

      onEquipmentChange(includes: boolean) {
        if (includes) {
          this.address.equipment_ids = [];
        } else {
          this.address.equipment_ids.push(1);
        }
      },

      onAddAddress(): void {
        this.setAddress(this.address);
      },
    },
  });
</script>
