<template>
  <div class="checkout-online">
    <div class="address">
      <div class="address__notice">
        订单配送至
      </div>
      <div class="address__detail">
        {{address.district+address.street}}
      </div>
      <div class="address__name-phone">
        {{address.phone+' '+address.name}}
      </div>
    </div>
    <hr>
    <div class="orders">
      <div class="order" v-for="order in orders" :key="order.id">
        <img class="order__img" :src="order.img">
        <div class="order__name">
          {{order.name}}
        </div>
        <div class="order__amount">
          {{order.amount}}
        </div>
        <div class="order__origin-price">
          {{order.originPrice}}
        </div>
        <div class="order__sale-price">
          {{order.salePrice}}
        </div>
      </div>
    </div>
    <div class="ordernote">
      Here is order note
    </div>
    <div style="height: 10%;"></div>
    <div class="footer">
      Here is footer
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutOnline',
  data () {
    return {
      address: {
        name: 'LeoB_O',
        phone: '13566664444',
        state: '江苏省',
        city: '镇江市',
        district: '京口区',
        street: '学府路301号江苏大学'
      },
      orders: [{
        id: 0,
        name: 'test1',
        originPrice: 18.88,
        salePrice: 18.88,
        options: {},
        amount: 1,
        img: require('../assets/shop.png')
      }, {
        id: 1,
        name: 'test2',
        originPrice: 19,
        salePrice: 9,
        options: {option1: 'select1', option2: 'select2'},
        amount: 10,
        img: require('../assets/shop.png')
      }]
    }
  }
}
</script>

<style scoped>
  .checkout-online {
    height: 100%;
    width: 100%;
  }

  .address {
    width: 100%;
  }

  .orders {
    width: 100%;
  }

  .order {
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .order__img {
    width: 60px;
    height: 60px;
  }

  .order__name {
    width: 20%;
  }

  .order__amount {
    width: 20%;
  }

  .order__origin-price {
    width: 20%;
  }

  .order__sale-price {
    width: 20%;
  }

  .ordernote {

  }

  .footer {
    position: fixed;
    bottom: 0px;
    height: 10%;
  }
</style>
