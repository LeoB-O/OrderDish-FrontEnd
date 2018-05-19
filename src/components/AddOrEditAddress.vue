<template>
    <div class="add-edit-address">
      <div class="title">{{type}}</div>
      <div class="input-addr">
        <div class="input-group">
          <span class="input-group-addon">姓名</span>
          <input type="text" class="form-control" v-model="name">
        </div>
        <div class="input-group">
          <span class="input-group-addon">电话</span>
          <input type="text" class="form-control" v-model="phone">
        </div>
        <div class="input-group">
          <span class="input-group-addon">地址</span>
          <input type="text" class="form-control" v-model="address">
        </div>
      </div>
      <div class="confirm">
        <button type="button" class="btn btn-info" @click="submit">提交</button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'AddOrEditAddress',
  data () {
    return {
      id: 0,
      name: '',
      phone: '',
      address: '',
      type: ''
    }
  },
  mounted: function () {
    this.id = this.$route.query.id ? this.$route.query.id : 0
    this.type = this.$route.query.type ? this.$route.query.type : '新增地址'
    this.name = this.$route.query.name ? this.$route.query.name : ''
    this.phone = this.$route.query.phone ? this.$route.query.phone : ''
    this.address = this.$route.query.address ? this.$route.query.address : ''
  },
  methods: {
    submit: function () {
      let addr = {
        id: this.id,
        name: this.name,
        phone: this.phone,
        address: this.address
      }
      this.$router.push({path: '/ChooseAddress', query: addr})
    }
  }
}
</script>

<style scoped>
  .add-edit-address {
    width: 100%;
    height: 100%;
  }

  .title {
    background-color: lightskyblue;
    color: white;
    font-size: 20px;
    padding: 10px;
  }

  .input-addr {
    width: 100%;
  }

  .input-group {
    width: 80%;
    margin: 5% 10% 5% 10%;
  }

  span {
    width: 20%;
  }

  .confirm {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  button {
    width: 80%;
  }
</style>
