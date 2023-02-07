<template>
  <div class="es_client-addresses-container content">
    <h2>{{ $t('generic.address') }}</h2>
    <div class="row">
      <div class="col-md-8">
        <div
          v-for="address in getAddresses"
          :key="address.id"
          :class="`${address.main ? 'active': ''} client-address-item`"
          @click.prevent="onSelect(address)"
        >
          <div class="address">
            <div>{{ getAddress(address) }}</div>
            <div v-if="address.main" class="mt-2">
              <span class="icon_check_alt" />
              <span class="ml-2">{{ $t('generic.main_address') }}</span>
            </div>
          </div>
          <div class="my-4">
            <a href="" class="my-4 mr-2" @click.prevent.stop="onEdit(address)">
              <i class="icon_pencil-edit" />
              {{ $t('generic.edit') }}
            </a>
            <a
              href=""
              class="my-4"
              @click.prevent.stop="onRemove(address)"
            >
              <div>
                <i class="icon_trash_alt" />
                {{ $t('generic.delete') }}
              </div>
            </a>
          </div>
        </div>
        <div class="d-flex justify-content-start">
          <button
            class="btn btn-sm btn-pink btn-pill my-4 px-6"
            @click.prevent="isAddressModalOpen = true"
          >
            {{ $t('generic.add') }}
          </button>
        </div>
      </div>
    </div>
    <es-address-modal-complete
      v-if="isAddressModalCompleteOpen"
      v-model="isAddressModalCompleteOpen"
      :selected-address="selectedAddress"
    />

    <es-address-modal
      v-if="isAddressModalOpen"
      v-model="isAddressModalOpen"
      :is-massage-view="false"
    />
    <es-confirm-modal
      v-model="isConfirmModalOpen"
      :confirm-cta="getConfirmationCta"
      has-confirm-cta
      @on-confirm="onContinue()"
    >
      <template slot="title">{{ getConfirmationModalTitle }}</template>
      <template slot="message">{{ getConfirmationModalMessage }}</template>
    </es-confirm-modal>

    <es-confirm-modal
      v-model="isAlertModalOpen"
      :confirm-cta="$t('address.confirm')"
      has-confirm-cta
      cancel-cta=""
      @on-confirm="isAlertModalOpen = false"
    >
      <template slot="title">{{ $t('delete.default.address.title') }}</template>
      <template slot="message">{{ $t('delete.default.address.text') }}</template>
    </es-confirm-modal>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';
  import { AddressModal, AddressModalComplete } from '@/components/shared/address-modal';
  import { Address } from '@/interfaces/Address';

  export default Vue.extend({
    name: 'es-client-addresses',

    components: {
      'es-address-modal': AddressModal,
      'es-address-modal-complete': AddressModalComplete,
    },

    data: () => ({
      isAlertModalOpen: false,
      isConfirmModalOpen: false,
      isAddressModalCompleteOpen: false,
      isAddressModalOpen: false,
      selectedAddress: {} as Address,
      modalTitle: '',
      modalMessage: '',
      method: '',
    }),

    computed: {
      ...mapGetters({ getAddresses: 'address/getAddresses' }),

      getConfirmationModalTitle(): string {
        return this.modalTitle;
      },

      getConfirmationModalMessage(): string {
        return this.modalMessage;
      },

      getConfirmationCta(): string {
        return this.method === 'select' ? this.$t('generic.confirm_cta').toString() : this.$t('address.delete').toString();
      },
    },

    watch: {
      isAddressModalCompleteOpen(newVal) {
        if (!newVal) {
          this.fetchAddresses();
        }
      },
    },

    created() {
      this.fetchAddresses();
    },

    methods: {
      ...mapActions({
        fetchAddresses: 'address/fetchAddresses',
        removeAddress: 'address/removeAddress',
        setDefaultAddress: 'address/setDefaultAddress',
      }),

      getAddress(address: Address): string {
        return `${address.street_name}, Nr.
              ${address.street_number}, ${this.$t(address.city.name)}`;
      },

      onEdit(address: Address): void {
        this.selectedAddress = address;
        this.isAddressModalCompleteOpen = true;
      },

      onSelect(address: Address): void {
        if (address.main) {
          return;
        }

        this.method = 'select';
        this.selectedAddress = address;
        this.modalTitle = this.$t('change.default.address.title').toString();
        this.modalMessage = `${this.$t('generic.set_question').toString()} ${this.getAddress(address)} ${this.$t('generic.set_primary_address').toString()}`;
        this.isConfirmModalOpen = true;
      },

      onRemove(address: Address): void {
        if (address.main) {
          this.isAlertModalOpen = true;
        } else {
          this.method = 'remove';
          this.selectedAddress = address;
          this.modalTitle = this.$t('generic.address_delete').toString();
          this.modalMessage = `${this.$t('generic.address_delete_question').toString()} ${this.getAddress(address)}?`;
          this.isConfirmModalOpen = true;
        }
      },

      async onContinue() {
        if (this.method === 'select') {
          await this.setDefaultAddress({
            id: this.selectedAddress.id,
            cityId: this.selectedAddress.city.id,
          });
        }

        if (this.method === 'remove') {
          await this.removeAddress(this.selectedAddress.id);
        }

        await this.fetchAddresses();
      },
    },
  });
</script>

<style type="text/scss">
  .client-address-item {
    align-items: center;
    border: 1px solid #cccccc;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    margin: 8px 0;
    padding: 8px;
  }

  .client-address-item:hover {
    border: 1px solid #70d7b7;
    cursor: pointer;
  }

  .client-address-item.active {
    border: 2px solid #70d7b7;
    cursor: pointer;
  }

  .address {
    max-width: 60%;
  }
</style>
