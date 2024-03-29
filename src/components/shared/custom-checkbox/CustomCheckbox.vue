<template>
  <div class="custom-checkbox">
    <img v-if="getCheckState && !isPending" src="@/assets/svg/success.svg" width="30" height="30">
    <img v-else-if="getCheckState && isPending" src="@/assets/svg/pending.svg" width="30" height="30">
    <img v-else src="@/assets/svg/incomplete.svg" width="30" height="30">
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'es-custom-checkbox',

    props: {
      checked: {
        default: false,
        type: [String, Boolean],
      },
    },

    computed: {
      getCheckState(): boolean {
        let status = false;
        if (typeof this.checked === 'boolean') {
          status = this.checked;
        } else {
          status = this.checked !== 'not_uploaded';
        }
        return status;
      },
      isPending(): boolean {
        return this.checked === 'pending';
      },
      isAccepted(): boolean {
        return this.checked === 'accepted';
      },
    },
  });
</script>

<style scoped lang="scss">
  /* stylelint-disable */

  .label__checkbox {
    display: none;
  }

  .label__check {
    display: inline-block;
    border-radius: 50%;
    border: 5px solid rgba(0,0,0,0.1);
    background: white;
    vertical-align: middle;
    margin-right: 20px;
    width: 2em;
    height: 2em;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border .3s ease;

    .icon {
      opacity: 0.2;
      color: rgba(0, 0, 0, 0.5);
      transition: opacity .3s .1s ease;
      -webkit-text-stroke: 3px rgba(0,0,0,.5);
    }

    &:hover {
      border: 5px solid rgba(0,0,0,0.2);
    }
  }

  .label__check.pending {
    background: #F0AD4E !important;
  }

  .label__checkbox:checked + .label__text .label__check {
    animation: check .5s cubic-bezier(0.895, 0.030, 0.685, 0.220) forwards;

    .icon {
      opacity: 1;
      transform: scale(0);
      color: white !important;
      -webkit-text-stroke: 0;
      animation: icon .3s cubic-bezier(1.000, 0.008, 0.565, 1.650) .1s 1 forwards;
    }
  }

  .center {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%,-50%);
  }

  @keyframes icon {
    from {
      opacity: 0;
      transform: scale(0.3);
    }
    to {
      opacity: 1;
      transform: scale(1)
    }
  }

  @keyframes check {
    0% {
      width: 1.5em;
      height: 1.5em;
      border-width: 5px;
    }
    10% {
      width: 1.5em;
      height: 1.5em;
      opacity: 0.1;
      background: rgba(0,0,0,0.2);
      border-width: 15px;
    }
    12% {
      width: 1.5em;
      height: 1.5em;
      opacity: 0.4;
      background: rgba(0,0,0,0.1);
      border-width: 0;
    }
    50% {
      width: 2em;
      height: 2em;
      background: #00d478;
      border: 0;
      opacity: 0.6;
    }
    100% {
      width: 2em;
      height: 2em;
      background: #00d478;
      border: 0;
      opacity: 1;
    }
  }
</style>
