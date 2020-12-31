<template>
  <div class="content">
    <div class="es_service-details-page container margin_30_20">
      <router-link class="back-button" :to="`/servicii/${$router.currentRoute.params.type}`">
        Inapoi
      </router-link>
      <div class="row my-4">
        <div class="col-xl-6 col-lg-6 col-md-6">
          <img :src="service.absolute_image_url_large" width="500" height="350">
        </div>
        <div class="col-xl-6 col-lg-6 col-md-6">
          <h2>{{ service.name }}</h2>
          <p>{{ service.description }}</p>
          <!-- Extra services list goes here -->
          <h4 class="my-4">Adauga</h4>
          <div class="extra-services-container row my-4 ml-0">
            <div class="d-flex flex-row p-2 w-100">
              <img
                :src="service.absolute_image_url_small"
                :data-src="service.absolute_image_url_small"
                class="img-fluid lazy"
                alt=""
                width="80px"
                height="60px"
              >
              <div class="d-flex flex-column flex-grow-1 ml-2 px-2">
                <h5>French</h5>
                <div class="d-flex justify-content-between">
                  <p class="m-0">5 Lei / unghie</p>
                  <div class="form-group">
                    <select class="form-control">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="extra-services-container row my-4 ml-0">
            <div class="d-flex flex-row p-2 w-100">
              <img
                :src="service.absolute_image_url_small"
                :data-src="service.absolute_image_url_small"
                class="img-fluid lazy"
                alt=""
                width="80px"
                height="60px"
              >
              <div class="d-flex flex-column flex-grow-1 ml-2 px-2">
                <h5>French</h5>
                <div class="d-flex justify-content-between">
                  <p class="m-0">5 Lei / unghie</p>
                  <div class="form-group">
                    <select class="form-control">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="extra-services-container row my-4 ml-0">
            <div class="d-flex flex-row p-2 w-100">
              <img
                :src="service.absolute_image_url_small"
                :data-src="service.absolute_image_url_small"
                class="img-fluid lazy"
                alt=""
                width="80px"
                height="60px"
              >
              <div class="d-flex flex-column flex-grow-1 ml-2 px-2">
                <h5>Pictura pe unghii</h5>
                <div class="d-flex justify-content-between">
                  <p class="m-0">5 Lei / unghie</p>
                  <div class="form-group">
                    <select class="form-control">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="extra-services-container row my-4 ml-0">
            <div class="d-flex flex-row p-2 w-100">
              <img
                :src="service.absolute_image_url_small"
                :data-src="service.absolute_image_url_small"
                class="img-fluid lazy"
                alt=""
                width="80px"
                height="60px"
              >
              <div class="d-flex flex-column flex-grow-1 ml-2 px-2">
                <h5>Strasuri Swarovsky</h5>
                <div class="d-flex justify-content-between">
                  <p class="m-0">3 Lei / stras</p>
                  <div class="form-group">
                    <select class="form-control">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Extra additional services list goes here -->
          <h4 class="my-4">Servicii Aditionale</h4>
          <div class="added-services-container row my-4 ml-0">
            <div class="d-flex flex-column p-2 w-100">
              <div class="d-flex alig-items-center justify-content-between">
                <h5 class="m-0">Manichiura Evo Gel</h5>
                <img
                  src="@/assets/icons/trash-can.svg"
                  class="img-fluid lazy mr-2"
                  alt=""
                  width="13px"
                  height="13px"
                >
              </div>
              <p>120 Ron</p>
              <span>French x 10</span>
              <span>spanictura spane unghii x2 </span>
              <span>Indespanartare lac gel x10</span>
            </div>
          </div>
          <div class="d-flex justify-content-start">
            <a class="mt-4" href="">
              <i class="icon_plus" />
              Mai Adauga Un Serviciu
            </a>
          </div>
          <div class="d-flex justify-content-center">
            <router-link
              class="btn btn-sm btn-pink btn-pill mt-4 px-6"
              :to="`${$router.currentRoute.path}/rezerva`"
            >
              Continua
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapGetters, mapActions } from 'vuex';

  export default Vue.extend({
    name: 'es-service-details',

    computed: {
      ...mapGetters({
        getServiceById: 'getServiceById',
        isFetching: 'isFetching',
      }),

      service() {
        return this.getServiceById;
      },
    },

    created() {
      const { type, id } = this.$router.currentRoute.params;
      this.fetchServiceById({ type, id });
    },

    methods: {
      ...mapActions({
        fetchServiceById: 'fetchServiceById',
      }),
    },
  });
</script>
