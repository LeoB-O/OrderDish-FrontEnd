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
                  <span class="item-origin-price" v-if="item.originPrice">
                    ￥{{item.originPrice}}
                  </span>
                  <span>
                    ￥{{item.salePrice}}
                  </span>
                </div>
                <div class="button">
                  <div @click="removeFromCart(item.id)" v-if="isInCart(item.name)"
                       class="button-add glyphicon glyphicon-minus-sign"
                       aria-hidden="true"></div>
                  <span v-if="isInCart(item.name)">{{selectedAmount(item.name)}}</span>
                  <div @click="addToCart(item.id)" v-if="!item.options"
                       class="button-add glyphicon glyphicon-plus-sign"
                       aria-hidden="true"></div>
                  <div @click="showOptions(item)" v-if="item.options"
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
          <div @click="removeFromCart(item.id)"
               class="button-add glyphicon glyphicon-minus-sign"
               aria-hidden="true"></div>
          <span>{{item.amount}}</span>
          <div @click="addToCart(item.id)"
               class="button-add glyphicon glyphicon-plus-sign"
               aria-hidden="true"></div>
        </div>
      </div>
    </div>
    <div class="space"></div>
    <div class="casher__discount" v-if="selectDiscount.minusAmount>0">
      已满足优惠条件，结算时优惠{{selectDiscount.minusAmount}}元
    </div>
    <div class="casher">
      <div v-if="cart.length==0" class="cart">
        <div>未选购商品</div>
      </div>
      <div v-else class="cart-active" @click="handleCartClick">
        <div>{{totalPrice}}</div>
      </div>
      <div v-if="totalPrice<shop.minCost" class="check">
        <div>￥{{shop.minCost}}元起送</div>
      </div>
      <router-link v-else to="/CheckoutOnline" tag="div" class="check-active">
          <div>结账</div>
      </router-link>
    </div>
    <div class="modal" @click.self="handleShowModal" v-bind:style="{display: showModal}">
      <div class="modal-dialog">
        <div class="modal-header">
          选项
        </div>
        <div class="modal-body">
          <div v-for="option in options" v-bind:key="option.name">
            <div class="option-name">{{option.name}}</div>
            <div class="options">
              <div @click="selectOptions(option, item)" class="option" v-for="item in option.options"
                   v-bind:key="item.name" :id="item" :class="{optionActive: item.active}">
                {{item.name}}
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer" @click="addToCartWithOption">
          确认
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/util/request'
import {findDishById} from '@/util/orderdish'

