<template>
  <div class="order-dish-online">
    <div class="header">
      <img class="background" v-bind:src="shop.backgroundImg">
      <img class="avator" v-bind:src="shop.avator">
      <h2>{{shop.name}}</h2>
      <div class="split-line"></div>
    </div>
    <div class="container">
      <div class="catagory">
        <ul>
          <li v-for="cata in content" v-bind:class="{catagoryActive: cata.active}" v-bind:key="cata.cataName"
              v-on:click="active">
            <!--<img src="">-->
            <div>
              {{cata.cataName}}
            </div>
          </li>
        </ul>
      </div>
      <div class="item">
        <div v-for="cata in content" v-bind:key="cata.cataName">
          <div class="item-title" v-bind:id="cata.cataName">{{cata.cataName}}</div>
          <ul>
            <li v-for="item in cata.items" :id="item.id" :key="item.name">
              <img v-bind:src="item.img">
              <div class="item-detail">
                <div class="item-name">
                  {{item.name}}
                </div>
                <div v-if="item.describe" class="item-describe">
                  {{item.describe}}
                </div>
                <div class="item-sale">
                  月售{{item.sale}}
                  好评率{{item.rate}}
                </div>
                <div class="item-price">
                  ￥{{item.price}}
                </div>
                <div class="button">
                  <div @click="removeFromCart" v-if="isInCart(item.name)"
                       class="button-add glyphicon glyphicon-minus-sign"
                       aria-hidden="true"></div>
                  <span v-if="isInCart(item.name)">{{selectedAmount(item.name)}}</span>
                  <div @click="addToCart" v-if="!item.options"
                       class="button-add glyphicon glyphicon-plus-sign"
                       aria-hidden="true"></div>
                  <div @click="addToCartWithOption" v-if="item.options"
                       class="button-add glyphicon glyphicon-plus-sign"
                       aria-hidden="true"></div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="space"></div>
    <div class="casher">
      <div v-if="cart.length==0" class="cart">
        <div>未选购商品</div>
      </div>
      <div v-else class="cart">
        <div>{{totalPrice}}</div>
      </div>
      <div v-if="totalPrice<shop.minCost" class="check">
        <div>￥{{shop.minCost}}元起送</div>
      </div>
      <div v-else class="check">
        <div>结账</div>
      </div>
    </div>
  </div>
</template>

<script>
var Mock = require('mockjs')
let content = []
let count = 0
for (let i = 0; i < 20; i++) {
  let items = []
  for (let i = 0; i < 13; i++) {
    items.push(Mock.mock({
      id: count,
      name: '@cword(2,8)',
      img: require('../assets/shop.png'),
      sale: 33,
      rate: '99%',
      describe: '',
      price: 18.8
    }))
    count++
  }
  content.push({cataName: Mock.mock('@cword(2,4)'), items: items, active: false})
}
export default {
  name: 'OrderDishOnline',
  methods: {
    active: function (event) {
      let cataName = event.target.innerHTML.trim()
      if (event.target.children[0]) {
        cataName = event.target.children[0].innerHTML.trim()
      }
      for (let cata of this.content) {
        cata.active = false
      }
      for (let cata of this.content) {
        if (cataName === cata.cataName) {
          cata.active = true
        }
      }
      console.log(cataName)
      // let cPos = $('#' + cataName).position()
      let cPos = document.getElementsByClassName(cataName).scrollTop
      document.getElementById(cataName).scrollTop = cPos
      console.log(cPos.top)
    },
    isInCart: function (itemName) {
      for (let item of this.cart) {
        if (item.name === itemName) { return true }
      }
      return false
    },
    addToCart: function (event) {
      let temp = {}
      let flag = false
      let itemName = event.target.parentNode.parentNode.parentNode.id
      itemName = parseInt(itemName)
      for (let cata of this.content) {
        for (let item of cata.items) {
          if (item.id === itemName) {
            temp.id = item.id
            itemName = item.name
            temp.name = item.name
            temp.price = item.price
            temp.amount = 1
            break
          }
        }
      }
      for (let item of this.cart) {
        if (item.name === itemName) {
          item.amount++
          flag = true
          break
        }
      }
      if (!flag) {
        this.cart.push(temp)
      }
    },
    addToCartWithOption: function (event) {
      // let itemName = event.target.parentNode.parentNode.parentNode.id
      // console.log(itemName);
    },
    removeFromCart: function (event) {
      let itemName = event.target.parentNode.parentNode.parentNode.id
      itemName = parseInt(itemName)
      for (let cata of this.content) {
        for (let item of cata.items) {
          if (item.id === itemName) {
            itemName = item.name
            break
          }
        }
      }
      for (let index in this.cart) {
        if (this.cart[index].name === itemName) {
          if (this.cart[index].amount === 1) { this.cart.splice(index, 1) } else { this.cart[index].amount-- }
          break
        }
      }
    },
    selectedAmount: function (itemName) {
      for (let item of this.cart) {
        if (item.name === itemName) { return item.amount }
      }
      return 0
    }
  },
  computed: {
    totalPrice: function () {
      let total = 0
      for (let item of this.cart) {
        total += item.price * item.amount
      }
      return total.toFixed(2)
    }
  },
  data () {
    return {
      content: content,
      cart: [],
      shop: {
        name: "LeoB_O's Shop",
        avator: require('../assets/shop.png'),
        backgroundImg: require('../assets/background.png'),
        minCost: 10
      }
    }
  }
}
</script>

