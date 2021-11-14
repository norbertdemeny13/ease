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
  </div>
</template>

<script>
  /* eslint-disable */
  import Vue from 'vue';
  import { CustomCheckbox } from '@/components/shared/custom-checkbox';

  export default Vue.extend({
    name: 'es-pro-documents',

    components: {
      'es-custom-checkbox': CustomCheckbox,
    },

    data: () => ({
      certificate_of_registration: '',
      certificate_of_calification: '',
      id_card: '',
      practice_insurance: '',
    }),

    methods: {
      handleFilesChanged(files, type) {
        this.$data[type] = [...files].map(item => item.name);
      },
      onRemove(type, index) {
        const newArray = this.$data[type].splice(index, 1);
      },
    },
  });
</script>

<style lang="scss">
  .documents-input {
    position: absolute !important;
    visibility: hidden;
  }
</style>
