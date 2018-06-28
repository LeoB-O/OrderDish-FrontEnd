<template>
  <li :id="item.id">
    <img v-bind:src="item.img || require('../../../../assets/shop.png')">
    <div class="item-detail">
      <div class="item-name">
        {{item.name}}
      </div>
      <div v-if="item.describe" class="item-describe">
        {{item.describe}}
      </div>
      <div class="item-sale">
        月售{{item.sale||231}}
        好评率{{item.rate||100}}
      </div>
      <div class="item-price">
        <span class="item-origin-price" v-if="item.originPrice">
          ￥{{item.originPrice}}
        </span>
        <span>
          ￥{{item.salePrice}}
        </span>
      </div>
      <div class="button">
        <div @click="$emit('remove-from-cart', item.id)" v-if="isInCart"
             class="button-add glyphicon glyphicon-minus-sign"
             aria-hidden="true"></div>
        <span v-if="isInCart">{{totalAmount}}</span>
        <div @click="$emit('add-to-cart', item.id)" v-if="!item.options"
             class="button-add glyphicon glyphicon-plus-sign"
             aria-hidden="true"></div>
        <div @click="$emit('show-options', item)" v-if="item.options"
             class="button-add glyphicon glyphicon-plus-sign"
             aria-hidden="true"></div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'item',
  props: {
    item: Object,
    isInCart: Boolean,
    totalAmount: Number
  }
}
</script>

<style scoped>
  li {
    /*border-bottom: 1px solid;*/
    height: 15%;
    display: flex;
    align-items: center;
  }

  li img {
    width: auto;
    height: 7em;
  }

  li .item-detail {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: normal;
    height: 90%;
  }

  li .item-sale {
    font-size: 10px;
    color: #a0a0a0;
  }

  li .item-origin-price {
    font-weight: normal;
    font-size: small;
    margin-right: 10px;
    text-decoration: line-through;
    color: lightgrey;
  }

  li .item-price {
    font-weight: bold;
    color: #FF8C00;
  }

  li .button {
    position: absolute;
    right: 0px;
    font-size: 20px;
    color: #FF8C00;
  }

  li .button-add {
    font-size: 20px;
    color: #FF8C00;
  }
</style>
