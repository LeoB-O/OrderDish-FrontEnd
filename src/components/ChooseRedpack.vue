<template>
  <div class="choose-redpack">
    <div class="not-use">
      <span style="font-size: 20px;">不使用红包</span>
      <span class="glyphicon glyphicon-ok-circle" style="font-size: 25px;"></span>
    </div>
    <div class="redpack-list">
      <div class="redpack" :class="{notactive: !canUse(redpack)}" v-for="redpack in redpacks" :key="redpack.id">
        <span class="redpack__amount" :class="{notactive: !canUse(redpack)}">￥{{redpack.minusAmount}}</span>
        <span class="redpack__type">{{discountType(redpack.type)}}</span>
        <span class="redpack__require" v-if="!canUse(redpack)">需满{{redpack.requireAmount}}元</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChooseRedpack',
  data () {
    return {
      total: 78.8,
      redpacks: [{
        id: 0,
        type: 1,
        requireAmount: 0,
        minusAmount: 20
      }, {
        id: 1,
        type: 0,
        requireAmount: 1000,
        minusAmount: 5
      }]
    }
  },
  methods: {
    discountType: function (type) {
      let discountTypes = {
        0: '满减优惠',
        1: '新用户红包'
      }
      return discountTypes[type]
    },
    canUse: function (redpack) {
      if (this.total > redpack.requireAmount) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
  .choose-redpack {
    width: 100%;
    height: 100%;
  }

  .not-use {
    width: 100%;
    color: grey;
    box-shadow: 1px 1px 2px lightgrey;
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }

  .redpack-list {
    margin-top: 40px;
    width: 100%;
  }

  .redpack {
    padding: 20px;
    width: 100%;
    box-shadow: 1px 1px 5px grey;
    margin: 20px 0px;
  }

  .redpack__amount {
    width: 30%;
    color: red;
    font-size: 25px;
    display: inline-block;
  }

  .redpack__type {
    width: 30%;
    display: inline-block;
    font-size: 20px;
  }

  .redpack__require {
    width: 30%;
    display: inline-block;
  }

  .notactive {
    color: lightgrey;
  }
</style>
