<template>
  <div class="es_pro-recommendations-container content">
    <h4>{{ $t('generic.recommend') }}</h4>
    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <label>{{ $t('views.client_dashboard.recommend.title_description') }}</label>
          <div class="d-flex align-items-center">
            <input
              id="code"
              v-model="code"
              type="text"
              class="form-control"
              name="code"
              disabled
            >
            <span class="copy-btn" @click.prevent="onCopy">{{ $t('generic.copy') }}</span>
          </div>
        </div>
        <div class="d-flex flex-row">
          <figure>
            <img
              src="@/assets/icons/facebook-ease.svg"
              alt=""
              width="35"
              height="35"
              class="lazy mx-2"
            >
          </figure>
          <figure>
            <img
              src="@/assets/icons/insta-ease.svg"
              alt=""
              width="35"
              height="35"
              class="lazy mx-2"
            >
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { copyToClipboard } from '@/utils/copy-to-clipboard';
  import { nanoid } from 'nanoid';

  export default Vue.extend({
    name: 'es-pro-recommendations',
    data: () => ({
      code: 'DGT54',
    }),
    methods: {
      onCopy(): void {
        copyToClipboard(this.code);
        (this as any).$toasts.toast({
          id: nanoid(),
          message: this.$t('toast.referral_link_copied'),
          title: this.$t('toast.success_title'),
          intent: 'success',
        });
      },
    },
  });
</script>
