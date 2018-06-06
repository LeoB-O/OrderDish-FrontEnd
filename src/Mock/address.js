// import Mock from 'mockjs'

export default {
  getCurrentAddress: config => {
    let ret = {success: true, data: {address: {id: -1, name: '', phone: '', address: '请选择收货地址'}}}
    let currentAddress = JSON.parse(localStorage.getItem('currentAddress'))
    let addresses = JSON.parse(localStorage.getItem('addresses'))
    if (currentAddress) {
      ret.data.address = currentAddress
    } else if (addresses) {
      ret.data.address = addresses[0]
      localStorage.setItem('currentAddress', JSON.stringify(addresses[0]))
    }
    return ret
  },
  getAddresses: config => {
    let ret = {success: true, data: {addresses: []}}
    let addresses = JSON.parse(localStorage.getItem('addresses') || '[]')
    addresses.map(function (item, index, array) {
      array[index].avalible = true
    })
    ret.data.addresses = addresses
    return ret
  },
  addAddress: options => {
    let data = JSON.parse(options.body)
    let address = {id: new Date(), name: data.name, phone: data.phone, address: data.address}
    let addresses = JSON.parse(localStorage.getItem('addresses')) || []
    let currentAddress = JSON.parse(localStorage.getItem('currentAddress'))
    let ret = {success: true, data: {}}
    if (!currentAddress) {
      localStorage.setItem('currentAddress', JSON.stringify(address))
    }
    addresses.push(address)
    localStorage.setItem('addresses', JSON.stringify(addresses))
    return ret
  },
  setCurrentAddress: options => {
    let data = JSON.parse(options.body)
    let addresses = JSON.parse(localStorage.getItem('addresses'))
    addresses.map(function (item, index, array) {
      if (String(item.id) === String(data.id)) {
        localStorage.setItem('currentAddress', JSON.stringify(item))
      }
    })
  }
}
