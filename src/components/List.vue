<template>
  <div class="list">
    <div class="listheader">
      <p class="list-title">{{task}}</p>
      <p class="list-counter">total: {{ totalCardInList }}</p>
      <div class="deletelist" @click="deleteList">×</div>
    </div>
    <draggable group="cards" :list="cards" @end="$emit('change')"> <!-- @endでドラッグ＆ドロップが終わった後にchangeが呼ばれる -->
      <card v-for="(card, index) in cards"
        :key="card.id"
        :body="card.body"
        :cardIndex="index"
        :listIndex="listIndex"
      />
      <card-add :listIndex="listIndex" />
    </draggable>
  </div>
</template>

<script>
import CardAdd from './CardAdd'
import Card from './Card'
import draggable from 'vuedraggable'

export default {
  props: {
    task: {
      type: String,
      required: true
    },
    listIndex: {
      type: Number,
      required: true
    },
    cards: {
      type: Array,
      required: true
    }
  },
  components: {
    CardAdd,
    Card,
    draggable,
  },
  methods: {
    deleteList() {
      if(confirm('本当にこのリストを削除しますか？')) {
        this.$store.dispatch('deletelist', { listIndex: this.listIndex })
      }
    }
  },
  computed: {
    totalCardInList() {
      return this.cards.length
    }
  }
}
</script>
