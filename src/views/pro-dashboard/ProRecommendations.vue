<template>
  <div class="es_pro-recommendations-container content">
    <h2>{{ $t('generic.promote') }}</h2>
    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <label>{{ $t('msg_promote') }}</label>
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
            <ShareNetwork
              network="Facebook"
              :url="code"
              title="Ease"
              description="Hey! Descarca aplicatia Ease si comanda servicii profesionale de masaj, beauty sau fitness direct la usa ta. Descopera serviciile oferite de mine."
              hashtags="Ease, Beauty"
            >
              <img
                src="@/assets/icons/facebook-ease.svg"
                alt=""
                width="35"
                height="35"
                class="lazy mx-2"
              >
            </ShareNetwork>
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapGetters } from 'vuex';
  import { copyToClipboard } from '@/utils/copy-to-clipboard';
  import { nanoid } from 'nanoid';

  export default Vue.extend({
    name: 'es-pro-recommendations',
    data: () => ({
      code: 'https://ease.ro/pro/',
    }),
    computed: {
      ...mapGetters({
        getUser: 'session/getUser',
      }),
    },
    created() {
      const eliteId = this.getUser.elite_id;
      this.code = `https://ease.ro/pro/${eliteId}`;
    },
    methods: {
      onCopy(): void {
        copyToClipboard(this.code);
        (this as any).$toasts.toast({
          id: nanoid(),
          message: this.$t('toast.profile_link_copied'),
          title: this.$t('toast.success_title'),
          intent: 'success',
        });
      },
    },
  });
</script>
