import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function genId () {
  return Math.random()
    .toString()
    .substr(2, 10)
}

export default new Vuex.Store({
  state: {
    loading: true,
    todos: [],
    newTodo: ''
  },
  getters: {
    newTodo: state => state.newTodo,
    todos: state => state.todos
  },
  mutations: {
    SET_LOADING (state, flag) {
      state.loading = flag
    },
    SET_TODOS (state, todos) {
      state.todos = todos
    },
    SET_NEW_TODO (state, todo) {
      state.newTodo = todo
    },
    ADD_TODO (state, todoObject) {
      state.todos.push(todoObject)
    },
    UPDATE_TODO (state, todo) {
      var todos = state.todos
      todos.find(v => v.id === todo.id).done = 1
    },
    REMOVE_TODO (state, todo) {
      var todos = state.todos
      todos.splice(todos.indexOf(todo), 1)
    },
    CLEAR_NEW_TODO (state) {
      state.newTodo = ''
    }
  },
  actions: {
    getTodos ({ commit }) {
      commit('SET_LOADING', true)
      fetch('https://my-json-server.typicode.com/liankip/crud-api/todos', {
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
        .then(response => response.json())
        .then(todos => {
          commit('SET_TODOS', todos)
          commit('SET_LOADING', true)
        })
    },

    setNewTodo ({ commit }, todo) {
      commit('SET_NEW_TODO', todo)
    },

    addTodo ({ commit, state }) {
      if (!state.newTodo) {
        return
      }
      const todo = {
        id: genId(),
        todo: state.newTodo,
        done: 0
      }
      fetch('https://my-json-server.typicode.com/liankip/crud-api/todos/', {
        method: 'POST',
        body: JSON.stringify({
          todo
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then(() => {
        commit('ADD_TODO', todo)
      })
    },

    updateTodo ({
      commit
    }, todo) {
      fetch(
        `https://my-json-server.typicode.com/liankip/crud-api/todos/${todo.id}`, {
          method: 'PATCH',
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        }
      ).then(() => {
        commit('UPDATE_TODO', todo)
      })
    },

    removeTodo ({
      commit
    }, todo) {
      fetch(
        `https://my-json-server.typicode.com/liankip/crud-api/todos/${todo.id}`, {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        }
      ).then(() => {
        commit('REMOVE_TODO', todo)
      })
    },

    clearNewTodo ({
      commit
    }) {
      commit('CLEAR_NEW_TODO')
    }
  }
})
