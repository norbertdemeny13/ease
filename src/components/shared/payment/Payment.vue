<template>
  <div class="es-payment-container">
    <div class="box_order_form">
      <div class="head">
        <div class="title">
          <h3>Metoda de plata</h3>
        </div>
      </div>
      <!-- /head -->
      <div class="main p-4">
        <div class="payment_select">
          <label class="container_radio">Card de credit
            <input type="radio" value="" checked name="payment_method">
            <span class="checkmark" />
          </label>
          <i class="icon_creditcard" />
        </div>
        <div class="form-group">
          <label>Numele de pe card</label>
          <input
            id="name_card_order"
            type="text"
            class="form-control"
            name="name_card_order"
            placeholder="First and last name"
          >
        </div>
        <div class="form-group">
          <label>Numarul cardului</label>
          <input
            id="card_number"
            type="text"
            name="card_number"
            class="form-control"
            placeholder="Card number"
          >
        </div>
        <div class="row">
          <div class="col-md-6">
            <label>Data de expirare</label>
            <div class="row">
              <div class="col-md-6 col-6">
                <div class="form-group">
                  <input
                    id="expire_month"
                    type="text"
                    name="expire_month"
                    class="form-control"
                    placeholder="mm"
                  >
                </div>
              </div>
              <div class="col-md-6 col-6">
                <div class="form-group">
                  <input
                    id="expire_year"
                    type="text"
                    name="expire_year"
                    class="form-control"
                    placeholder="yyyy"
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-sm-12">
            <div class="form-group">
              <label>Codul de securitate</label>
              <div class="row">
                <div class="col-md-4 col-6">
                  <div class="form-group">
                    <input
                      id="ccv"
                      type="text"
                      name="ccv"
                      class="form-control"
                      placeholder="CCV"
                    >
                  </div>
                </div>
                <div class="col-md-8 col-6">
                  <img src="@/assets/gif/icon_ccv.gif" width="50" height="29" alt="ccv"><small>Ultimele 3 digite</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--End row -->
        <a href="" @click.prevent="$emit('on-add-card')">
          Adauga card
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'es-payment',
  });
</script>

