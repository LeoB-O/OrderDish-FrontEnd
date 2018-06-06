import Mock from 'mockjs'

export default {
  getDishList: config => {
    let dishList = localStorage.getItem('getDishList')
    if (dishList) {
      return JSON.parse(dishList)
    } else {
      let content = []
      let ret = {success: true, data: {content: []}}
      let count = 0
      for (let i = 0; i < config.cataNum; i++) {
        let items = []
        for (let i = 0; i < config.itemNum; i++) {
          let options = []
          let option1 = {
            name: 'option-name-1',
            options: [{name: 'option1', active: false}, {name: 'option2', active: false}, {name: 'option3', active: false}]
          }
          let option2 = {
            name: 'option-name-2',
            options: [{name: 'option1', active: false}, {name: 'option2', active: false}, {name: 'option3', active: false}]
          }
          options.push(option1)
          options.push(option2)
          items.push(Mock.mock({
            id: count,
            name: '@cword(2,8)',
            img: require('../assets/shop.png'),
            sale: 33,
            rate: '99%',
            describe: '',
            originPrice: 18.8,
            salePrice: 16.66,
            options: options
          }))
          count++
        }
        content.push({cataName: Mock.mock('@cword(2,4)'), items: items, active: false})
      }
      ret.data.content = content
      localStorage.setItem('getDishList', JSON.stringify(ret))
      return ret
    }
  }
}
