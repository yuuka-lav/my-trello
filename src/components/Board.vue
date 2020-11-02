<template>
  <div>
    <header>
      My Trello
    </header>
    <main>
      <p class="info-task">All: {{ totalCardCount }} tasks</p>
    </main>
    <draggable class="list-index" :list="lists" @end="movingList"> <!-- :listでdataを更新 -->
      <list 
        v-for="(list, index) in lists"
        :key="list.id" 
        :task="list.task"
        :listIndex="index"
        :cards="list.cards"
        @change="movingCard"
      />
      <list-add />
    </draggable>
  </div>
</template>

<script>
import ListAdd from './ListAdd'
import List from './List'
import {mapState} from 'vuex'
import draggable from 'vuedraggable'

export default {
  components: {
    ListAdd,
    List,
    draggable,
  },
  computed: {
    ...mapState([
      'lists'
    ]),
    totalCardCount() {
      return this.$store.getters.totalCardCount
    }
  },
  methods: {
    movingCard() {
      this.$store.dispatch('movingCard', {lists: this.lists})
    },
    movingList() {
      this.$store.dispatch('movingCard', {lists: this.lists})
    }
  }
}
</script>
