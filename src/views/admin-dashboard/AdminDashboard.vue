<!-- eslint-disable -->
<template>
  <div
    id="admin-app"
    class="admin-dashboard-container h-100"
    :class="[skinClasses]"
  >
    <component v-if="isAdmin" :is="layout">
      <router-view />
    </component>
    <div v-else class="bg_gray content">
      <div class="container margin_30_20">
        <div class="row bg-white p-4">
          <div class="col-md-4">
            <router-link class="back-button" href="" to="/">
              {{ $t('generic.back') }}
            </router-link>
            <h4 class="mt-2">Admin dashboard</h4>
            <div>
              <div class="form-group">
                <label>{{ $t('generic.email') }}</label>
                <input type="email" required class="form-control" name="email" id="email" v-model="form.email">
              </div>
              <div class="form-group">
                <label>{{ $t('generic.password') }}</label>
                <input
                  :type="passwordType"
                  class="form-control"
                  name="password"
                  id="password"
                  v-model="form.password"
                >
                  <span v-if="passwordType === 'password'" class="show-password-btn" @click.prevent="passwordType = 'text'">{{ $t('generic.password_show') }}</span>
                  <span v-if="passwordType === 'text'" class="show-password-btn" @click.prevent="passwordType = 'password'">{{ $t('generic.password_hide') }}</span>
              </div>
            </div>
            <div class="d-flex justify-content-end">
              <button
                class="btn btn-sm btn-pink btn-pill my-4 px-6"
                @click.prevent="onLogin()"
              >
                {{ $t('generic.login') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <scroll-to-top v-if="enableScrollToTop" />
  </div>
</template>

<script>
  /* eslint-disable */
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';
  import { isEqual } from 'lodash-es';
  import ScrollToTop from '@/core/components/scroll-to-top/ScrollToTop.vue';

  // This will be populated in `beforeCreate` hook
  import { $themeColors, $themeBreakpoints, $themeConfig } from '@/utils/theme-config';
  import { watch } from '@vue/composition-api';
  import useAppConfig from '@/core/app-config/useAppConfig';

  import { useWindowSize, useCssVar } from '@vueuse/core';

  import { store } from '@/store';
  import LayoutVertical from '@/layouts/vertical/LayoutVertical.vue';
  // const LayoutVertical = () => import('@/layouts/vertical/LayoutVertical.vue');
  const LayoutHorizontal = () => import('@/layouts/horizontal/LayoutHorizontal.vue');
  const LayoutFull = () => import('@/layouts/full/LayoutFull.vue');

  export default Vue.extend({
    name: 'es-admin-dashboard',
    components: {

      // Layouts
      LayoutHorizontal,
      LayoutVertical,
      LayoutFull,

      ScrollToTop,
    },

    data: () => ({
      userType: 'admin',
      showPassword: false,
      passwordType: 'password',
      form: {
        email: 'admin@ease.ro',
        password: 'Supersecretpassword1!',
      },
    }),

    // ! We can move this computed: layout & contentLayoutType once we get to use Vue 3
    // Currently, router.currentRoute is not reactive and doesn't trigger any change
    computed: {
      ...mapGetters({
        getAdmin: 'session/getAdmin',
      }),
      isAdmin() {
        return this.getAdmin?.email === 'admin@ease.ro' && this.getAdmin?.name === 'Admin';
      },
      layout() {
        if (this.$route.meta.layout === 'full') return 'layout-full';
        return `layout-${this.contentLayoutType}`;
      },
      contentLayoutType() {
        return this.$store.state.appConfig.layout.type;
      },
    },
    beforeCreate() {
      // Set colors in theme
      const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark'];

      // eslint-disable-next-line no-plusplus
      for (let i = 0, len = colors.length; i < len; i++) {
        $themeColors[colors[i]] = useCssVar(`--${colors[i]}`, document.documentElement).value.trim();
      }

      // Set Theme Breakpoints
      const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl'];

      // eslint-disable-next-line no-plusplus
      for (let i = 0, len = breakpoints.length; i < len; i++) {
        $themeBreakpoints[breakpoints[i]] = Number(useCssVar(`--breakpoint-${breakpoints[i]}`, document.documentElement).value.slice(0, -2));
      }

      // Set RTL
      const { isRTL } = $themeConfig.layout;
      document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    },
    setup() {
      const { skin, skinClasses } = useAppConfig();
      const { enableScrollToTop } = $themeConfig.layout;

      // If skin is dark when initialized => Add class to body
      if (skin.value === 'dark') document.body.classList.add('dark-layout');

      // Set Window Width in store
      store.commit('app/UPDATE_WINDOW_WIDTH', window.innerWidth);
      const { width: windowWidth } = useWindowSize();
      watch(windowWidth, (val) => {
        store.commit('app/UPDATE_WINDOW_WIDTH', val);
      });

      return {
        skinClasses,
        enableScrollToTop,
      };
    },

    watch: {
      getAdmin(newVal, oldVal) {
        const isDifferent = !isEqual(newVal, oldVal);
        if (isDifferent && newVal?.email && newVal?.name) {
          this.$router.push('/admin/profesionisti').catch(()=>{});;
        }
      },
    },

    methods: {
      ...mapActions({
        login: 'session/adminLogin',
      }),
      onLogin() {
        this.login({ credentials: this.form, });
      },
    },
  });
</script>
