<template>
  <div class="card">
    <div class="deletelist" @click="deleteCardFromList">×</div>
    <div class="body">
      {{ body }}
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      body: {
        type: String,
        required: true
      },
      listIndex: {
        type: Number,
        required: true
      },
      cardIndex: {
        type: Number,
        required: true
      }
    },
    methods: {
      deleteCardFromList() {
        if (confirm('このカードを削除しますか？')) {
          this.$store.dispatch('deleteCard', { listIndex: this.listIndex, cardIndex: this.cardIndex})
        }
      }
    }
  }
</script>