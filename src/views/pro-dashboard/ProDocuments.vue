<template>
  <div class="es_pro-documents-container content">
    <h2>{{ $t('views.pro_dashboard.documents') }}</h2>
    <div class="row">
      <div class="col-md-6 d-flex justify-content-between mt-4">
        <div class="document-type d-flex flex-column">
          <h3>{{ $t('views.pro_dashboard.qualification_certificate') }}</h3>
          <p>{{ $t('views.pro_dashboard.qualification_certificate_photo') }}</p>
          <div v-if="documents.certificate_of_calification.length" class="documents-container">
            <p v-for="(file, i) in documents.certificate_of_calification" :key="file.id" class="info text-secondary">{{ file.name }}<span class="delete-btn ml-4" @click="onRemove('certificate_of_calification', i)"><img src="@/assets/icons/trash-can.svg" class="lazy" width="20px" height="20px"></span></p>
          </div>
        </div>
        <div class="d-flex mt-2">
          <div class="upload-button mr-4 ml-4">
            <file-selector
              id="certificate_of_calification"
              ref="certificate_of_calification"
              class="documernts-input"
              accept-extensions=".png,.jpeg,.jpg,.pdf"
              :multiple="true"
              :max-file-size="5 * 1024 * 1024"
              @changed="handleFilesChanged($event, 'certificate_of_calification')"
            >
              <span class="upload-btn">{{ $t('views.pro_dashboard.upload') }}</span>
            </file-selector>
          </div>
          <es-custom-checkbox :checked="getUser.certificate_of_calification_confirmed" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 d-flex justify-content-between mt-4">
        <div class="document-type d-flex flex-column">
          <h3>{{ $t('views.pro_dashboard.identity_card') }}</h3>
          <p>{{ $t('views.pro_dashboard.identity_card_info') }}</p>
          <div v-if="documents.id_card.length" class="documents-container">
            <p v-for="(file, i) in documents.id_card" :key="file.id" class="info text-secondary">{{ file.name }}<span class="delete-btn ml-4" @click="onRemove('id_card', i)"><img src="@/assets/icons/trash-can.svg" class="lazy" width="20px" height="20px"></span></p>
          </div>
        </div>
        <div class="d-flex mt-2">
          <div class="upload-button mr-4 ml-4">
            <file-selector
              id="id_card"
              ref="id_card"
              class="documernts-input"
              accept-extensions=".png,.jpeg,.jpg,.pdf"
              :multiple="true"
              :max-file-size="5 * 1024 * 1024"
              @changed="handleFilesChanged($event, 'id_card')"
            >
              <span class="upload-btn">{{ $t('views.pro_dashboard.upload') }}</span>
            </file-selector>
          </div>
          <es-custom-checkbox :checked="getUser.id_card_confirmed" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 d-flex justify-content-between mt-4">
        <div class="document-type d-flex flex-column">
          <h3>{{ $t('views.pro_dashboard.register_certificate') }}</h3>
          <p>{{ $t('views.pro_dashboard.register_certificate_info') }}</p>
          <div v-if="documents.certificate_of_registration.length" class="documents-container">
            <p v-for="(file, i) in documents.certificate_of_registration" :key="file.id" class="info text-secondary">{{ file.name }}<span class="delete-btn ml-4" @click="onRemove('certificate_of_registration', i)"><img src="@/assets/icons/trash-can.svg" class="lazy" width="20px" height="20px"></span></p>
          </div>
        </div>
        <div class="d-flex mt-2">
          <div class="upload-button mr-4 ml-4">
            <file-selector
              id="certificate_of_registration"
              ref="certificate_of_registration"
              class="documernts-input"
              accept-extensions=".png,.jpeg,.jpg,.pdf"
              :multiple="true"
              :max-file-size="5 * 1024 * 1024"
              @changed="handleFilesChanged($event, 'certificate_of_registration')"
            >
              <span class="upload-btn">{{ $t('views.pro_dashboard.upload') }}</span>
            </file-selector>
          </div>
          <es-custom-checkbox :checked="getUser.certificate_of_registration_confirmed" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 d-flex justify-content-between mt-4">
        <div class="document-type d-flex flex-column">
          <h3>{{ $t('views.pro_dashboard.professional_liability_insurance') }}</h3>
          <p>{{ $t('views.pro_dashboard.professional_liability_insurance_info') }}</p>
          <div v-if="documents.practice_insurance.length" class="documents-container">
            <p v-for="(file, i) in documents.practice_insurance" :key="file.id" class="info text-secondary">{{ file.name }}<span class="delete-btn ml-4" @click="onRemove('practice_insurance', i)"><img src="@/assets/icons/trash-can.svg" class="lazy" width="20px" height="20px"></span></p>
          </div>
        </div>
        <div class="d-flex mt-2">
          <div class="upload-button mr-4 ml-4">
            <file-selector
              id="practice_insurance"
              ref="practice_insurance"
              class="documernts-input"
              accept-extensions=".png,.jpeg,.jpg,.pdf"
              :multiple="true"
              :max-file-size="5 * 1024 * 1024"
              @changed="handleFilesChanged($event, 'practice_insurance')"
            >
              <span class="upload-btn">{{ $t('views.pro_dashboard.upload') }}</span>
            </file-selector>
          </div>
          <es-custom-checkbox :checked="getUser.practice_insurance_confirmed" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 d-flex justify-content-between mt-4">
        <div class="document-type d-flex flex-column">
          <h3>{{ $t('views.pro_dashboard.criminal_record_certificate') }}</h3>
          <p>{{ $t('views.pro_dashboard.criminal_record_certificate_info') }}</p>
          <div v-if="documents.criminal_record.length" class="documents-container">
            <p v-for="(file, i) in documents.criminal_record" :key="file.id" class="info text-secondary">{{ file.name }}<span class="delete-btn ml-4" @click="onRemove('criminal_record', i)"><img src="@/assets/icons/trash-can.svg" class="lazy" width="20px" height="20px"></span></p>
          </div>
        </div>
        <div class="d-flex mt-2">
          <div class="upload-button mr-4 ml-4">
            <file-selector
              id="criminal_record"
              ref="criminal_record"
              class="documernts-input"
              accept-extensions=".png,.jpeg,.jpg,.pdf"
              :multiple="true"
              :max-file-size="5 * 1024 * 1024"
              @changed="handleFilesChanged($event, 'criminal_record')"
            >
              <span class="upload-btn">{{ $t('views.pro_dashboard.upload') }}</span>
            </file-selector>
          </div>
          <es-custom-checkbox :checked="getUser.criminal_record_confirmed" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="d-flex justify-content-start">
          <button
            class="btn btn-sm btn-pink btn-pill my-4 px-6"
            @click="onSave"
          >
            {{ $t('generic.save') }}
          </button>
        </div>
      </div>
    </div>
    <div v-if="getUser.status === 'pending'">
      <div class="row">
        <div class="col-md-6">
          <es-divider />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 d-flex justify-content-between">
          <div class="document-type d-flex flex-column">
            <h3>{{ $t('views.pro_dashboard.accept_terms_and_conditions') }}</h3>
            <p>{{ $t('views.pro_dashboard.accept_terms_and_conditions_info') }}</p>
            <button
              v-if="!user.accord_accepted"
              class="btn btn-sm btn-pink btn-pill px-6 documents-button"
              @click.prevent="openTermsAndConditionsModal()"
            >
              {{ $t('views.pro_dashboard.accept_terms_and_conditions_button') }}
            </button>
          </div>
          <div class="d-flex">
            <es-custom-checkbox :checked="user.accord_accepted" />
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
            <h3>{{ $t('views.pro_dashboard.interview') }}</h3>
            <p>{{ $t('views.pro_dashboard.interview_info') }}</p>
            <a
              v-if="!getUser.interview_done"
              href=""
              onclick="Calendly.initPopupWidget({url: 'https://calendly.com/easeapp/interviu?hide_gdpr_banner=1&primary_color=d00078'});return false;"
              :class="`btn btn-sm btn-pink btn-pill px-6 documents-button ${!isInterviewPossible ? 'disabled' : ''}`"
            >{{ $t('views.pro_dashboard.interview_button') }}</a>
          </div>
          <div class="d-flex">
            <es-custom-checkbox :checked="getUser.interview_done" />
          </div>
        </div>
      </div>
      <div v-if="!getUser.stripe_account_created && getUser.status === 'pending'" class="row">
        <div class="col-md-6">
          <es-divider />
        </div>
      </div>
      <div v-if="!getUser.stripe_account_created && getUser.status === 'pending'" class="row">
        <div class="col-md-6 d-flex justify-content-between">
          <div class="document-type d-flex flex-column">
            <h3>{{ $t('views.pro_dashboard.bank_account') }}</h3>
            <p>{{ $t('views.pro_dashboard.bank_account_info') }}</p>
            <div class="row">
              <a
                href="https://connect.stripe.com/express/oauth/authorize?response_type=code&client_id=ca_IDbPymgaaHlsJq1g3xI16XaVjnxHBl5o"
                target="_blank"
                :class="`btn btn-sm btn-pink btn-pill px-6 documents-button ${!getUser.interview_done ? 'disabled' : ''}`"
              >
                {{ $t('views.pro_dashboard.bank_account_button') }}
              </a>
              <div class="d-flex flex-wrap align-items-center ml-4">
                <img src="@/assets/svg/stripe.svg" class="logo">
              </div>
            </div>
          </div>
          <div class="d-flex">
            <es-custom-checkbox :checked="false" />
          </div>
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
        :is-open="isTermsAndConditionsModalOpen"
        @close="isTermsAndConditionsModalOpen = false"
        @on-accept="onAccept()"
      />
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import Vue from 'vue';
  import { mapGetters, mapActions } from 'vuex';
  import { isEqual } from 'lodash-es';
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
      documents: {  
        certificate_of_registration: '',
        certificate_of_calification: '',
        criminal_record: '',
        id_card: '',
        practice_insurance: '',
      },
      isCalendlyModalOpen: false,
      isTermsAndConditionsModalOpen: false,
      user: {
        accord_accepted: false,
      },
    }),

    computed: {
      ...mapGetters({
        getUser: 'session/getUser',
      }),
      isInterviewPossible() {
        const {
          certificate_of_calification_confirmed,
          id_card_confirmed,
        } = this.getUser;
        return certificate_of_calification_confirmed === 'accepted' && id_card_confirmed === 'accepted';
      },
    },

    created() {
      this.user = { ...this.getUser };
    },

    methods: {
      ...mapActions({
        uploadDocuments: 'elite/uploadDocuments',
        updateElite: 'session/updateElite',
      }),
      handleFilesChanged(files, type) {
        this.$data.documents[type] = [...this.$data.documents[type], ...files];
      },
      onRemove(type, index) {
        const newArray = this.$data.documents[type].splice(index, 1);
      },
      onOpenCalendly() {
        this.isCalendlyModalOpen = true;
      },
      openTermsAndConditionsModal() {
        this.isTermsAndConditionsModalOpen = true;
      },
      async onSave() {
        await Object.keys(this.documents).filter(key => this.documents[key].length).forEach(async (key) => {
          let formData = new FormData();
          this.documents[key].forEach(item => formData.append('files[]', item));
          formData.append('file_attribute', key);
          await this.uploadDocuments(formData);
        });
        this.documents = {
          certificate_of_registration: '',
          certificate_of_calification: '',
          criminal_record: '',
          id_card: '',
          practice_insurance: '',
        };
        this.$toasts.toast({
          id: 'update-toast',
          title: this.$t('toast.account_update'),
          message: this.$t('toast.pro_uploaded_document'),
          intent: 'success',
        });
      },
      async onAccept() {
        this.user.accord_accepted = true;
        await this.updateElite(this.$data);
        this.isTermsAndConditionsModalOpen = false;
      },
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
    white-space: nowrap;
  }

  .logo {
    height: 19px;
  }

  h3.es-toast__title {
    font-size: 26px;
    line-height: 28px;
  }
</style>
