<!-- eslint-disable -->
<template>
  <div>

    <!-- Media -->
    <b-media class="mb-2">
      <template #aside>
        <b-avatar
          ref="previewEl"
          :src="getImageSource"
          :text="avatarText(userData.fullName)"
          :variant="`light-${resolveUserRoleVariant(userData.role)}`"
          size="90px"
          rounded
        />
      </template>
      <h4 class="mb-1">
        {{ userData.full_name }}
      </h4>
      <div class="d-flex flex-wrap">
        <b-button
          variant="primary"
          @click="$emit('on-save')"
        >
          <input
            ref="refInputEl"
            type="file"
            class="d-none"
            @input="inputImageRenderer"
          >
          <span class="d-none d-sm-inline">Save</span>
          <feather-icon
            icon="EditIcon"
            class="d-inline d-sm-none"
          />
        </b-button>
        <b-button
          variant="outline-secondary"
          class="ml-1"
        >
          <span class="d-none d-sm-inline">Remove</span>
          <feather-icon
            icon="TrashIcon"
            class="d-inline d-sm-none"
          />
        </b-button>
      </div>
    </b-media>

    <!-- User Info: Input Fields -->
    <b-form>
      <b-row>

        <!-- Field: Username -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Nume complet"
            label-for="full_name"
          >
            <b-form-input
              id="full_name"
              v-model="userData.full_name"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Full Name -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Nume afisat"
            label-for="display-name"
          >
            <b-form-input
              id="display-name"
              v-model="userData.display_name"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Email -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Email"
            label-for="email"
          >
            <b-form-input
              id="email"
              v-model="userData.email"
              type="email"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Status -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Status"
            label-for="user-status"
          >
            <v-select
              v-model="userData.status"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="statusOptions"
              :reduce="val => val.value"
              :clearable="false"
              input-id="user-status"
            />
          </b-form-group>
        </b-col>

        <!-- Field: City -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="User City"
            label-for="user-city"
          >
            <v-select
              v-model="userData.city"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="cityOptions"
              :reduce="val => val.value"
              :clearable="false"
              input-id="user-city"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Email -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Nume companie"
            label-for="company"
          >
            <b-form-input
              id="company"
              v-model="userData.company_name"
            />
          </b-form-group>
        </b-col>

      </b-row>
    </b-form>
  </div>
</template>

<script>
  /* eslint-disable */
  import {
    BButton, BMedia, BAvatar, BRow, BCol, BFormGroup, BFormInput, BForm, BTable, BCard, BCardHeader, BCardTitle, BFormCheckbox,
  } from 'bootstrap-vue'
  import { avatarText } from '@/core/utils/filter'
  import vSelect from 'vue-select'
  import { useInputImageRenderer } from '@/core/comp-functions/forms/form-utils'
  import { ref } from '@vue/composition-api'
  import useUsersList from '../elites-list/useElitesList'

  export default {
    components: {
      BButton,
      BMedia,
      BAvatar,
      BRow,
      BCol,
      BFormGroup,
      BFormInput,
      BForm,
      BTable,
      BCard,
      BCardHeader,
      BCardTitle,
      BFormCheckbox,
      vSelect,
    },
    props: {
      userData: {
        type: Object,
        required: true,
      },
    },
    computed: {
      getImageSource() {
        return this.userData?.avatar?.url;
      },
    },
    setup(props) {
      const { resolveUserRoleVariant } = useUsersList()

      const cityOptions = [
        { label: 'Cluj Napoca', value: '1' },
        { label: 'Bucuresti', value: '2' },
      ]

      const statusOptions = [
        { label: 'Pending', value: 'pending' },
        { label: 'Active', value: 'active' },
        { label: 'Paused', value: 'paused' },
        { label: 'Blocked', value: 'blocked' },
      ]

      // ? Demo Purpose => Update image on click of update
      const refInputEl = ref(null)
      const previewEl = ref(null)

      const { inputImageRenderer } = useInputImageRenderer(refInputEl, base64 => {
        // eslint-disable-next-line no-param-reassign
        props.userData.avatar.url = base64
      })

      return {
        resolveUserRoleVariant,
        avatarText,
        cityOptions,
        statusOptions,

        //  ? Demo - Update Image on click of update button
        refInputEl,
        previewEl,
        inputImageRenderer,
      }
    },
  }
</script>

<style lang="scss">
@import '@/core/scss/vue/libs/vue-select.scss';
</style>
