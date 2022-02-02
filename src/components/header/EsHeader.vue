<template>
  <div>
    <header :class="`header black_nav clearfix element_to_stick ${isHomePage ? '' : 'header-in'}`">
      <div class="container">
        <div id="logo">
          <router-link v-if="isPro" to="/easepro/">
            <img
              src="@/assets/svg/pro-logo.svg"
              width="90"
              height="30"
              alt="Ease Pro Logo"
              class="my-2"
            >
          </router-link>
          <router-link v-else to="/">
            <img
              src="@/assets/svg/ease-logo_pink.svg"
              width="162"
              height="45"
              alt="Ease Logo"
            >
          </router-link>
        </div>
        <div class="layer" /><!-- Opacity Mask Menu Mobile -->
        <ul id="top_menu">
          <li v-if="isAuthenticated">
            <div class="dropdown user clearfix">
              <a href="#" data-toggle="dropdown">
                <figure>
                  <img v-if="getUser.avatar && getUser.avatar.url" :src="getUser.avatar.url" alt="Profile Pic">
                  <div v-else class="item-header">
                    <div class="item-logo">{{ getInitials }}</div>
                  </div>
                </figure>
                <span>{{ $t('generic.my_account') }}
                </span>
              </a>
              <div class="dropdown-menu">
                <div class="dropdown-menu-content">
                  <ul>
                    <li
                      v-for="link in getAuthNavLinks"
                      :key="link.id"
                      @click.prevent="onNavLinkClick(link.to)"
                    >
                      <a href="">
                        {{ link.label }}
                      </a>
                    </li>
                    <li>
                      <a href="" @click.prevent="onLogout"><i class="icon_key" />{{ $t('generic.logout') }}
                      </a>
                    </li>
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
      :modal-type="modalType"
      :type="userType"
      @show-validate-phone-modal="isValidatePhoneModalOpen = true"
      @show-forgot-password-modal="isForgotPasswordModalOpen = true"
    />
    <es-validate-phone-modal
      v-if="isValidatePhoneModalOpen"
      v-model="isValidatePhoneModalOpen"
      :can-close-modal="false"
      @show-phone-confirmation-modal="isPhoneConfirmationModalOpen = true"
    />
    <es-phone-confirmation-modal
      v-if="isPhoneConfirmationModalOpen"
      v-model="isPhoneConfirmationModalOpen"
      :can-close-modal="false"
      @show-validate-phone-modal="isValidatePhoneModalOpen = true"
    />
    <es-forgot-password-modal
      v-if="isForgotPasswordModalOpen"
      v-model="isForgotPasswordModalOpen"
      @show-reset-password-modal="isResetPasswordModalOpen = true"
    />
    <es-reset-password-modal v-if="isResetPasswordModalOpen" v-model="isResetPasswordModalOpen" />

    <es-address-modal
      v-if="isAddressModalOpen"
      v-model="isAddressModalOpen"
    />
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
  import { AddressModal } from '@/components/shared/address-modal';
  import { NAVBAR_LINKS, PRO_NAVBAR_LINKS } from '@/constants/navbar-links';

  export default Vue.extend({
    name: 'es-header',

    components: {
      'es-address-modal': AddressModal,
      'es-login-modal': LoginModal,
      'es-validate-phone-modal': ValidatePhoneModal,
      'es-phone-confirmation-modal': PhoneConfirmationModal,
      'es-forgot-password-modal': ForgotPasswordModal,
      'es-reset-password-modal': ResetPasswordModal,
    },

    data: () => ({
      isPro: false,
      isAddressModalOpen: false,
      isHomePage: false,
      isLoginModalOpen: false,
      isPhoneConfirmationModalOpen: false,
      isValidatePhoneModalOpen: false,
      isForgotPasswordModalOpen: false,
      isResetPasswordModalOpen: false,
      modalType: 'login',
      userType: 'client',
    }),

    computed: {
      ...mapGetters({
        isAuthenticated: 'session/isAuthenticated',
        getUserType: 'session/getUserType',
        getUser: 'session/getUser',
      }),
      getInitials(): string {
        const firstNameI = this.getUser.first_name?.split(' ').map((n: any) => n[0]).join('');
        const lastNameI = this.getUser.last_name?.split(' ').map((n: any) => n[0]).join('');
        return `${firstNameI.toUpperCase()} ${lastNameI.toUpperCase()}`;
      },
      getNavbarLinks(): any {
        return this.getUserType === 'elite' ? PRO_NAVBAR_LINKS : NAVBAR_LINKS;
      },
      getAuthNavLinks(): any {
        return this.getNavbarLinks
          .filter((item: any) => item.requiresAuth)
          .map((item: any) => ({ ...item, id: nanoid() }));
      },
      navLinks(): any {
        return this.getNavbarLinks
          .filter((item: any) => !item.requiresAuth)
          .map((item: any) => ({ ...item, id: nanoid() }));
      },
    },

    watch: {
      $route(to) {
        this.isPro = this.$router.currentRoute.path.includes('easepro');
        this.isHomePage = to.name === 'Home' || to.name === 'ProHome';
      },
    },

    created() {
      this.isPro = this.$router.currentRoute.path.includes('pro');
      if (this.isAuthenticated && !this.getUser.phone_number_confirmed) {
        this.isValidatePhoneModalOpen = true;
      }
    },

    mounted() {
      (window as any).initEase();
      this.$root.$on('on-show-login', () => {
        this.isLoginModalOpen = true;
        (this as any).$toasts.toast({
          id: 'login-toast',
          intent: 'info',
          title: this.$t('toast.info_title'),
          message: this.$t('toast.login_or_register'),
        });
      });
      this.$root.$on('on-show-elite-register', () => {
        this.modalType = 'register';
        this.userType = 'elite';
        this.isLoginModalOpen = true;
      });
      this.$root.$on('on-show-address-modal', () => {
        this.isAddressModalOpen = true;
      });
      this.$root.$on('on-show-validate-phone-modal', () => {
        this.isValidatePhoneModalOpen = true;
      });
    },

    methods: {
      ...mapActions({
        logout: 'session/logout',
      }),
      onNavLinkClick(to: string): void {
        this.$router.push(to);
      },

      async onLogout(): Promise<void> {
        await this.logout();
        this.$router.push({ name: this.isPro ? 'ProHome' : 'Home' });
      },
    },
  });
</script>

<style type="text/css" scoped>
  .item-header {
    display: flex;
  }

  .item-logo {
    align-items: center;
    background: #f7f7f7;
    border-radius: 50%;
    color: #000000;
    display: flex;
    height: 35px;
    justify-content: center;
    width: 35px;
  }

  span {
    font-size: 1rem;
  }
</style>
