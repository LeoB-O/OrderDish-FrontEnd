<template>
  <div class="casher-content">
    <div class="casher-content-header">已选商品</div>
    <div class="space"></div>
    <div v-for="item in cart" class="casher-item" v-bind:key="item.id">
      <div class="casher-item-name">
          <span>
            {{item.name}}
          </span>
        <span class="casher-item-options">
            {{optionsToString(item.options)}}
          </span>
      </div>
      <div class="casher-item-price">
        {{item.salePrice}}
      </div>
      <div class="casher-item-amount">
        <div @click="$emit('remove-from-cart', item.id)"
             class="button-add glyphicon glyphicon-minus-sign"
             aria-hidden="true"></div>
        <span>{{item.amount}}</span>
        <div @click="$emit('add-to-cart', item.id)"
             class="button-add glyphicon glyphicon-plus-sign"
             aria-hidden="true"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'casherContent',
  props: {
    cart: Array
  },
  methods: {
    optionsToString: function (options) {
      let ret = '|'
      for (let key in options) {
        ret += options[key] + '|'
      }
      return ret
    }
  }
}
</script>

<style scoped>
  .casher-content {
    position: fixed;
    display: block;
    width: 100%;
    max-height: 40%;
    bottom: 10%;
    background-color: white;
  }

  .casher-content .space {
    height: 45px;
  }

  .casher-content-header {
    background-color: #458994;
    font-size: 25px;
    padding: 5px 0px;
    width: 100%;
    position: fixed;
    color: white;
  }

  .casher-item {
    font-size: 15px;
    display: flex;
    justify-content: space-between;
    padding: 15px 0px;
  }

  .casher-item .casher-item-name {
    width: 50%;
  }

  .casher-item .casher-item-options {
    font-size: 10px;
    color: grey;
  }

  .casher-item .casher-item-price {
    width: 20%;
  }

  .casher-item .casher-item-amount {
    width: 15%;
    display: flex;
    justify-content: space-between;
  }
</style>
