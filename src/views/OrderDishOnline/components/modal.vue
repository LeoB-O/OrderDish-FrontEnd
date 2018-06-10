<template>
  <div class="modal" @click.self="$emit('handle-show-modal')" v-bind:style="{display: showModal}">
    <div class="modal-dialog">
      <div class="modal-header">
        选项
      </div>
      <div class="modal-body">
        <div v-for="option in options" v-bind:key="option.name">
          <div class="option-name">{{option.name}}</div>
          <div class="options">
            <div @click="$emit('select-options', {option, item})" class="option" v-for="item in option.options"
                 v-bind:key="item.name" :id="item" :class="{optionActive: item.active}">
              {{item.name}}
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer" @click="$emit('add-to-cart-with-option')">
        确认
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: {
    options: Array,
    showModal: String
  }
}
</script>

<style scoped>
  .modal {
    background-color: rgba(0, 0, 0, 0.2);
  }

  .modal .modal-dialog {
    background-color: white;
    top: 30%;
  }

  .modal .modal-dialog .option-name {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .modal .modal-dialog .options {
    display: flex;
    justify-content: space-around;
  }

  .modal .modal-dialog .option {
    border: 1px;
    border-style: solid;
    border-color: deepskyblue;
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    border-radius: 15px;
    margin: 5px;
    padding: 5px;
  }

  .modal .modal-dialog .optionActive {
    background-color: deepskyblue;
    color: white;
    font-weight: bold;
  }
</style>
