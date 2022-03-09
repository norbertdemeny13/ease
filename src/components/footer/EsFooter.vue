<template>
  <footer :class="`${$router.currentRoute.fullPath.includes('pro') ? 'is-pro' : ''}`">
    <div class="wave footer" :class="getFooterClasses"/>
    <div class="container margin_60_40 fix_mobile">
      <div class="row">
        <div v-for="item in footerLinks" :key="item.id" class="col-lg-3 col-md-6">
          <h3 :data-target="`#${item.id}`">{{ item.category }}</h3>
          <div :id="item.id" class="collapse dont-collapse-sm links">
            <ul>
              <li v-for="link in item.list" :key="link.label">
                <a
                  v-if="link.id"
                  href=""
                  @click="onClick($event)"
                >
                  {{ link.label }}
                </a>
                <router-link
                  v-else-if="link.to"
                  :to="link.to"
                >
                  {{ link.label }}
                </router-link>
                <span v-else>{{ link.label }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- /row-->
      <div class="row my-3">
        <div class="col-lg-6 d-flex flex-row">
          <figure>
            <img
              src="@/assets/icons/apple-music-ease.svg"
              alt=""
              width="35"
              height="35"
              class="lazy mx-2"
            >
          </figure>
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
          <figure>
            <img
              src="@/assets/icons/youtube-ease.svg"
              alt=""
              width="35"
              height="35"
              class="lazy mx-2"
            >
          </figure>
        </div>
      </div>
      <div class="row">
        <div class="ml-3">
          <ul class="additional_links">
            <li>
              <a href="#">{{ $t('generic.privacy_policy') }}
              </a>
            </li>
            <li>
              <a href="#">{{ $t('generic.terms_and_conditions') }}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="row my-3">
        <p class="ml-3 text-secondary">
          {{ $t('generic.all_rights_reserved') }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { nanoid } from 'nanoid';
  import { FOOTER_LINKS, PRO_FOOTER_LINKS } from '@/constants/footer-links';

  export default Vue.extend({
    name: 'es-footer',

    data: () => ({
      isProPage: false,
      isProWave: false,
      isClientWave: false,
      isContactWave: false,
      isFAQWave: false,
    }),

    computed: {
      footerLinks() {
        const links = this.isProPage
          ? PRO_FOOTER_LINKS
          : FOOTER_LINKS;
        return links
          .map(item => ({ ...item, id: nanoid() }));
      },
      getFooterClasses() {
        return {
          'is-pro-wave': this.isProWave,
          'is-client-wave': this.isClientWave,
          'is-common-wave': this.isContactWave || this.isFAQWave,
        };
      },
    },

    watch: {
      $route(to) {
        this.isProPage = to.fullPath.includes('easepro');
        this.isProWave = to.fullPath.includes('easepro/');
        this.isClientWave = to.fullPath.includes('client/');
        this.isContactWave = to.fullPath.includes('contact');
        this.isFAQWave = to.fullPath.includes('intrebari-frecvente');
      },
    },

    methods: {
      onClick(event: any): void {
        event.preventDefault();
        this.$root.$emit('on-show-elite-register');
      },
    },
  });
</script>
