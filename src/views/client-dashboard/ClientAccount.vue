<template>
  <div class="es_client-account-container content">
    <h4>Cont</h4>
    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <label>Prenume</label>
          <input
            v-model="name"
            type="text"
            class="form-control"
            name="name"
          >
        </div>
        <div class="form-group">
          <label>Prenume</label>
          <input
            v-model="firstName"
            type="text"
            class="form-control"
            name="firstName"
          >
        </div>
        <div class="form-group">
          <label>Adresa de email</label>
          <input
            v-model="email"
            type="text"
            class="form-control"
            name="email"
          >
        </div>
        <div class="form-group">
          <label>Vreau sa primesc oferte si notificari prin</label>
          <div class="radio_c_group">
            <label
              v-for="type in notificationTypes"
              :key="type.value"
              class="container_radio"
              @click="selectedType = type.value"
            >{{ type.label }}
              <input type="radio" value="checkbox" name="notification-type" :checked="type.value === selectedType ? 'checked' : ''">
              <span class="checkmark" />
            </label>
          </div>
        </div>
        <div class="d-flex justify-content-end">
          <button
            class="btn btn-sm btn-pink btn-pill my-4 px-6"
          >
            Salveaza
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'es-client-account',

    data: () => ({
      selectedType: 'email',
      notificationTypes: [
        { label: 'Email', value: 'email' },
        { label: 'SMS', value: 'sms' },
        { label: 'Phone', value: 'phone' },
      ],
      name: 'John',
      firstName: 'Doe',
      email: 'john.doe@gmail.com',
    }),
  });
</script>