export default {
  name: 'OrderDishOnline',
  mounted: function () {
    request.get('/api/dishes')
      .then((response) => {
        console.log(response)
        this.content = response.data.data.content
      })
      .catch(function (error) {
        console.log(error)
      })
    request.get('/api/order/cart')
      .then((response) => {
        this.cart = response.data.data.content
      })
  },
  beforeDestroy: function () {
    console.log(this.cart)
    request.post('/api/order/add2cart', {content: this.cart})
  },
  methods: {
    handleScroll: function () {
      let targetElem = document.getElementsByClassName('catagory')[0]
      let headerHeight = document.getElementsByClassName('header')[0].offsetHeight
      let offset = document.documentElement.scrollTop
      let top = headerHeight - offset
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
    handleShowModal: function () {
      this.showModal = this.showModal === 'block' ? 'none' : 'block'
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
      let cPos = document.getElementById(cataName).offsetTop
      console.log(cPos)
      document.getElementsByClassName('item')[0].scrollTo(0, cPos)
    },
    isInCart: function (itemName) {
      for (let item of this.cart) {
        if (item.name === itemName) {
          return true
        }
      }
      return false
    },
    addToCart: function (id) {
      let temp = {}
      let flag = false
      let item = findDishById(this.content, parseInt(id))
      temp.id = item.id
      temp.name = item.name
      temp.salePrice = item.salePrice
      temp.originPrice = item.originPrice
      temp.amount = 1
      for (let item of this.cart) {
        if (item.name === temp.name) {
          item.amount++
          flag = true
          break
        }
      }
      if (!flag) {
        this.cart.push(temp)
      }
    },
    showOptions: function (item) {
      this.handleShowModal()
      let flag = true
      let currentDish = item
      this.options = currentDish.options
      this.currentDishId = item.id

      // 遍历选项查看是否有默认选项
      for (let cata of currentDish.options) {
        flag = true
        for (let item of cata.options) {
          if (item.active) {
            this.currentOptions[cata.name] = item.name
            flag = false
            break
          }
        }

        // 没有默认选项
        if (flag) {
          cata.options[0].active = true
          this.currentOptions[cata.name] = cata.options[0].name
        }
      }
    },
    selectOptions: function (options, option) {
      this.currentOptions[options.name] = option.name
      for (let item of options.options) {
        item.active = false
      }
      option.active = true
    },
    addToCartWithOption: function () {
      let currentDish = findDishById(this.content, this.currentDishId)
      let tempDish = {}
      let isSameOption = true
      tempDish.id = currentDish.id
      tempDish.name = currentDish.name
      tempDish.originPrice = currentDish.originPrice
      tempDish.salePrice = currentDish.salePrice
      tempDish.options = this.currentOptions
      tempDish.amount = 1
      for (let item of this.cart) {
        if (item.id === tempDish.id) {
          isSameOption = true
          for (let optName in item.options) {
            if (item.options[optName] !== tempDish.options[optName]) {
              isSameOption = false
              break
            }
          }
          if (isSameOption) {
            item.amount++
            this.handleShowModal()
            return
          }
        }
      }
      this.cart.push(tempDish)
      this.handleShowModal()
    },
    removeFromCart: function (id) {
      let itemName = id
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
          if (this.cart[index].amount === 1) {
            this.cart.splice(index, 1)
          } else {
            this.cart[index].amount--
          }
          break
        }
      }
    },
    selectedAmount: function (itemName) {
      let totalAmount = 0
      for (let item of this.cart) {
        if (item.name === itemName) {
          totalAmount += item.amount
        }
      }
      return totalAmount
    },
    optionsToString: function (options) {
      let ret = '|'
      for (let key in options) {
        ret += options[key] + '|'
      }
      return ret
    }
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
  },
  data () {
    return {
      content: [],
      cart: [],
      discounts: [{type: 0, requireAmount: 10, minusAmount: 5}, {type: 0, requireAmount: 20, minusAmount: 10}],
      shop: {
        name: "LeoB_O's Shop",
        avator: require('../assets/shop.png'),
        backgroundImg: require('../assets/background.png'),
        minCost: 10
      },
      showModal: 'none',
      currentDishId: '',
      currentOptions: {},
      options: [{
        name: 'option-name-1',
        options: ['option1', 'option2', 'option3...']
      }, {
        name: 'option-name-2',
        options: ['option1', 'option2', 'option3...']
      }]
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
    width: auto;
    height: 30%;
    position: relative;
    top: -15%;
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
    height: 100%;
    float: left;
    position: relative;
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

  .item li .item-origin-price {
    font-weight: normal;
    font-size: small;
    margin-right: 10px;
    text-decoration: line-through;
    color: lightgrey;
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
    border: 0px;
    bottom: 0px;
    display: flex;
    color: #909090;
  }

  .casher__discount {
    position: fixed;
    bottom: 10%;
    background-color: #ff8c00;
    width: 100%;
    color: white;
  }

  .casher-content {
    position: fixed;
    display: none;
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

  .modal {
    background-color: rgba(0, 0, 0, 0.2);
  }

  .modal .modal-dialog {
    background-color: white;
    top: 30%;
  }

  .modal .modal-dialog .option-name {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .modal .modal-dialog .options {
    display: flex;
    justify-content: space-around;
  }

  .modal .modal-dialog .option {
    border: 1px;
    border-style: solid;
    border-color: deepskyblue;
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    border-radius: 15px;
    margin: 5px;
    padding: 5px;
  }

  .modal .modal-dialog .optionActive {
    background-color: deepskyblue;
    color: white;
    font-weight: bold;
  }

  .clear {
    clear: both;
  }
</style>
