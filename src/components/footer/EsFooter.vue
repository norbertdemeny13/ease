<template>
  <footer>
    <div class="wave footer" />
    <div class="container margin_60_40 fix_mobile">
      <div class="row">
        <div v-for="item in footerLinks" :key="item.id" class="col-lg-3 col-md-6">
          <h3 :data-target="`#${item.id}`">{{ item.category }}</h3>
          <div :id="item.id" class="collapse dont-collapse-sm links">
            <ul>
              <li v-for="link in item.list" :key="link.label">
                <router-link
                  v-if="link.to"
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
              src="@/assets/icons/pinterest-ease.svg"
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
          <figure>
            <img
              src="@/assets/icons/apple-music-ease.svg"
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
            <li><a href="#">Politica de confidentialitate</a></li>
            <li><a href="#">Conditii de utilizare</a></li>
            <li><a href="#">Conditii de utilizare</a></li>
          </ul>
        </div>
      </div>
      <div class="row my-3">
        <p class="ml-3 text-secondary">©2020 EaseApp. Toate drepturile rezervate</p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { nanoid } from 'nanoid';
  import { FOOTER_LINKS } from '@/constants/footer-links';

  export default Vue.extend({
    name: 'es-footer',
    computed: {
      footerLinks() {
        return FOOTER_LINKS
          .map(item => ({ ...item, id: nanoid() }));
      },
    },
  });
</script>
