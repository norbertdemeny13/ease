<template>
  <b-card :title="$t('views.pro_dashboard.documents')">
    <div class="d-flex justify-content-between mt-2">
      <div class="document-type d-flex flex-column">
        <h3>{{ $t('views.pro_dashboard.qualification_certificate') }}</h3>
        <p>{{ $t('views.pro_dashboard.qualification_certificate_photo') }}</p>
        <div v-if="userData.certificate_of_calification && userData.certificate_of_calification.length" class="documents-container">
          <p v-for="(file, i) in userData.certificate_of_calification" :key="file.id" class="info text-secondary"><a :href="file.url" target="_blank" download>{{ file.filename }}</a><span class="delete-btn ml-4" @click="onRemove('certificate_of_calification', i)"></span></p>
        </div>
      </div>
      <div class="d-flex mt-2">
        <es-custom-checkbox :checked="userData.certificate_of_calification_confirmed" />
      </div>
      <div class="media d-flex flex-column">
        <h6 class="font-weight-bolder mr-auto mb-0">
          Accept
        </h6>
        <b-form-checkbox
          v-model="isCertificateOfCalificationAccepted"
          class="custom-control-success"
          switch
        />
      </div>
    </div>
    <div class="d-flex justify-content-between mt-2">
      <div class="document-type d-flex flex-column">
        <h3>{{ $t('views.pro_dashboard.identity_card') }}</h3>
        <p>{{ $t('views.pro_dashboard.identity_card_info') }}</p>
        <div v-if="userData.id_card && userData.id_card.length" class="documents-container">
          <p v-for="(file, i) in userData.id_card" :key="file.id" class="info text-secondary"><a :href="file.url" target="_blank" download>{{ file.filename }}</a><span class="delete-btn ml-4" @click="onRemove('id_card', i)"></span></p>
        </div>
      </div>
      <div class="d-flex mt-2">
        <es-custom-checkbox :checked="userData.id_card_confirmed" />
      </div>
    </div>
    <div class="d-flex justify-content-between mt-2">
      <div class="document-type d-flex flex-column">
        <h3>{{ $t('views.pro_dashboard.register_certificate') }}</h3>
        <p>{{ $t('views.pro_dashboard.register_certificate_info') }}</p>
        <div v-if="userData.certificate_of_registration && userData.certificate_of_registration.length" class="documents-container">
          <p v-for="(file, i) in userData.certificate_of_registration" :key="file.id" class="info text-secondary"><a :href="file.url" target="_blank" download>{{ file.filename }}</a><span class="delete-btn ml-4" @click="onRemove('certificate_of_registration', i)"></span></p>
        </div>
      </div>
      <div class="d-flex mt-2">
        <es-custom-checkbox :checked="userData.certificate_of_registration_confirmed" />
      </div>
    </div>
    <div class="d-flex justify-content-between mt-2">
      <div class="document-type d-flex flex-column">
        <h3>{{ $t('views.pro_dashboard.professional_liability_insurance') }}</h3>
        <p>{{ $t('views.pro_dashboard.professional_liability_insurance_info') }}</p>
        <div v-if="userData.practice_insurance && userData.practice_insurance.length" class="documents-container">
          <p v-for="(file, i) in userData.practice_insurance" :key="file.id" class="info text-secondary"><a :href="file.url" target="_blank" download>{{ file.filename }}</a><span class="delete-btn ml-4" @click="onRemove('practice_insurance', i)"></span></p>
        </div>
      </div>
      <div class="d-flex mt-2">
        <es-custom-checkbox :checked="userData.practice_insurance_confirmed" />
      </div>
    </div>
    <div class="d-flex justify-content-between mt-2">
      <div class="document-type d-flex flex-column">
        <h3>{{ $t('views.pro_dashboard.criminal_record_certificate') }}</h3>
        <p>{{ $t('views.pro_dashboard.criminal_record_certificate_info') }}</p>
        <div v-if="userData.criminal_record && userData.criminal_record.length" class="documents-container">
          <p v-for="(file, i) in userData.criminal_record" :key="file.id" class="info text-secondary"><a :href="file.url" target="_blank" download>{{ file.filename }}</a><span class="delete-btn ml-4" @click="onRemove('criminal_record', i)"></span></p>
        </div>
      </div>
      <div class="d-flex mt-2">
        <es-custom-checkbox :checked="userData.criminal_record_confirmed" />
      </div>
    </div>
    <div v-if="userData.status === 'pending'">
      <es-divider />
      <div class="d-flex justify-content-between">
        <div class="document-type d-flex flex-column">
          <h3>{{ $t('views.pro_dashboard.accept_terms_and_conditions') }}</h3>
          <p>{{ $t('views.pro_dashboard.accept_terms_and_conditions_info') }}</p>
        </div>
        <div class="d-flex">
          <es-custom-checkbox :checked="user.accord_accepted" />
        </div>
      </div>
      <div class="col-md-6">
        <es-divider />
      </div>
      <div class="d-flex justify-content-between">
        <div class="document-type d-flex flex-column">
          <h3>{{ $t('views.pro_dashboard.interview') }}</h3>
          <p>{{ $t('views.pro_dashboard.interview_info') }}</p>
        </div>
        <div class="d-flex">
          <es-custom-checkbox :checked="userData.interview_done" />
        </div>
      </div>
      <div v-if="!userData.stripe_account_created && userData.status === 'pending'">
        <es-divider />
      </div>
      <div v-if="!userData.stripe_account_created && userData.status === 'pending'">
        <div class="d-flex justify-content-between">
          <div class="document-type d-flex flex-column">
            <h3>{{ $t('views.pro_dashboard.bank_account') }}</h3>
            <p>{{ $t('views.pro_dashboard.bank_account_info') }}</p>
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
  </b-card>
</template>

<script>
  /* eslint-disable */
  import Vue from 'vue';
  import { mapGetters, mapActions } from 'vuex';
  import { BCard, BRow, BCol, BFormCheckbox, } from 'bootstrap-vue';
  import { isEqual } from 'lodash-es';
  import { CustomCheckbox } from '@/components/shared/custom-checkbox';
  import { Divider } from '@/components/shared/divider';
  import { CalendlyModal } from '@/components/shared/calendly-modal';
  import { TermsAndConditionsModal } from '@/components/shared/terms-and-conditions-modal';

  export default Vue.extend({
    name: 'es-pro-documents',

    components: {
      BCard,
      BCol,
      BRow,
      BFormCheckbox,
      'es-custom-checkbox': CustomCheckbox,
      'es-divider': Divider,
      'es-calendly-modal': CalendlyModal,
      'es-terms-and-conditions-modal': TermsAndConditionsModal
    },

    props: {
      userData: {
        type: Object,
        required: true,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      isCalendlyModalOpen: false,
      isTermsAndConditionsModalOpen: false,
      isCertificateOfCalificationAccepted: false,
      user: {
        accord_accepted: false,
      },
    }),

    computed: {
      isInterviewPossible() {
        const {
          certificate_of_calification_confirmed,
          id_card_confirmed,
        } = this.userData;
        return certificate_of_calification_confirmed === 'accepted' && id_card_confirmed === 'accepted';
      },
    },

    created() {
      this.user = { ...this.userData };
      this.isCertificateOfCalificationAccepted = this.userData.certificate_of_calification_confirmed === 'accepted' ? true : false;
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
          title: this.$t('toast.success_title'),
          message: this.$t('toast.account_update'),
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
</style>
