<template>
  <div>
    <header>
      My Trello
    </header>
    <main>
      <p class="info-task">All: {{ totalCardCount }} tasks</p>
    </main>
    <div class="list-index">
      <list 
        v-for="(list, index) in lists"
        :key="list.id" 
        :task="list.task"
        :listIndex="index"
        :cards="list.cards"
        @change="movingCard"
      />
      <list-add />
    </div>
  </div>
</template>

<script>
import ListAdd from './ListAdd'
import List from './List'
import {mapState} from 'vuex'

export default {
  components: {
    ListAdd,
    List
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
    }
  }
}
</script>
