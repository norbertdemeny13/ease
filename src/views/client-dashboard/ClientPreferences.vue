<template>
  <div class="es_client-preferences-container content">
    <div class="row">
      <div class="col-md-12">
        <h2>{{ $t('views.client_dashboard.preferences.title') }}</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <h6>{{ $t('account.preferedPresure') }}</h6>
        <div class="row mt-5">
          <div class="col-md-1">
            <span>{{ $t('account.mildPresure') }}</span>
          </div>
          <div class="col-md-6">
            <es-vue-slider
              ref="slider"
              v-model="pressureLevel"
              v-bind="massageOptions"
              class="ml-2"
            />
          </div>
          <div class="col-md-1">
            <span>{{ $t('account.strongPresure') }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-7">
        <h6>{{ $t('account.preferedConversation') }}</h6>
        <es-vue-slider
          ref="slider"
          v-model="talkingLevel"
          v-bind="conversationOptions"
          class="ml-2 mt-5"
        />
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-12 col-lg-8">
        <h6>{{ $t('account.aromaToBeAvoided') }}</h6>
        <div class="form-group">
          <input
            v-model="avoidedScents"
            type="text"
            class="form-control"
            name="avoidedScents"
          >
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-12 col-lg-8">
        <h6>{{ $t('account.notes') }}</h6>
        <div class="form-group">
          <input
            v-model="notes"
            type="text"
            class="form-control"
            name="notes"
            placeholder="Ex: stare de sanatate, conditie fizica, alte particularitati"
          >
        </div>
        <div class="d-flex justify-content-start">
          <button
            class="btn btn-sm btn-pink btn-pill my-4 px-6"
            @click.prevent="onSave"
          >
            {{ $t('generic.save') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { mapGetters, mapActions } from 'vuex';

  export default Vue.extend({
    name: 'es-client-preferences',
    data() {
      return {
        pressureLevel: 1,
        talkingLevel: 1,
        notes: null,
        avoidedScents: null,
        massageOptions: {
          dotSize: 25,
          height: 10,
          min: 1,
          max: 10,
          interval: 1,
          clickable: true,
          duration: 0.5,
        },
        conversationOptions: {
          dotSize: 25,
          height: 10,
          min: 1,
          max: 3,
          interval: 1,
          clickable: true,
          duration: 0.5,
          tooltipFormatter: (value) => {
            const options = ['', 'account.quietPlease', 'account.someTalkingIsFine', 'account.talkWithMe'];
            return this.$t(options[value]);
          },
        },
      };
    },
    computed: {
      ...mapGetters({
        getUser: 'session/getUser',
      }),
    },

    created() {
      const servicePreferences = this.getUser.service_preference;
      if (servicePreferences) {
        if (servicePreferences.talking_level.includes('.silent')) {
          this.talkingLevel = 1;
        }

        if (servicePreferences.talking_level.includes('.little')) {
          this.talkingLevel = 2;
        }

        if (servicePreferences.talking_level.includes('.talk')) {
          this.talkingLevel = 3;
        }

        this.notes = servicePreferences.notes;
        this.avoidedScents = servicePreferences.avoided_scents;
        this.pressureLevel = servicePreferences.pressure_level;
      }
    },

    methods: {
      ...mapActions({
        savePreferences: 'session/savePreferences',
      }),
      onSave() {
        let talkingLevel = 'talking_level.silent';

        if (this.talkingLevel === 2) {
          talkingLevel = 'talking_level.little';
        }

        if (this.talkingLevel === 3) {
          talkingLevel = 'talking_level.talk';
        }

        /* eslint-disable */
        this.savePreferences({
          pressure_level: this.pressureLevel,
          talking_level: talkingLevel,
          notes: this.notes,
          avoided_scents: this.avoidedScents,
        });
      },
    },
  });
</script>
