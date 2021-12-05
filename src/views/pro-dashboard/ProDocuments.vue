<template>
  <div class="es_pro-documents-container content">
    <h4>{{ $t('views.pro_dashboard.documents') }}</h4>
    <div class="row">
      <div class="col-md-6 d-flex justify-content-between">
        <div class="document-type d-flex flex-column">
          <h6>{{ $t('views.pro_dashboard.qualification_certificate') }}</h6>
          <p>{{ $t('views.pro_dashboard.qualification_certificate_photo') }}</p>
          <div v-if="certificate_of_calification.length" class="documents-container">
            <p v-for="(file, i) in certificate_of_calification" :key="file.id" class="info text-secondary">{{ file }}<span class="delete-btn ml-4" @click="onRemove('certificate_of_calification', i)">Sterge</span></p>
          </div>
        </div>
        <div class="d-flex">
          <div class="upload-button mr-4 ml-4">
            <file-selector
              id="certificate_of_calification"
              ref="certificate_of_calification"
              class="documernts-input"
              accept-extensions=".pdf"
              :multiple="true"
              :max-file-size="5 * 1024 * 1024"
              @changed="handleFilesChanged($event, 'certificate_of_calification')"
            >
              <span class="upload-btn">{{ $t('views.pro_dashboard.upload') }}</span>
            </file-selector>
          </div>
          <es-custom-checkbox :checked="false" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 d-flex justify-content-between">
        <div class="document-type d-flex flex-column">
          <h6>{{ $t('views.pro_dashboard.identity_card') }}</h6>
          <p>{{ $t('views.pro_dashboard.identity_card_info') }}</p>
          <div v-if="id_card.length" class="documents-container">
            <p v-for="(file, i) in id_card" :key="file.id" class="info text-secondary">{{ file }}<span class="delete-btn ml-4" @click="onRemove('id_card', i)">Sterge</span></p>
          </div>
        </div>
        <div class="d-flex">
          <div class="upload-button mr-4 ml-4">
            <file-selector
              id="id_card"
              ref="id_card"
              class="documernts-input"
              accept-extensions=".pdf"
              :multiple="true"
              :max-file-size="5 * 1024 * 1024"
              @changed="handleFilesChanged($event, 'id_card')"
            >
              <span class="upload-btn">{{ $t('views.pro_dashboard.upload') }}</span>
            </file-selector>
          </div>
          <es-custom-checkbox :checked="false" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 d-flex justify-content-between">
        <div class="document-type d-flex flex-column">
          <h6>{{ $t('views.pro_dashboard.register_certificate') }}</h6>
          <p>{{ $t('views.pro_dashboard.register_certificate_info') }}</p>
          <div v-if="certificate_of_registration.length" class="documents-container">
            <p v-for="(file, i) in id_card" :key="file.id" class="info text-secondary">{{ file }}<span class="delete-btn ml-4" @click="onRemove('certificate_of_registration', i)">Sterge</span></p>
          </div>
        </div>
        <div class="d-flex">
          <div class="upload-button mr-4 ml-4">
            <file-selector
              id="certificate_of_registration"
              ref="certificate_of_registration"
              class="documernts-input"
              accept-extensions=".pdf"
              :multiple="true"
              :max-file-size="5 * 1024 * 1024"
              @changed="handleFilesChanged($event, 'certificate_of_registration')"
            >
              <span class="upload-btn">{{ $t('views.pro_dashboard.upload') }}</span>
            </file-selector>
          </div>
          <es-custom-checkbox :checked="false" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 d-flex justify-content-between">
        <div class="document-type d-flex flex-column">
          <h6>{{ $t('views.pro_dashboard.professional_liability_insurance') }}</h6>
          <p>{{ $t('views.pro_dashboard.professional_liability_insurance_info') }}</p>
          <div v-if="practice_insurance.length" class="documents-container">
            <p v-for="(file, i) in id_card" :key="file.id" class="info text-secondary">{{ file }}<span class="delete-btn ml-4" @click="onRemove('practice_insurance', i)">Sterge</span></p>
          </div>
        </div>
        <div class="d-flex">
          <div class="upload-button mr-4 ml-4">
            <file-selector
              id="practice_insurance"
              ref="practice_insurance"
              class="documernts-input"
              accept-extensions=".pdf"
              :multiple="true"
              :max-file-size="5 * 1024 * 1024"
              @changed="handleFilesChanged($event, 'practice_insurance')"
            >
              <span class="upload-btn">{{ $t('views.pro_dashboard.upload') }}</span>
            </file-selector>
          </div>
          <es-custom-checkbox :checked="false" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <es-divider />
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 d-flex justify-content-between">
        <div class="document-type d-flex flex-column">
          <h6>{{ $t('views.pro_dashboard.accept_terms_and_conditions') }}</h6>
          <p>{{ $t('views.pro_dashboard.accept_terms_and_conditions_info') }}</p>
          <button
            class="btn btn-sm btn-pink btn-pill px-6 documents-button"
            @click.prevent="openTermsAndConditionsModal()"
          >
            {{ $t('views.pro_dashboard.accept_terms_and_conditions_button') }}
          </button>
        </div>
        <div class="d-flex">
          <es-custom-checkbox :checked="false" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <es-divider />
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 d-flex justify-content-between">
        <div class="document-type d-flex flex-column">
          <h6>{{ $t('views.pro_dashboard.interview') }}</h6>
          <p>{{ $t('views.pro_dashboard.interview_info') }}</p>
          <button
            class="btn btn-sm btn-pink btn-pill px-6 documents-button"
            @click.prevent="onOpenCalendly()"
          >
            {{ $t('views.pro_dashboard.interview_button') }}
          </button>
        </div>
        <div class="d-flex">
          <es-custom-checkbox :checked="false" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <es-divider />
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 d-flex justify-content-between">
        <div class="document-type d-flex flex-column">
          <h6>{{ $t('views.pro_dashboard.bank_account') }}</h6>
          <p>{{ $t('views.pro_dashboard.bank_account_info') }}</p>
          <div class="row">
            <button class="btn btn-sm btn-pink btn-pill px-6 ml-2 documents-button">
              {{ $t('views.pro_dashboard.bank_account_button') }}
            </button>
            <div class="d-flex flex-wrap align-items-center ml-4">
              <img src="@/assets/svg/stripe.svg" class="logo"/>
            </div>
          </div>
        </div>
        <div class="d-flex">
          <es-custom-checkbox :checked="false" />
        </div>
      </div>
      <es-calendly-modal
        v-if="isCalendlyModalOpen"
        v-model="isCalendlyModalOpen"
        @close="isCalendlyModalOpen = false"
      />

      <es-terms-and-conditions-modal
        v-if="isTermsAndConditionsModalOpen"
        v-model="isTermsAndConditionsModalOpen"
        @close="isTermsAndConditionsModalOpen = false"
      />
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import Vue from 'vue';
  import { CustomCheckbox } from '@/components/shared/custom-checkbox';
  import { Divider } from '@/components/shared/divider';
  import { CalendlyModal } from '@/components/shared/calendly-modal';
  import { TermsAndConditionsModal } from '@/components/shared/terms-and-conditions-modal';

  export default Vue.extend({
    name: 'es-pro-documents',

    components: {
      'es-custom-checkbox': CustomCheckbox,
      'es-divider': Divider,
      'es-calendly-modal': CalendlyModal,
      'es-terms-and-conditions-modal': TermsAndConditionsModal
    },

    data: () => ({
      certificate_of_registration: '',
      certificate_of_calification: '',
      id_card: '',
      practice_insurance: '',
      isCalendlyModalOpen: false,
      isTermsAndConditionsModalOpen: false
    }),

    methods: {
      handleFilesChanged(files, type) {
        this.$data[type] = [...files].map(item => item.name);
      },
      onRemove(type, index) {
        const newArray = this.$data[type].splice(index, 1);
      },
      onOpenCalendly() {
        this.isCalendlyModalOpen = true;
      },
      openTermsAndConditionsModal() {
        this.isTermsAndConditionsModalOpen = true;
      }
    },
  });
</script>

<style lang="scss">
  .documents-input {
    position: absolute !important;
    visibility: hidden;
  }

  .documents-button {
    width: 225px;
  }

  .logo {
    height: 19px;
  }
</style>
