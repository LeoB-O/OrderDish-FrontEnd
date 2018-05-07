<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  * {
    height: auto;
    width: auto;
    padding: 0px;
    margin: 0px;
    border: 0px;
    font-family:"Microsoft YaHei",微软雅黑,"MicrosoftJhengHei",华文细黑,STHeiti,MingLiu
  }

  html {
    height: 100%;
  }

  body {
    height: 100%;
  }

  #app {
    height: 100%;
  }
</style>
