import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import OrderDishOnline from '@/components/OrderDishOnline'
import CheckoutOnline from '@/components/CheckoutOnline'
import ChooseAddress from '@/components/ChooseAddress'
import AddOrEditAddress from '@/components/AddOrEditAddress'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/OrderDishOnline',
      name: 'OrderDishOnline',
      component: OrderDishOnline
    },
    {
      path: '/CheckoutOnline',
      name: 'CheckoutOnline',
      component: CheckoutOnline
    },
    {
      path: '/ChooseAddress',
      name: 'ChooseAddress',
      component: ChooseAddress
    },
    {
      path: '/AddOrEditAddress',
      name: 'AddOrEditAddress',
      component: AddOrEditAddress
    }
  ]
})
