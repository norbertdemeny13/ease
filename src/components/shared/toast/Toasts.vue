<template>
  <section
    aria-live="polite"
    aria-atomic="true"
    class="es-toasts"
    data-qa-koi="toasts"
  >
    <transition-group
      class="es-toasts__list"
      name="slide"
      tag="ul"
    >
      <li
        v-for="toast in $toasts.toasts"
        :key="toast.id"
        class="es-toasts__item"
      >
        <es-toast
          :id="toast.id"
          :auto-dismiss="toast.autoDismiss"
          :duration="toast.duration"
          :icon="toast.icon"
          :message="toast.message"
          :title="toast.title"
          :intent="toast.intent"
          :on-dismiss="toast.onDismiss"
        />
      </li>
    </transition-group>
  </section>
</template>

<script>
  export default {
    name: 'es-toasts',
  };
</script>
