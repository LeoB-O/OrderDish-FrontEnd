<template>
  <div class="catagory">
    <ul>
      <li v-for="cata in content" v-bind:class="{catagoryActive: cata.active}" v-bind:key="cata.cataName"
          v-on:click="active(cata)">
        <!--<img src="">-->
        <div>
          {{cata.cataName}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'catagory',
  props: {
    content: Array
  },
  methods: {
    active: function (cata) {
      this.$emit('active', cata.cataName)
      this.content.map((item, index, array) => {
        if (item.cataName === cata.cataName) {
          array[index].active = true
        } else {
          array[index].active = false
        }
      })
    }
  }
}
</script>

<style scoped>
  .catagory {
    width: 20%;
    height: 100%;
    float: left;
    position: relative;
    left: 0px;
  }

  .catagory ul {
    height: 100%;
    list-style-type: none;
    overflow: auto;
  }

  .catagory li {
    height: auto;
    padding: 10px 0px;
    display: flex;
    justify-content: center;
    background-color: #efefef;
  }

  .catagory li.catagoryActive {
    height: auto;
    padding: 10px 0px;
    display: flex;
    justify-content: center;
    background-color: #ffffff;
  }
</style>
