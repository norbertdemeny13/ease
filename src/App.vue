<!-- eslint-disable -->
<template>
  <div>
    <es-header />
    <main>
      <transition name="app_a-fade" mode="out-in">
        <router-view :key="$route.path" />
      </transition>
      <es-toasts />
    </main>
    <es-footer />
    <es-auth-modal v-if="isModalOpen" :is-open="isModalOpen" />
    <portal-target name="modal" multiple />
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
      isModalOpen: true,
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
  });
</script>
