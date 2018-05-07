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
    <div class="casher-content">
      <div v-for="item in cart" class="casher-item" v-bind:key="item.id">
        <div class="casher-item-name">
          {{item.name}}
        </div>
        <div class="casher-item-price">
          {{item.price}}
        </div>
        <div class="casher-item-amount">
          <div @click="removeFromCart"
               class="button-add glyphicon glyphicon-minus-sign"
               aria-hidden="true"></div>
          <span>{{item.amount}}</span>
          <div @click="addToCart" v-if="!item.options"
               class="button-add glyphicon glyphicon-plus-sign"
               aria-hidden="true"></div>
        </div>
      </div>
    </div>
    <div class="space"></div>
    <div class="casher">
      <div v-if="cart.length==0" class="cart">
        <div>未选购商品</div>
      </div>
      <div v-else class="cart" @click="handleCartClick">
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
  mounted: function () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll: function () {
      let targetElem = document.getElementsByClassName('catagory')[0]
      let headerHeight = document.getElementsByClassName('header')[0].offsetHeight
      let offset = document.documentElement.scrollTop
      let top = headerHeight - offset
      console.log(top + 'px')
      targetElem.style.top = top + 'px'
    },
    handleCartClick: function () {
      let cartContent = document.getElementsByClassName('casher-content')[0]
      let cartDisplay = cartContent.style.display
      if (cartDisplay === 'none' || cartDisplay === '') {
        cartContent.style.display = 'block'
      } else {
        cartContent.style.display = 'none'
      }
    },
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
      let cPos = document.getElementById(cataName).offsetTop
      console.log(cPos)
      document.getElementsByClassName('item')[0].scrollTo(0, cPos)
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

<style>
  .order-dish-online {
    height: 100%;
  }

  .container {
    height: 90%;
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
    /*left: 25%;*/
  }

  .header .split-line {
    width: 100%;
    height: 1px;
    background-color: #dcdcdc;
  }

  .container {
    width: 100%;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 0px;
    padding-right: 0px;
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
    height: auto;
    padding: 10px 0px;
    /*border-bottom: 1px solid;*/
    /*border-style: solid;*/
    display: flex;
    justify-content: center;
    background-color: #ffffff;
  }

  .item {
    width: 80%;
    height: 100%;
    float: right;
    overflow: scroll;
    position: relative;
  }

  .item ul {
    list-style-type: none;
    height: auto;
  }

  .item li {
    /*border-bottom: 1px solid;*/
    height: 15%;
    display: flex;
    align-items: center;
  }

  .item li img {
    width: auto;
    height: 7em;
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
  }

  .item li .button-add {
    font-size: 20px;
    color: #FF8C00;
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

  .casher-content {
    position: fixed;
    display: none;
    width: 100%;
    bottom: 10%;
    background-color: white;
  }

  .casher-item {
    font-size: 15px;
    display: flex;
    justify-content: space-around;
  }

  .casher-item .casher-item-name {
    width: 50%;
  }
  .casher-item .casher-item-price {
    width: 20%;
  }

  .casher-item .casher-item-amount {
    width: 30%;
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
