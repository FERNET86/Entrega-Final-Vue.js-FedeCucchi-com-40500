import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogged: false,
    userLogged: {},
    products: {},
  },
  getters: {
    isLogged: (state) => {
      return state.isLogged;
    },
    userLogged: (state) => {
      return state.userLogged;
    }, 
    userLoggedIsEmpty: (state) => {
      return Object.keys(state.userLogged).length === 0;
    },
    products: (state) => {
      return state.products;
    },
  },
  mutations: {
    incrementarCount: (state) => {
      state.count++;
    },
    addTodo: (state, todo) => {
      state.todos.push(todo)
    },
    setIsLogged: (state, value) => {
      return state.isLogged = value;
    },
    setUserLogged: (state, user) => {
      return state.userLogged = user;
    },
    setProducts: (state, products) => {
      return state.products = products;
    },
  },
  actions: {
    incrementarCountAction: (context) => {
      context.commit("incrementarCount");
    },
    addTodoAction: (context, payload) => {
      if (payload !== "") {
        context.commit("addTodo", {
          timestamp: Date.now(),
          text: payload
        })
      }
    }
  },
  modules: {},
});