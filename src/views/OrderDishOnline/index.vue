<template>
  <div class="order-dish-online">
    <myheader :shop="shop"></myheader>
    <div class="container">
      <catagory :content="content" @active="active"></catagory>
      <item :content="content"
            :cart="cart"
            @remove-from-cart="removeFromCart"
            @add-to-cart="addToCart"
            @show-options="showOptions"
      >
      </item>
      <div style="clear: both;"></div>
    </div>
    <transition name="casher">
      <casher-content v-if="showCart" :cart="cart" @remove-from-cart="removeFromCart" @add-to-cart="addToCart"></casher-content>
    </transition>
    <div style="height: 10%;"></div>
    <div class="casher__discount" v-if="selectDiscount.minusAmount>0 && !showCart">
      已满足优惠条件，结算时优惠{{selectDiscount.minusAmount}}元
    </div>
    <casher :cart="cart" :shop="shop" @cart-clicked="handleCartClick"></casher>
    <modal :options="options"
           :show-modal="showModal"
           @handle-show-modal="handleShowModal"
           @select-options="selectOptions($event.option, $event.item)"
           @add-to-cart-with-option="addToCartWithOption"
    >
    </modal>
  </div>
</template>

<script>
import request from '@/util/request'
import {findDishById} from '@/util/orderdish'

import item from './components/item'
import casher from './components/casher'
import casherContent from './components/casherContent'
import catagory from './components/catagory'
import myheader from './components/myheader'
import modal from './components/modal'

export default {
  name: 'index',
  components: {
    item,
    casher,
    casherContent,
    catagory,
    myheader,
    modal
  },
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
      // let cartContent = document.getElementsByClassName('casher-content')[0]
      // let cartDisplay = cartContent.style.display
      // if (cartDisplay === 'none' || cartDisplay === '') {
      //   cartContent.style.display = 'block'
      // } else {
      //   cartContent.style.display = 'none'
      // }
      this.showCart = !this.showCart
    },
    handleShowModal: function () {
      this.showModal = this.showModal === 'block' ? 'none' : 'block'
    },
    active: function (cataName) {
      let cPos = document.getElementById(cataName).offsetTop
      let currentPos = document.getElementsByClassName('item')[0].scrollTop
      let distance = cPos - currentPos
      let step = distance / 100
      smoothScroll()
      // while (Math.abs(distance) > Math.abs(step * 2)) {
      //   setTimeout(smoothScroll, 10, currentPos + step)
      //   smoothScroll(currentPos + step)
      //   currentPos = document.getElementsByClassName('item')[0].scrollTop
      //   console.log(currentPos)
      //   distance = cPos - currentPos
      // }
      function smoothScroll () {
        if (Math.abs(distance) > Math.abs(step * 2)) {
          document.getElementsByClassName('item')[0].scrollTo(0, currentPos + step)
          currentPos = document.getElementsByClassName('item')[0].scrollTop
          distance = cPos - currentPos
          setTimeout(smoothScroll, 10)
        } else {
          document.getElementsByClassName('item')[0].scrollTo(0, cPos)
        }
      }
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
        avator: require('@/assets/shop.png'),
        backgroundImg: require('@/assets/background.png'),
        minCost: 10
      },
      showModal: 'none',
      showCart: false,
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

<style scoped>
  .order-dish-online {
    height: 100%;
  }

  .container {
    height: 90%;
    padding-left: 0px;
    padding-right: 15px;
  }

  .casher__discount {
    position: fixed;
    bottom: 10%;
    background-color: #ff8c00;
    width: 100%;
    color: white;
  }

  .casher-enter-active {
    transition: all .8s ease;
  }

  .casher-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .casher-enter, .casher-leave-to {
    transform: translateY(100px);
    opacity: 0;
  }
</style>
