<template>
  <div class="item">
    <div v-for="cata in content" v-bind:key="cata.cataName">
      <div class="item-title" v-bind:id="cata.cataName">{{cata.cataName}}</div>
      <ul>
        <item v-for="item in cata.items"
              :id="item.id"
              :key="item.name"
              :item="item"
              :totalAmount="selectedAmount(item.name)"
              :isInCart="isInCart(item.name)"
              @remove-from-cart="$emit('remove-from-cart', $event)"
              @add-to-cart="$emit('add-to-cart', $event)"
              @show-options="$emit('show-options', $event)"
        >
        </item>
      </ul>
    </div>
  </div>
</template>

<script>
import item from './item'

export default {
  name: 'index',
  props: {
    content: Array,
    cart: Array
  },
  components: {item},
  methods: {
    isInCart: function (itemName) {
      return this.cart.some((item) => item.name === itemName)
      // for (let item of this.cart) {
      //   if (item.name === itemName) {
      //     return true
      //   }
      // }
      // return false
    },
    selectedAmount: function (itemName) {
      let totalAmount = 0
      for (let item of this.cart) {
        if (item.name === itemName) {
          totalAmount += item.amount
        }
      }
      return totalAmount
    }
  }
}
</script>

<style scoped>
  .item {
    width: 80%;
    height: 100%;
    float: right;
    overflow: scroll;
    position: relative;
  }

  ul {
    list-style-type: none;
    height: auto;
  }
</style>
