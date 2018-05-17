<template>
  <div class="choose-address">
    <div class="avalible-address">
      <div class="avalible-address__title">
        选择地址
      </div>
      <div class="avalible-address__list">
        <div class="avalible-address__item" v-for="address in addresses" v-if="address.avalible" :key="address.address">
          <div class="avalible-item__detail">
            <div class="avalible-item__name-phone">
              <span class="avalible-item__name">{{address.name}}</span>
              <span class="avalible-item__phone">{{address.phone}}</span>
            </div>
            <div class="avalible-item__address">
              {{address.address}}
            </div>
          </div>
          <div class="avalible-item__modify">
            <div class="glyphicon glyphicon-pencil" aria-hidden="true"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="unavalible-address">
      <div class="unavalible-address__title">
        以下地址超出范围
      </div>
      <div class="unavalible-address__list">
        <div class="unavalible-address__item" v-for="address in addresses" v-if="!address.avalible" :key="address.address">
          <div class="unavalible-item__detail">
            <div class="unavalible-item__name-phone">
              <span class="unavalible-item__name">{{address.name}}</span>
              <span class="unavalible-item__phone">{{address.phone}}</span>
            </div>
            <div class="unavalible-item__address">
              {{address.address}}
            </div>
          </div>
          <div class="unavalible-item__modify">
            <div class="glyphicon glyphicon-pencil" aria-hidden="true"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="space"></div>
    <div class="footer">
      <div class="add-address">
        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
        <span>添加收货地址</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChooseAddress',
  data () {
    return {
      addresses: [{
        address: '京口区学府路301号江苏大学',
        name: 'LeoB_O',
        phone: '13566664444',
        avalible: true
      }, {
        address: '京口区学府路301号计算机学院',
        name: 'LeoB_O',
        phone: '1366664444',
        avalible: false
      }]
    }
  }
}
</script>

<style scoped>
  .choose-address {
    width: 100%;
    height: 100%;
  }

  .avalible-address {
    width: 100%;
  }

  .avalible-address__title {
    width: 100%;
    background-color: lightskyblue;
    color: white;
    font-size: 20px;
    padding: 5px;
  }

  .avalible-address__list {
  }

  .avalible-address__item {
    display: flex;
    justify-content: space-between;
    padding: 2% 5% 2% 10%;
  }

  .avalible-item__detail {
    display: flex;
    flex-direction: column;
  }

  .avalible-item__name-phone {
    margin-bottom: 5px;
  }

  .avalible-item__name {
    color: #000;
    font-size: 20px;
  }

  .avalible-item__phone {
    color: darkgrey;
    font-size: 20px;
  }

  .avalible-item__address {
    color: darkgrey;
    font-size: 15px;
  }

  .avalible-item__modify {
    display: flex;
    align-items: center;
  }
  /*************************
  ----------divide----------
  **************************/
  .unavalible-address {
    width: 100%;
    background-color: #efefef;
  }

  .unavalible-address__title {
    width: 100%;
    background-color: #eaeaea;
    color: grey;
    font-size: 20px;
    padding: 2px;
  }

  .unavalible-address__list {
    margin-bottom: 5px;
  }

  .unavalible-address__item {
    display: flex;
    justify-content: space-between;
    padding: 2% 5% 2% 10%;
  }

  .unavalible-item__detail {
    display: flex;
    flex-direction: column;
  }

  .unavalible-item__name-phone {
  }

  .unavalible-item__name {
    color: grey;
    font-size: 15px;
  }

  .unavalible-item__phone {
    color: grey;
    font-size: 15px;
  }

  .unavalible-item__address {
    color: grey;
    font-size: 15px;
  }

  .unavalible-item__modify {
    display: flex;
    align-items: center;
  }

  .space {
    height: 10%;
    width: 100%;
  }

  .footer {
    height: 10%;
    width: 100%;
    position: fixed;
    bottom: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: -5px -5px 200px skyblue;
  }

  .add-address {
    display: flex;
    justify-content: center;
    align-items: center;
    color: skyblue;
  }
</style>
