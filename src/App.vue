<!-- eslint-disable -->
<template>
  <div>
    <div class="login-form" v-if="!loggedIn()">
      <form>
        <input v-model="username" placeholder="username">
        <input v-model="password" placeholder="password" type="password">
        <input @click="login()" type="submit" value="log in">
      </form>
    </div>
    <div v-if="loggedIn()">
      <es-header />
      <main>
        <transition name="app_a-fade" mode="out-in">
          <router-view :key="$route.fullpath" />
        </transition>
      </main>
      <es-toasts />
      <es-footer :current-route="this.$router.currentRoute.params.id"/>
      <es-auth-modal v-if="isModalOpen" :is-open="isModalOpen" />
      <portal-target name="modal" multiple />
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapGetters } from 'vuex';
  import { AuthModal } from '@/components/shared/auth-modal';
  import { EsHeader } from '@/components/header';
  import { EsFooter } from '@/components/footer';

  export default Vue.extend({
    name: 'ease-app',

    components: {
      'es-header': EsHeader,
      'es-footer': EsFooter,
      'es-auth-modal': AuthModal,
    },

    data: () => ({
      isModalOpen: false,
      username: '',
      password: '',
    }),

    computed: {
      ...mapGetters({
        isAuth: 'session/isAuth',
      }),
    },

    watch: {
      isAuth(newVal, oldVal) {
        if (newVal && !oldVal) {
          this.isModalOpen = false;
        }
      },
    },
    
    methods: {
      loggedIn() {
        return localStorage.getItem('loggedInVerify') === 'true';
      },

      login() {
        if (this.username === 'admin' && this.password === 'Password1!') {
          localStorage.setItem('loggedInVerify', 'true');
        } else {
          /* eslint-disable */
          alert('Incorrect username or password!');
          localStorage.setItem('loggedInVerify', 'false');
        }
      },
    },
  });
</script>
