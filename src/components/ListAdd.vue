<template>
  <form :class="classList" @submit.prevent="addList">
    <input 
      class="text-input"
      type="text"
      v-model="task"
      placeholder="リストを追加"
      @focusin="startEditing"
      @focusout="finishEditing"
    >
    <button class="add-button" type="submit" v-if="isEditing || taskExists">追加</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      task: '',
      isEditing: false
    }
  },
  computed: {
    classList() {
      const classList = ['addlist']
      if(this.isEditing) {
        classList.push('active')
      }
      if(this.taskExists) {
        classList.push('addable')
      }
      return classList
    },
    taskExists() {
      return this.task.length > 0
    },
  },
  methods: {
    addList() {
      this.$store.dispatch('addlist', { task: this.task })
      this.task = ''
    },
    startEditing() {
      this.isEditing = true
    },
    finishEditing() {
      this.isEditing = false
    }
  },
}
</script>
