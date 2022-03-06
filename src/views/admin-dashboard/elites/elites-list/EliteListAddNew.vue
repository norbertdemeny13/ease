<!-- eslint-disable -->
<template>
  <b-sidebar
    id="add-new-user-sidebar"
    :visible="isAddNewUserSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-user-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Add New User
        </h5>

        <feather-icon
          class="ml-1 cursor-pointer"
          icon="XIcon"
          size="16"
          @click="hide"
        />

      </div>

      <!-- BODY -->
        <!-- Form -->
        <b-form
          class="p-2"
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >

          <!-- Full Name -->
            <b-form-group
              label="Full Name"
              label-for="full-name"
            >
              <b-form-input
                id="full-name"
                v-model="userData.fullName"
                autofocus
                trim
                placeholder="John Doe"
              />

            </b-form-group>

          <!-- Username -->
            <b-form-group
              label="Username"
              label-for="username"
            >
              <b-form-input
                id="username"
                v-model="userData.username"
                trim
              />

            </b-form-group>

          <!-- Email -->
            <b-form-group
              label="Email"
              label-for="email"
            >
              <b-form-input
                id="email"
                v-model="userData.email"
                trim
              />

            </b-form-group>

          <!-- Company -->
            <b-form-group
              label="Contact"
              label-for="contact"
            >
              <b-form-input
                id="contact"
                v-model="userData.contact"
                trim
              />

            </b-form-group>

          <!-- Company -->
            <b-form-group
              label="Company"
              label-for="company"
            >
              <b-form-input
                id="company"
                v-model="userData.company"
                trim
              />

            </b-form-group>

          <!-- Country -->
            <b-form-group
              label="Country"
              label-for="country"
            >
              <v-select
                v-model="userData.country"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="countries"
                :clearable="false"
                input-id="country"
              />
            </b-form-group>

          <!-- User Role -->
            <b-form-group
              label="User Role"
              label-for="user-role"
            >
              <v-select
                v-model="userData.city"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="cityOptions"
                :reduce="val => val.value"
                :clearable="false"
                input-id="user-role"
              />
            </b-form-group>

          <!-- Plan -->
            <b-form-group
              label="Plan"
              label-for="plan"
            >
              <v-select
                v-model="userData.currentService"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="serviceOptions"
                :reduce="val => val.value"
                :clearable="false"
                input-id="plan"
              />
            </b-form-group>

          <!-- Form Actions -->
          <div class="d-flex mt-2">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mr-2"
              type="submit"
            >
              Add
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="button"
              variant="outline-secondary"
              @click="hide"
            >
              Cancel
            </b-button>
          </div>

        </b-form>
    </template>
  </b-sidebar>
</template>

<script>
  /* eslint-disable */
  import {
    BSidebar, BForm, BFormGroup, BFormInput, BFormInvalidFeedback, BButton,
  } from 'bootstrap-vue'
  import { ref } from '@vue/composition-api'
  import { required, alphaNum, email } from '@/validations/validators'
  import formValidation from '@/core/comp-functions/forms/form-validation'
  import Ripple from 'vue-ripple-directive'
  import vSelect from 'vue-select'
  import countries from '@/fake-db/data/other/countries'
  import { store } from '@/store'

  export default {
    components: {
      BSidebar,
      BForm,
      BFormGroup,
      BFormInput,
      BFormInvalidFeedback,
      BButton,
      vSelect,
    },
    directives: {
      Ripple,
    },
    model: {
      prop: 'isAddNewUserSidebarActive',
      event: 'update:is-add-new-user-sidebar-active',
    },
    props: {
      isAddNewUserSidebarActive: {
        type: Boolean,
        required: true,
      },
      cityOptions: {
        type: Array,
        required: true,
      },
      serviceOptions: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        required,
        alphaNum,
        email,
        countries,
      }
    },
    setup(props, { emit }) {
      const blankUserData = {
        fullName: '',
        username: '',
        email: '',
        role: null,
        currentPlan: null,
        company: '',
        country: '',
        contact: '',
      }

      const userData = ref(JSON.parse(JSON.stringify(blankUserData)))
      const resetuserData = () => {
        userData.value = JSON.parse(JSON.stringify(blankUserData))
      }

      const onSubmit = () => {
        store.dispatch('app-user/addUser', userData.value)
          .then(() => {
            emit('refetch-data')
            emit('update:is-add-new-user-sidebar-active', false)
          })
      }

      const {
        refFormObserver,
        getValidationState,
        resetForm,
      } = formValidation(resetuserData)

      return {
        userData,
        onSubmit,

        refFormObserver,
        getValidationState,
        resetForm,
      }
    },
  }
</script>

<style lang="scss">
@import '@/core/scss/vue/libs/vue-select.scss';

#add-new-user-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
