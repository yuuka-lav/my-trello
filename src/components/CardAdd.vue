<template>
  <form :class="classList" @submit.prevent="addCard">
    <input
      class="text-input"
      type="text"
      v-model="body"
      placeholder="タスクを追加"
      @focusin="startEditing"
      @focusout="finishEditing"
    >
    <button class="add-button" type="submit" v-if=" isEditing || bodyExists">追加</button>
  </form>
</template>

<script>
  export default {
    props: {
      listIndex: {
        type: Number,
        required: true,
      }
    },
    data() {
      return {
        body: '',
        isEditing: false
      }
    },
    methods: {
      addCard() {
        this.$store.dispatch('addcard', {body: this.body, listIndex: this.listIndex})
        this.body = ''
      },
      startEditing() {
      this.isEditing = true
      },
      finishEditing() {
        this.isEditing = false
      }
    },
    computed: {
      classList() {
        const classList = ['addcard']
        if (this.isEditing) {
          classList.push('active')
        }
        if (this.bodyExists) {
          classList.push('addable')
        }
        return classList
      },
      bodyExists() {
        return this.body.length > 0
      },
    }
  }
</script>