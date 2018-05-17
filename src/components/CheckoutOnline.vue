<template>
  <div class="checkout-online">
    <router-link to="/ChooseAddress" tag="div" class="address">
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
    </router-link>
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
        <div v-if="discount" class="orders__discount-detail">
          <span class="orders__discount-msg">{{discountType(discount.type)}}</span>
          <span>-￥{{discount.minusAmount}}</span>
        </div>
        <div v-else-if="discountMsg">{{discountMsg}}</div>
        <div v-else>满减活动不与单品同享</div>
      </div>
      <hr>
      <div class="orders__redpack">
        <div class="orders__redpack-title">
          红包
        </div>
        <div class="orders__redpack-detail">
          <!--TODO 使用模板表示-->
          <span v-if="redpack">
            <span>{{discountType(redpack.type)}}</span>
            <span>-￥{{redpack.minusAmount}}</span>
          </span>
          <span v-else>无可用红包</span>
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
        <span v-if="noteDetail">{{noteDetail}}</span>
        <span v-else>口味、偏好</span>
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
      discount: {type: 0, requireAmount: 20, minusAmount: 10},
      discountMsg: '',
      redpack: {type: 1, requireAmount: 0, minusAmount: 20},
      redpackDetail: '',
      noteDetail: '',
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
      }],
      discounts: [{
        type: 0,
        requirement: 20,
        discount: 10
      }]
    }
  },
  computed: {
    total: function () {
      let sum = 0
      for (let order of this.orders) {
        sum += order.salePrice * order.amount
      }
      if (this.discount) {
        sum -= this.discount.minusAmount
      }
      if (this.redpack) {
        sum -= this.redpack.minusAmount
      }
      return sum <= 0 ? 0 : sum
    }
  },
  methods: {
    discountType: function (type) {
      let discountTypes = {
        0: '满减优惠',
        1: '新用户红包'
      }
      return discountTypes[type]
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

  .orders__discount-detail {
    display: flex;
    justify-content: space-between;
    color: red;
    font-size: 15px;
  }

  .orders__discount-msg {
    color: #000;
  }

  .orders__redpack {
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
  }

  .orders__redpack-title {
    font-size: large;
    font-weight: 600;
  }

  .orders__redpack-detail {
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
