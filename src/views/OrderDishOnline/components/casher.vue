<template>
  <div class="casher">
    <div v-if="cart.length==0" class="cart">
      <div>未选购商品</div>
    </div>
    <div v-else class="cart-active" @click="$emit('cart-clicked')">
      <div>{{totalPrice}}</div>
    </div>
    <div v-if="totalPrice<shop.minCost" class="check">
      <div>￥{{shop.minCost}}元起送</div>
    </div>
    <router-link v-else to="/CheckoutOnline" tag="div" class="check-active">
      <div>结账</div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'casher',
  props: {
    cart: Array,
    shop: Object
  },
  computed: {
    totalPrice: function () {
      let total = 0
      for (let item of this.cart) {
        total += item.salePrice * item.amount
      }
      return total.toFixed(2)
    },
    selectDiscount: function () {
      let currentDiscount = {requireAmount: 0, minusAmount: 0}
      for (let discount of this.discounts) {
        if (this.totalPrice >= discount.requireAmount && currentDiscount.minusAmount < discount.minusAmount) {
          currentDiscount = discount
        }
      }
      return currentDiscount
    }
  }
}
</script>

<style scoped>
  .casher {
    width: 100%;
    height: 10%;
    position: fixed;
    border: 0px;
    bottom: 0px;
    display: flex;
    color: #909090;
  }
  .casher .cart {
    background-color: #505050;
    width: 80%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .casher .cart-active {
    background-color: #505050;
    width: 80%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .casher .check {
    background-color: #696969;
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .casher .check-active {
    background-color: lightskyblue;
    color: white;
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
