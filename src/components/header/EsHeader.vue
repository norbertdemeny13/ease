<template>
  <div>
    <header :class="`header black_nav clearfix element_to_stick ${isHomePage ? '' : 'header-in'}`">
      <div class="container">
        <div id="logo">
          <router-link to="/">
            <img src="@/assets/svg/ease-logo_pink.svg" width="162" height="45" alt="Ease Logo">
          </router-link>
        </div>
        <div class="layer" /><!-- Opacity Mask Menu Mobile -->
        <ul id="top_menu">
          <li v-if="isAuthenticated">
            <div class="dropdown user clearfix">
              <a href="#" data-toggle="dropdown">
                <figure><img src="@/assets/jpg/avatar.jpg" alt=""></figure><span>Contul Meu</span>
              </a>
              <div class="dropdown-menu">
                <div class="dropdown-menu-content">
                  <ul>
                    <li
                      v-for="link in getAuthNavLinks"
                      :key="link.id"
                    >
                      <router-link
                        :to="link.to"
                      >
                        {{ link.label }}
                      </router-link>
                    </li>
                    <li><a href="" @click.prevent="onLogout"><i class="icon_key" />Iesi din cont</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- /dropdown -->
          </li>
          <li v-else><a href="" class="login" @click.prevent="isLoginModalOpen = true">Sign In</a></li>
        </ul>
        <!-- /top_menu -->
        <a href="" class="open_close">
          <i class="icon_menu" /><span>Menu</span>
        </a>
        <nav class="main-menu">
          <div id="header_menu">
            <a href="" class="open_close">
              <i class="icon_close" /><span>Menu</span>
            </a>
            <a href="">EASE</a>
          </div>
          <ul>
            <li
              v-for="link in navLinks"
              :key="link.id"
            >
              <router-link
                :to="link.to"
              >
                {{ link.label }}
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <es-login-modal
      v-if="isLoginModalOpen"
      v-model="isLoginModalOpen"
      @show-validate-phone-modal="isValidatePhoneModalOpen = true"
      @show-forgot-password-modal="isForgotPasswordModalOpen = true"
    />
    <es-validate-phone-modal
      v-if="isValidatePhoneModalOpen"
      v-model="isValidatePhoneModalOpen"
      @show-phone-confirmation-modal="isPhoneConfirmationModalOpen = true"
    />
    <es-phone-confirmation-modal
      v-if="isPhoneConfirmationModalOpen"
      v-model="isPhoneConfirmationModalOpen"
      @show-validate-phone-modal="isValidatePhoneModalOpen = true"
    />
    <es-forgot-password-modal
      v-if="isForgotPasswordModalOpen"
      v-model="isForgotPasswordModalOpen"
      @show-reset-password-modal="isResetPasswordModalOpen = true"
    />
    <es-reset-password-modal v-if="isResetPasswordModalOpen" v-model="isResetPasswordModalOpen" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';
  import { nanoid } from 'nanoid';
  import { LoginModal } from '@/components/login-modal';
  import { ValidatePhoneModal } from '@/components/shared/validate-phone-modal';
  import { PhoneConfirmationModal } from '@/components/shared/phone-confirmation-modal';
  import { ForgotPasswordModal } from '@/components/shared/forgot-password-modal';
  import { ResetPasswordModal } from '@/components/shared/reset-password-modal';
  import { NAVBAR_LINKS } from '@/constants/navbar-links';

  export default Vue.extend({
    name: 'es-header',

    components: {
      'es-login-modal': LoginModal,
      'es-validate-phone-modal': ValidatePhoneModal,
      'es-phone-confirmation-modal': PhoneConfirmationModal,
      'es-forgot-password-modal': ForgotPasswordModal,
      'es-reset-password-modal': ResetPasswordModal,
    },

    data: () => ({
      isHomePage: false,
      isLoginModalOpen: false,
      isPhoneConfirmationModalOpen: false,
      isValidatePhoneModalOpen: false,
      isForgotPasswordModalOpen: false,
      isResetPasswordModalOpen: false,
    }),

    computed: {
      ...mapGetters({
        isAuthenticated: 'session/isAuthenticated',
      }),
      getAuthNavLinks() {
        return NAVBAR_LINKS
          .filter(item => item.requiresAuth)
          .map(item => ({ ...item, id: nanoid() }));
      },
      navLinks() {
        return NAVBAR_LINKS
          .filter(item => !item.requiresAuth)
          .map(item => ({ ...item, id: nanoid() }));
      },
    },

    watch: {
      $route(to) {
        this.isHomePage = to.name === 'Home';
      },
    },

    mounted() {
      (window as any).initEase();
      this.$root.$on('on-show-login', () => {
        this.isLoginModalOpen = true;
        (this as any).$toasts.toast({
          id: 'login-toast',
          intent: 'info',
          title: 'Action required',
          message: 'Please login or signup before continue',
        });
      });
    },

    methods: {
      ...mapActions({
        logout: 'session/logout',
      }),
      onLogout() {
        this.$router.push({ name: 'Home' });
        this.logout();
      },
    },
  });
</script>