<style scoped>
  * {
    padding: 0px;
    margin: 0px;
    border: 0px;
    font-family:"Microsoft YaHei",微软雅黑,"MicrosoftJhengHei",华文细黑,STHeiti,MingLiu;
  }

  .header {
    width: 100%;
    height: 30%;
    /*border: 1px solid;*/
    display: flex;
    flex-direction: column;
    align-items: center;
    /*justify-content: center;*/
  }

  .header img.avator {
    width: 20%;
    height: auto;
    position: relative;
    top: -40px;
    /*left: 40%;*/
  }

  .header img.background {
    width: 100%;
    height: 40%;
  }

  .header h2 {
    /*width: 50%;*/
    position: relative;
    top: -10%;
    text-align: center;
    /*left: 25%;*/
  }

  .header .split-line {
    width: 100%;
    height: 1px;
    background-color: #dcdcdc;
  }

  .container {
    width: 100%;
    /*border: 1px solid;*/
  }

  .catagory {
    width: 20%;
    height: 90%;
    float: left;
    position: fixed;
    left: 0px;
  }

  .catagory ul {
    height: 100%;
    list-style-type: none;
    /*border-top: 1px solid;*/
    /*border-left: 1px solid;*/
    /*border-right: 1px solid;*/
    overflow: auto;
  }

  .catagory li {
    height: auto;
    padding: 10px 0px;
    /*border-bottom: 1px solid;*/
    /*border-style: solid;*/
    display: flex;
    justify-content: center;
    background-color: #efefef;
  }

  .catagory li.catagoryActive {
    padding: 10px 0px;
    /*border-bottom: 1px solid;*/
    /*border-style: solid;*/
    display: flex;
    justify-content: center;
    background-color: #ffffff;
  }

  .item {
    width: 80%;
    height: 90%;
    float: right;
    overflow: scroll;
    position: relative;
  }

  .item .item-title {
    height: 5%;
  }

  .item ul {
    list-style-type: none;
    overflow: scroll;
  }

  .item li {
    /*border-bottom: 1px solid;*/
    height: 10em;
    display: flex;
    align-items: center;
  }

  .item li img {
    width: auto;
    height: 90%;
  }

  .item li .item-detail {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: normal;
    height: 90%;
  }

  .item li .item-sale {
    font-size: 10px;
    color: #a0a0a0;
  }

  .item li .item-price {
    font-weight: bold;
    color: #FF8C00;
  }

  .item li .button {
    position: absolute;
    right: 0px;
    font-size: 20px;
    color: #FF8C00;
    width: auto;
    height: auto;
  }

  .item li .button-add {
    font-size: 20px;
    color: #FF8C00;
    width: auto;
    height: auto;
  }

  .space {
    height: 10%;
  }

  .casher {
    width: 100%;
    height: 10%;
    position: fixed;
    border: 1px solid;
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

  .casher .check {
    background-color: #696969;
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .clear {
    clear: both;
  }
</style>
