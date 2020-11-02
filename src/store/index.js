import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const saveLists = localStorage.getItem('trello-list')


const store = new Vuex.Store({
  state: {
    // saveListsがあったら取得、なかったらdetaultを表示
    lists: saveLists ? JSON.parse(saveLists) : [
      {
        task: 'Backlog',
        cards: [
          { body: 'English' },
          { body: 'Mathematics' },
        ]
      },
      {
        task: 'Todo',
        cards: [
          { body: 'Science' }
        ]
      },
      {
        task: 'Doing',
        cards: []
      }
    ],
  },
  mutations: {
    addlist(state, payload) {
      state.lists.push({ task: payload.task, cards: [] }) // 2
    },
    deletelist(state, payload) {
      state.lists.splice(payload.listIndex, 1) // 1は一つ取り除く指定
    },
    addcard(state, payload) {
      state.lists[payload.listIndex].cards.push({ body: payload.body })
    },
    deleteCard(state, payload) {
      state.lists[payload.listIndex].cards.splice(payload.cardIndex, 1)
    },
    movingCard(state, payload) {
      state.lists = payload.lists
    },
  },
  actions: {
    addlist(context, payload) {  // payloadは引数で指定された値を表している
      context.commit('addlist', payload) // 1
    },
    deletelist(context, payload) {
      context.commit('deletelist', payload)
    },
    addcard(context, payload) {
      context.commit('addcard', payload)
    },
    deleteCard(context, payload) {
      context.commit('deleteCard', payload)
    },
    movingCard(context, payload) {
      context.commit('movingCard', payload)
    },
  },
  getters: {
    totalCardCount(state) {
      let count = 0
      state.lists.map(content => count += content.cards.length)
      return count
    }
  }
})

store.subscribe((mutation, state) => {
  localStorage.setItem('trello-list', JSON.stringify(state.lists))
})

export default store;
