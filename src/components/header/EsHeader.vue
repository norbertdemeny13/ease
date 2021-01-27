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
                    <li><a href=""><i class="icon_key" />Iesi din cont</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- /dropdown -->
          </li>
          <li v-else><a id="sign-in" href="#sign-in-dialog" class="login">Sign In</a></li>
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
    <es-login-modal />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapGetters } from 'vuex';
  import $ from 'jquery';
  import { nanoid } from 'nanoid';
  import { LoginModal } from '@/components/login-modal';
  import { NAVBAR_LINKS } from '@/constants/navbar-links';

  export default Vue.extend({
    name: 'es-header',

    components: {
      'es-login-modal': LoginModal,
    },

    data: () => ({
      isHomePage: false,
    }),

    computed: {
      ...mapGetters({
        isAuthenticated: 'isAuthenticated',
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
      isAuthenticated(newValue) {
        if (newValue) {
          ($ as any).magnificPopup.close();
        }
      },
    },

    mounted() {
      (window as any).initEase();
    },
  });
</script>
