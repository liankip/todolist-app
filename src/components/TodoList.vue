<template>
  <div>
    <!-- .Header -->
    <Header></Header>

    <!-- .Section -->
    <section class="section has-background-light">
      <div class="container">
        <!-- .Input Todo -->
        <div class="field">
          <div class="control">
            <input
              class="input is-primary"
              type="text"
              placeholder="Apa yang sudah atau belum dikerjakan hari ini?"
              :value="newTodo"
              @change="setNewTodo"
              @keyup.enter="addTodo"
            />
          </div>
        </div>
        <!-- ./Input Todo -->

        <!-- .List Todo -->
        <div v-if="!todos.length" class="columns is-multiline">
          <div class="column is-full">
            <article class="media notification is-danger">
              <figure class="media-left"></figure>
              <div class="media-content">
                <div class="content">
                  <h1 class="title is-size-5">Liburan Dulu <i class="far fa-grin-beam"></i></h1>
                </div>
              </div>
            </article>
          </div>
        </div>
        <div class="columns is-multiline">
          <div
            v-for="(todo, index) in todos"
            v-bind:todo="todo"
            v-bind:index="index"
            v-bind:key="todo.id"
            :class="{ completed: todo.completed }"
            class="column is-one-third"
          >
            <article
              v-bind:class="{
                'media notification is-white': todo.done == 1,
                'media notification is-danger': todo.done == 0
              }"
            >
              <figure class="media-left"></figure>
              <div class="media-content">
                <div class="content">
                  <h1 class="title is-size-5">{{ todo.todo }}</h1>
                  <p class="is-size-6" v-if="todo.done == 1">
                    Sudah Dikerjakan
                  </p>
                  <p class="is-size-6" v-else>
                    <input
                      @change="updateTodo(todo)"
                      type="checkbox"
                      :checked="todo.done == 1"
                    />
                    Belum Dikerjakan
                  </p>
                </div>
              </div>
              <figure class="media-right">
                <div class="buttons">
                  <button
                    v-bind:class="{
                      'button is-danger': todo.done == 1,
                      'button is-white': todo.done == 0
                    }"
                    @click="removeTodo(todo)"
                  >
                    <span
                      v-bind:class="{
                        'icon has-text-white': todo.done == 1,
                        'icon has-text-danger': todo.done == 0
                      }"
                    >
                      <i class="fa fa-times "></i>
                    </span>
                  </button>
                </div>
              </figure>
            </article>
          </div>
        </div>
        <!-- ./List Todo -->
      </div>
    </section>
    <!-- ./Section -->

    <!-- .Footer -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './Header'
import Footer from './Footer'

export default {
  components: {
    Header,
    Footer
  },

  created () {
    /* Get Todos */
    this.$store.dispatch('getTodos')
  },

  computed: {
    /* New Todos */
    newTodo () {
      return this.$store.getters.newTodo
    },

    /* Passing Todos */
    todos () {
      return this.$store.getters.todos.slice().reverse()
    }
  },

  methods: {
    /* Save Todos */
    setNewTodo (e) {
      this.$store.dispatch('setNewTodo', e.target.value)
    },

    addTodo (e) {
      e.target.value = ''
      this.$store.dispatch('addTodo')
      this.$store.dispatch('clearNewTodo')
    },

    /* Update Todos */
    updateTodo (todo) {
      this.$store.dispatch('updateTodo', todo)
    },

    /* Delete Todos */
    removeTodo (todo) {
      this.$store.dispatch('removeTodo', todo)
    }
  }
}
</script>
