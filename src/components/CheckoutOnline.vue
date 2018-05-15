<template>
  <div class="checkout-online">
    <div class="address">
      <div class="address__notice">
        订单配送至
      </div>
      <div class="address__detail">
        {{address.district+address.street}}
        <span class="glyphicon glyphicon-menu-right" style="font-weight: 100;"></span>
      </div>
      <div class="address__name-phone">
        {{address.phone+' '+address.name}}
      </div>
    </div>
    <hr>
    <div class="orders">
      <div v-for="order in orders" :key="order.id">
        <div class="order">
          <img class="order__img" :src="order.img">
          <div class="order__name">
            {{order.name}}
          </div>
          <div class="order__amount">
            x {{order.amount}}
          </div>
          <div class="order__origin-price">
            ￥{{order.originPrice}}
          </div>
          <div class="order__sale-price">
            ￥{{order.salePrice}}
          </div>
        </div>
        <hr style="margin: 0px;">
      </div>
      <div class="orders__discount-notice">
        <!--TODO 使用模板表示消息？ -->
        满减活动不与单品同享
      </div>
      <hr>
      <div class="orders__discount">
        <div class="orders__discount-title">
          优惠
        </div>
        <div class="orders__discount-detail">
          <!--TODO 使用模板表示-->
          优惠详情
          <span class="glyphicon glyphicon-menu-right" style="font-weight: 100;"></span>
        </div>
      </div>
      <hr>
      <div class="orders__total">
        <span class="orders__total-notice">
          小计￥
        </span>
        <span class="orders__total-price">
          {{total}}
        </span>
      </div>
    </div>
    <div class="ordernote">
      <span class="ordernote__title">
        订单备注
      </span>
      <span class="ordernote__detail">
        <!-- TODO 改成模板-->
        <span>口味、偏好</span>
        <span class="glyphicon glyphicon-menu-right" style="font-weight: 100;"></span>
      </span>
    </div>
    <div style="height: 10%;"></div>
    <div class="footer">
      <div class="footer__total">
        ￥{{total}}
      </div>
      <div class="footer__pay">
        支付
      </div>
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
  },
  computed: {
    total: function () {
      let sum = 0
      for (let order of this.orders) {
        sum += order.salePrice * order.amount
      }
      return sum
    }
  }
}
</script>

<style scoped>
  hr {
    margin: 0px;
  }

  .checkout-online {
    height: 100%;
    width: 100%;
  }

  .address {
    width: 100%;
    padding: 10px;
    text-align: left;
  }

  .address__notice {
    color: lightgrey;
  }

  .address__detail {
    font-size: large;
    font-weight: bold;
    margin: 5px 0px;
  }

  .address__name-phone {
    font-weight: 400;
  }

  .orders {
    width: 100%;
  }

  .orders__discount-notice {
    color: lightgrey;
    margin: 10px 10px;
  }

  .orders__discount {
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
  }

  .orders__discount-title {
    font-size: large;
    font-weight: 600;
  }

  .orders__discount-detail {
  }

  .orders__total {
    text-align: right;
    padding: 10px 10px;
  }

  .orders__total-notice {
  }

  .orders__total-price {
    font-size: 20px;
    font-weight: bold;
  }

  .order {
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0px 10px;
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
    text-decoration: line-through;
    color: lightgrey;
  }

  .order__sale-price {
    width: 20%;
    color: red;
  }

  .ordernote {
    padding: 10px 10px;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  .ordernote__title {
    font-weight: bold;
  }

  .ordernote__detail {
    color: lightgrey;
  }

  .footer {
    position: fixed;
    bottom: 0px;
    height: 10%;
    width: 100%;
    display: flex;
    align-items: center;
  }

  .footer__total {
    font-size: 20px;
    width: 70%;
    height: 100%;
    color: white;
    background-color: #909090;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .footer__pay {
    position: absolute;
    right: 0px;
    background-color: lawngreen;
    width: 30%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bolder;
    color: white;
  }
</style>
