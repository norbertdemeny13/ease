<template>
  <div class="col-md-4 col-sm-6">
    <div class="card pricing-card">
      <div class="card-body">
        <h3 class="pricing-plan-title d-flex align-items-center">{{ $t(item.name) }}<span class="badge badge-pill offer-badge ml-auto">{{ item.discount }} %</span></h3>
        <p class="h1 pricing-plan-original-cost"><del>{{ `${item.service_price } Lei` }}</del></p>
        <p class="h1 pricing-plan-cost">{{ item.price.price }}<span class="currency"> Lei</span></p>
        <ul class="pricing-plan-features">
          <li v-for="(benefit, i) in item.small_descriptions" :key="`${item.type}-${i}`"><i class="icon_check" />{{ $t(benefit) }}</li>
        </ul>
        <a href="" class="btn pricing-plan-purchase-btn" @click.prevent="onSelect()">{{ $t('generic.pick') }}</a>
        <div class="text-center">
          <a href="" class="pricing-plan-link" @click.prevent="isModalOpen = true">{{ $t('generic.learn_more') }}</a>
        </div>
      </div>
    </div>
    <es-subscription-benefits-modal
      v-if="isModalOpen"
      v-model="isModalOpen"
      :benefits="item.detailed_descriptions"
    />
  </div>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue';
  import { mapGetters } from 'vuex';
  import { SubscriptionBenefitsModal } from '@/components/shared/subscription-benefits-modal';

  export default Vue.extend({
    name: 'es-pricing-plan-card',

    components: {
      'es-subscription-benefits-modal': SubscriptionBenefitsModal,
    },

    props: {
      benefits: {
        default: null,
        type: Array as PropType<string[]>,
      },
      item: {
        required: true,
        type: Object,
      },
      to: {
        default: null,
        type: String,
      },
    },

    data: () => ({
      isModalOpen: false,
    }),

    computed: {
      ...mapGetters({
        isAuthenticated: 'session/isAuthenticated',
      }),
    },

    methods: {
      onSelect() {
        if (this.to) {
          this.$router.push(this.to);
        } else {
          this.$emit('on-select', this.item);
        }
      },
    },
  });
</script>
