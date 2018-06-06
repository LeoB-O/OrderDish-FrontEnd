import Mock from 'mockjs'
import dishes from './dishes'
import order from './order'
import address from './address'

Mock.mock(/\/api\/dishes/, 'get', dishes.getDishList({cataNum: 20, itemNum: 6}))
Mock.mock(/\/api\/order\/add2cart/, 'post', order.add2cart)
Mock.mock(/\/api\/order\/cart/, 'get', order.cart)
Mock.mock(/\/api\/order\/address/, 'get', address.getCurrentAddress)
Mock.mock(/\/api\/order\/address/, 'post', address.setCurrentAddress)
Mock.mock(/\/api\/addresses/, 'get', address.getAddresses)
Mock.mock(/\/api\/address/, 'put', address.addAddress)

export default Mock
