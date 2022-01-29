<template>
  <portal to="modal">
    <es-modal
      id="modal"
      size="sm"
      :on-dismiss="() => $emit('is-open', false)"
    >
      <div class="container es-address-modal mt-12">
        <div id="es-modal-dialog" class="es-subscription-modal">
          <div class="modal_header">
            <h3>{{ $t('generic.change_subscription') }}</h3>
            <button type="button" class="mfp-close" @click.prevent="$emit('is-open', false)" />
          </div>
          <div class="es_subscription-tilte"><h5>{{ getTitle }}</h5></div>
          <div class="es_subscription-options d-flex flex-column justify-content-center">
            <h6 class="mt-4 text-center">{{ $t(activeSubscription.subscription.name) }}</h6>
            <div class="form-group d-flex justify-content-center">
              <div v-for="option in getAvailableSubsctiptions" :key="option.id" class="my-2 d-flex flex-row justify-content-center">
                <button
                  :class="`btn btn-choice btn-small border px-6 mr-4 selection-item ${ option.id === selectedSubscription ? 'active' : ''}`"
                  @click="selectedSubscription = option.id"
                >
                  {{ $t(option.label) }}
                </button>
              </div>
            </div>
            <h6 v-if="getSubscriptionInfo" class="mt-4 text-center">{{ getSubscriptionInfo.price.price }} Ron/{{ activeSubscription.subscription.monthly ? $t('generic.monthly') : $t('generic.year') }}</h6>
          </div>
          <div class="d-flex justify-content-center">
            <button
              class="btn btn-sm btn-pink btn-pill my-4 px-6"
              :disabled="getSubscriptionInfo && getSubscriptionInfo.id === id"
              @click.prevent="onSave()"
            >
              {{ $t('generic.save') }}
            </button>
          </div>
          <p class="text-center">{{ $t('views.subscriptions.modify_info') }}</p>
        </div>
      </div>
    </es-modal>
  </portal>
</template>

<script>
  import Vue from 'vue';
  import { mapGetters, mapActions } from 'vuex';

  export default Vue.extend({
    name: 'es-subscription-modal',

    model: {
      prop: 'is-open',
      event: 'is-open',
    }, // model

    props: {
      isOpen: {
        required: true,
        type: Boolean,
      },
      activeSubscription: {
        required: true,
        type: Object,
      },
      id: {
        required: true,
        type: Number,
      },
      userId: {
        required: true,
        type: Number,
      },
    },
    /* eslint-disable */
    data: () => ({
      selectedSubscription: '',
    }),

    computed: {
      ...mapGetters({
        isFetching: 'address/isFetching',
        getAvailableSubsctiptions: 'subscriptions/getAvailableSubscriptions',
      }),
      getSubscriptionInfo() {
        return this.getAvailableSubsctiptions.find(option => this.selectedSubscription === option.id);
      },
      getTitle() {
        const { category } = this.activeSubscription.subscription;
        const categoryTitle = {
          beauty: this.$t('views.subscriptions.category_beauty_title'),
          massage: this.$t('views.subscriptions.category_massage_title'),
          fitness: this.$t('views.subscriptions.category_fitness_title'),
        };
        return categoryTitle[category];
      },
    },

    async created() {
      this.selectedSubscription = this.id;
      await this.fetchAvailableSubscriptions(this.id);
    },

    methods: {
      ...mapActions({
        getUser: 'session/getUser',
        fetchAvailableSubscriptions: 'subscriptions/fetchAvailableSubscriptions',
        changeSubscription: 'subscriptions/changeSubscription',
      }),
      setValue(key, value) {
        this.subscriptionForm[key] = value;
      },

      async onSave() {
        await this.changeSubscription({
          activeId: this.userId,
          newId: this.selectedSubscription,
        });
        this.$emit('is-open', false)
        this.$toasts.toast({
          title: this.$t('toast.success_title'),
          id: 'subscription',
          message: this.$t('views.subscriptions.modify_info'),
          intent: 'success',
        });
      },
    },
  });
</script>
