<template>
  <div class="header">
    <img class="background" v-bind:src="shop.backgroundImg">
    <img class="avator" v-bind:src="shop.avator">
    <h2>{{shop.name}}</h2>
    <div class="split-line"></div>
  </div>
</template>

<script>
export default {
  name: 'myheader',
  props: {
    shop: Object
  }
}
</script>

<style scoped>
  .header {
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .header img.avator {
    width: auto;
    height: 30%;
    position: relative;
    top: -15%;
  }

  .header img.background {
    width: 100%;
    height: 40%;
  }

  .header h2 {
    position: relative;
    top: -10%;
  }

  .header .split-line {
    width: 100%;
    height: 1px;
    background-color: #dcdcdc;
  }
</style>
