<template>
  <b-card
    no-body
    class="border-primary"
  >
    <b-card-header class="d-flex justify-content-between align-items-center pt-75 pb-25">
      <h4 class="mb-0">
        Companie
      </h4>
    </b-card-header>

    <b-card-body>
      <ul class="list-unstyled my-1">
        <li>
          <h5 class="mb-0">Nume: <span class="align-middle">{{ userData.company_name }}</span></h5>
        </li>
        <li class="my-25">
          <h5 class="mb-0">CIF: <span class="align-middle">{{ userData.cif_number }}</span></h5>
        </li>
        <li>
          <h5 class="mb-0">Registration Nr.: <span class="align-middle">{{ userData.registration_number }}</span></h5>
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
