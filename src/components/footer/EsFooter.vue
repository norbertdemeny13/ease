<template>
  <footer :class="`${$router.currentRoute.fullPath.includes('easepro') ? 'is-pro' : ''}`">
    <div :class="getFooterClasses" />
    <div class="container margin_60_40 fix_mobile">
      <div class="row">
        <div v-for="item in footerLinks" :key="item.id" class="col-lg-3 col-md-6">
          <h3 :data-target="`#${item.id}`">{{ $t(item.category) }}</h3>
          <div :id="item.id" :key="item.id" class="collapse dont-collapse-sm links">
            <ul>
              <li v-for="link in item.list" :key="link.label">
                <a
                  v-if="link.id"
                  href=""
                  @click="onClick($event)"
                >
                  {{ $t(link.label) }}
                </a>
                <router-link
                  v-else-if="link.to"
                  :to="link.to"
                >
                  {{ $t(link.label) }}
                </router-link>
                <span v-else>{{ $t(link.label) }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- /row-->
      <div class="row my-3">
        <div class="col-lg-6 d-flex flex-row align-items-center">
          <ul class="footer-selector clearfix">
            <li>
              <div class="styled-select lang-selector">
                <select @change="onLanguageChange">
                  <option value="ro" :selected="selectedLanguage === 'ro'">{{ $t('generic.ro') }}</option>
                  <option value="en" :selected="selectedLanguage === 'en'">{{ $t('generic.en') }} </option>
                </select>
              </div>
            </li>
          </ul>
          <template v-for="icon in socialIcons">
            <a :key="icon.name" :href="icon.href" target="_blank" class="radius-50 mx-2">
              <img
                :src="getIconPath(icon.name)"
                :alt="icon.name"
                width="35"
                height="35"
                class="lazy"
              >
            </a>
          </template>
        </div>
        <div class="col-lg-6 legal">
          <template v-for="icon in legalIcons">
            <a
              :key="icon.name"
              :href="icon.href"
              target="_blank"
              class="mr-2"
              rel="noopener noreferrer nofollow"
            >
              <img
                :src="icon.src"
                :alt="icon.name"
              >
            </a>
          </template>
        </div>
      </div>
      <div class="row">
        <div class="ml-3">
          <ul class="additional_links">
            <li v-for="link in getCommonFooterLinks" :key="link.label">
              <router-link
                :to="link.to"
              >
                {{ $t(link.label) }}
              </router-link>
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

<script>
  import Vue from 'vue';
  import { nanoid } from 'nanoid';
  import {
    FOOTER_LINKS,
    PRO_FOOTER_LINKS,
    PRO_POLICY_FOOTER_LINK,
    POLICY_FOOTER_LINK,
    FOOTER_SOCIAL_ICONS,
    FOOTER_LEGAL_ICONS,
  } from '@/constants/footer-links';
  import { acceptedLinksWithIdForClientWave, acceptedLinksForClientWave } from './footer-utils';

  export default Vue.extend({
    name: 'es-footer',

    data: () => ({
      isProPage: false,
      isProWave: false,
      isClientWave: false,
      isContactWave: false,
      isFAQWave: false,
      isGiftCard: false,
      selectedLanguage: 'ro',
    }),

    computed: {
      footerLinks() {
        const links = this.isProPage
          ? PRO_FOOTER_LINKS
          : FOOTER_LINKS;
        return links
          .map(item => ({ ...item, id: nanoid() }));
      },

      getCommonFooterLinks() {
        const links = this.isProPage
          ? PRO_POLICY_FOOTER_LINK
          : POLICY_FOOTER_LINK;
        return links;
      },

      getFooterClasses() {
        return {
          'is-pro-wave': this.isProWave,
          'is-client-wave': this.isClientWave,
          'is-common-wave': this.isFAQWave,
          'wave footer': true,
        };
      },
    },

    watch: {
      $route(to) {
        const getUrlParamsId = to.params?.id || to.query?.token;
        const proId = to.query?.pro_id;
        this.isProPage = to.fullPath.includes('easepro');
        this.isProWave = to.fullPath.includes('easepro/');
        this.isClientWave = acceptedLinksForClientWave.includes(to.fullPath)
          || acceptedLinksWithIdForClientWave(getUrlParamsId, proId).includes(to.fullPath);
        this.isFAQWave = to.fullPath.includes('intrebari-frecvente');
      },
    },

    created() {
      this.isProPage = this.$router.currentRoute.fullPath.includes('easepro');
      this.isProWave = this.$router.currentRoute.fullPath.includes('easepro/');
      this.isClientWave = this.$router.currentRoute.fullPath.includes('client/')
        || this.$router.currentRoute.fullPath.includes('pro/');
      this.isContactWave = this.$router.currentRoute.fullPath.includes('contact');
      this.isFAQWave = this.$router.currentRoute.fullPath.includes('intrebari-frecvente');

      const lang = localStorage.getItem('lang');

      if (lang !== this.$root.$i18n.locale) {
        this.$root.$i18n.locale = lang;
      }

      this.selectedLanguage = this.$root.$i18n.locale;
      this.socialIcons = FOOTER_SOCIAL_ICONS;
      this.legalIcons = FOOTER_LEGAL_ICONS;
    },

    methods: {
      onClick(event) {
        event.preventDefault();
        this.$root.$emit('on-show-elite-register');
      },
      async onLanguageChange($event) {
        const lang = $event.target.value || 'ro';
        this.$root.$i18n.locale = lang;
        localStorage.setItem('lang', lang);
      },
      getIconPath(name) {
        const path = require.context('@/assets/svg');

        return path(`./social-${name}.svg`);
      },
    },
  });
</script>

<style lang="scss">
  .legal {
    margin-top: 24px;

    a img {
      width: 160px;
    }
  }

  @media (min-width: 992px) {
    .legal {
      margin-top: 0;

      a img {
        width: 180px;
      }
    }
  }
</style>
