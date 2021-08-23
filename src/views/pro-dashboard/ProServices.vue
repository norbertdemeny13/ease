<template>
  <div class="es_pro-password-container content">
    <h4>Calificari</h4>
    <es-cards-container>
      <es-card v-for="service in servicesList" :id="service.id" :key="service.id" :title="service.title">
        <template v-slot>
          <div v-for="item in service.items" :key="item.id">
            <div class="checkboxes">
              <label class="container_check">{{ item.title }}
                <input type="checkbox">
                <span class="checkmark" />
              </label>
            </div>
          </div>
        </template>
      </es-card>
    </es-cards-container>
    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <label>Cum ai auzit de Ease?*</label>
          <div class="radio_c_group d-flex flex-column">
            <label
              v-for="option in heardFromUs"
              :key="option.value"
              class="container_radio"
              @click="heard = option.value"
            >{{ option.label }}
              <input type="radio" value="checkbox" name="type" :checked="option.value === heard ? 'checked' : ''">
              <span class="checkmark" />
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <label required>Genul</label>
          <div class="radio_c_group d-flex flex-column">
            <label
              class="container_radio"
              @click="gender = 'male'"
            >Masculin
              <input type="radio" value="checkbox" name="gender" :checked="gender === 'male' ? 'checked' : ''">
              <span class="checkmark" />
            </label>
          </div>
          <div class="radio_c_group d-flex flex-column">
            <label
              class="container_radio"
              @click="gender = 'female'"
            >Feminin
              <input type="radio" value="checkbox" name="gender" :checked="gender === 'female' ? 'checked' : ''">
              <span class="checkmark" />
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <label required>Cat speri sa castigi pe saptamana lucrand cu noi?</label>
          <input
            id="earning"
            v-model="earning"
            type="text"
            required
            class="form-control"
            name="earning"
          >
        </div>
        <div class="d-flex justify-content-end">
          <button
            class="btn btn-sm btn-pink btn-pill my-4 px-6"
            @click.prevent="onSave()"
          >
            Salveaza
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import Vue from 'vue';
  import { mapGetters, mapActions } from 'vuex';
  import { Card, CardsContaienr } from '@/components/shared/card';
  import { ForgotPasswordModal } from '@/components/shared/forgot-password-modal';
  import { ResetPasswordModal } from '@/components/shared/reset-password-modal';

  export default Vue.extend({
    name: 'es-pro-services',
    components: {
      'es-card': Card,
      'es-cards-container': CardsContaienr,
    },

    data() {
      return {
        services: {},
        heard: '',
        gender: '',
        earning: '',
        heardFromUs: [
          { value: 'facebook', label: 'Facebook' },
          { value: 'prieten', label: 'Prieten' },
          { value: 'google', label: 'Rezultate Google' },
          { value: 'instagram', label: 'Instagram' },
          { value: 'article', label: 'Articol din presa' },
          { value: 'ejobs', label: 'Ejobs' },
          { value: 'bestjobs', label: 'Bestjobs' },
          { value: 'other', label: 'De altundeva' },
        ],
      }
    },

    computed: {
      ...mapGetters({ getServices: 'services/getServices', getServicesByType: 'services/getServicesByType' }),

      servicesList() {
        // const { services } = this;
        // return Object.keys(services);
        return [
          {
            title: 'Fitness',
            id: 'fitness',
            items: [
              { title: 'Muscle', },
              { title: 'Joga', },
              { title: 'Hit', },
              { title: 'Running', },
            ],
          },
          {
            title: 'Masaj',
            id: 'masaj',
            items: [
              { title: 'massage.ease_swedish', },
              { title: 'massage.profund', },
              { title: 'massage.sport', },
              { title: 'massage.complete_relaxation', },
              { title: 'massage.anti_cellulite', },
              { title: 'massage.reflexo', },
              { title: 'massage.antenatal', },
            ],
          },
        ];
      }
    },

    methods: {
      ...mapActions({
        fetchServices: 'services/fetchServices',
        fetchServicesByType: 'services/fetchServicesByType',
      }),
      onSave() {
        // do something
      },
    },

    async created() {
      await this.fetchServices();
      const localServices = {};
      this.getServices.forEach(service => {
        localServices[service.title] = {};
        service.items
          .filter(subService => subService.name)
          .forEach(async subService => {
            await this.fetchServicesByType({ type: subService.name });
            localServices[service.title][subService.name] = {};

            this.getServicesByType.forEach(serviceType => {
              if (this.getServicesByType.length === 1) {
                localServices[service.title][subService.name] = serviceType.services.map(service => service.name);
              } else {
                localServices[service.title][subService.name][serviceType.name] = serviceType.services.map(service => service.name);
              }
            });
          });
      });
      await this.$nextTick();
      this.services = localServices;
    }
  });
</script>
