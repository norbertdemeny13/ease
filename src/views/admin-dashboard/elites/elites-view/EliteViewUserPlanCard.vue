<template>
  <b-card
    no-body
    class="border-primary"
  >
    <b-card-header class="d-flex justify-content-between align-items-center pt-75 pb-25">
      <h5 class="mb-0">
        Companie
      </h5>
    </b-card-header>

    <b-card-body>
      <ul class="list-unstyled my-1">
        <li>
          <span class="align-middle">{{ userData.company_name }}</span>
        </li>
        <li class="my-25">
          <span class="align-middle">10 GB storage</span>
        </li>
        <li>
          <span class="align-middle">Basic Support</span>
        </li>
      </ul>
    </b-card-body>
  </b-card>
</template>

<script>
  /* eslint-disable */
  import {
    BCard, BCardHeader, BCardBody, BBadge, BButton,
  } from 'bootstrap-vue'
  import Ripple from 'vue-ripple-directive'

  export default {
    props: {
      userData: {
        type: Object,
        required: true,
      },
    },
    directives: {
      Ripple,
    },
    components: {
      BCard,
      BCardHeader,
      BCardBody,
      BBadge,
      BButton,
    },
  }
</script>

<style>

</style>
