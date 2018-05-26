import Mock from 'mockjs'
import dishes from './dishes'

Mock.mock(/\/api\/dishes/, 'get', dishes.getDishList({cataNum: 20, itemNum: 6}))

export default Mock
