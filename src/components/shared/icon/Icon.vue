<template>
  <div class="es-icon">
    <font-awesome-icon :icon="[`${name ? 'fab' : 'far'}`, `${name || 'credit-card'}`]" />
  </div>
</template>

<script>
  /* eslint-disable */
  import Vue from 'vue';

  import { dom, library } from '@fortawesome/fontawesome-svg-core';

  import {
    // Required by Koi
    faCreditCard as farCreditCard,
    /* eslint-disable import/no-extraneous-dependencies */
  } from '@fortawesome/free-regular-svg-icons';
  import {
    // Required by Koi
    faCcMastercard as fabCcMastercard,
    faCcVisa as fabCcVisa,
    faCcAmex as fabCcAmex,
    faCcDiscover as fabCcDiscover,
    faCcDinersClub as fabCcDinersClub,
    faCcJcb as fabCcJcb,
    /* eslint-disable import/no-extraneous-dependencies */
  } from '@fortawesome/free-brands-svg-icons';
  
  /* eslint-disable */
  library.add(
    fabCcVisa,
    fabCcMastercard,
    fabCcDiscover,
    fabCcAmex,
    fabCcDinersClub,
    fabCcJcb,
    farCreditCard,
  );

  dom.watch();

  export default Vue.extend({
    name: 'es-skeleton',

    props: {
      name: {
        default: 'credit-card',
        type: String,
      },
    }, // props
  });
</script>
