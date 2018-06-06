// import Mock from 'mockjs'

export default {
  add2cart: options => {
    let cart = JSON.parse(options.body).content
    console.log(options)
    localStorage.setItem('cart', JSON.stringify(cart))
  },
  cart: config => {
    let cart = JSON.parse(localStorage.getItem('cart'))
    cart.map(function (item, index, array) {
      array[index].img = require('../assets/shop.png')
    })
    let ret = {success: true, data: {content: cart}}
    return ret
  }
}
