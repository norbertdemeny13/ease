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
            <div class="form-group">
              <label>{{ $t('address.street') }}</label>
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
                  <label>{{ $t('address.number') }}</label>
                  <input
                    v-model="address.street_number"
                    type="text"
                    class="form-control"
                    name="number"
                  >
                </div>
              </div>
              <div class="col-md-4">
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
              <div class="col-md-4">
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
            </div>
            <div class="form-group">
              <label>{{ $t('address.city') }}</label>
              <input
                :value="city"
                disabled
                type="text"
                class="form-control"
                name="city"
              >
            </div>
            <div class="form-group">
              <label>{{ $t('address.type') }}</label>
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
            <div class="form-group">
              <label>{{ $t('address.equipment') }}</label>
              <div class="radio_c_group">
                <label class="container_check">{{ $t('address.my_own_massage_table') }}
                  <input type="checkbox" :checked="address.equipment_ids.includes(1) ? 'checked' : ''" @click="onEquipmentChange(address.equipment_ids.includes(1))">
                  <span class="checkmark" />
                </label>
              </div>
            </div>
            <div class="form-group">
              <label>{{ $t('address.petsTitle') }}</label>
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
              <label>{{ $t('address.parking') }}</label>
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
                @click.prevent="saveAddress()"
              >
                {{ $t('address.save') }}
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
  import { Address } from '@/interfaces/Address';

  export default Vue.extend({
    name: 'es-address-modal-complete',

    model: {
      prop: 'is-open',
      event: 'is-open',
    }, // model

    props: {
      isOpen: {
        required: true,
        type: Boolean as PropType<boolean>,
      },
      selectedAddress: {
        required: true,
        type: Object as PropType<Address>,
      },
    },
    /* eslint-disable */
    data() {
      return {
        typeOptions: [
          { value: 'private_residence', label: this.$t('address.type.private') },
          { value: 'office', label: this.$t('address.type.office') },
          { value: 'hotel', label: this.$t('address.type.hotel') },
        ],
        petOptions: [
          { value: 'cat', label: this.$t('address.pet.cat') },
          { value: 'dog_and_cat', label: this.$t('address.pet.dogAndCat') },
          { value: 'dog', label: this.$t('address.pet.dog')},
        ],
        parkingOptions: [
          { value: 'free_on_street', label: this.$t('address.parking.free_street') },
          { value: 'paid_on_street', label: this.$t('address.parking.paid_street') },
          { value: 'private_park', label: this.$t('address.parking.private') },
        ],
        city: '',
        address: {
          street_name: '',
          street_number: '',
          address_type: '',
          pets: '',
          parking: '',
          notes: '',
          floor: '',
          apartment_number: '',
          postcode: '',
          lat: '',
          lng: '',
          equipment_ids: [] as number[],
        },
      };
    },

    computed: {
      ...mapGetters({
        isFetching: 'address/isFetching',
      }),
    },

    created() {
      const {
        address_type,
        apartment_number,
        city,
        equipment,
        floor,
        lat,
        lng,
        notes,
        parking,
        pets,
        street_name,
        street_number,
      } = this.selectedAddress;

      const equipmentId = equipment[0]?.id;

      this.address.street_number = street_number;
      this.address.street_name = street_name;
      this.address.floor = floor;
      this.address.apartment_number = apartment_number;
      this.address.address_type = address_type;
      this.address.pets = pets;
      this.address.parking = parking;
      this.address.notes = notes;
      this.address.lat = lat;
      this.address.lng = lng;
      this.city = city.name;

      if (equipmentId) {
        this.address.equipment_ids.push(equipmentId);
      }
    },

    methods: {
      ...mapActions({
        updateAddress: 'address/updateAddress',
      }),

      onEquipmentChange(includes: boolean) {
        if (includes) {
          this.address.equipment_ids = [];
        } else {
          this.address.equipment_ids.push(1);
        }
      },

      async saveAddress(): Promise<void> {
        const { address, selectedAddress } = this;
        const { id } = selectedAddress;
        await this.updateAddress({ address, id });
        this.$emit('is-open', false);
      },
    },
  });
</script>
