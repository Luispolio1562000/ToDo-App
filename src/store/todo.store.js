import { Todo } from "../todos/models/todo.model";
const Filters = {
  All: "all",
  Completed: "Completed",
  Pending: "Pending",
};
const state = {
  todos: [new Todo("Piedra del almda"), new Todo("Piedra del infinito"), new Todo("Piedra de la mente")],
  filter: Filters.All,
};

const initStore = () => {
  console.log(state);
  console.log("Init store");
};

const loadStore = () => {
  throw new Error("No implementado");
};

/**
 * 
 * @param {String} filter 
 * @returns Un filtro de los Todos.
 */
const getTodos = (filter = Filters.All) => {
  switch (filter) {
    case Filters.All:
      return [...state.todos];
    case Filters.Completed:
      return state.filter((todo) => todo.done === true);
    case Filters.Pending:
      return state.filter((todo) => todo.done === false);
    default:
      throw new Error(`Option ${filter} no válido`);
      break;
  }
};

/**
 * 
 * @param {String} description 
 */
const addTodo = (description) => {
if(!description) throw new Error('Se requiere la descripción');

state.todos.push(new todo(description));

};

/**
 * 
 * @param {String} todoId 
 */
const toggleTodo = (todoId) => {
state.todos = state.todos.map(todo => {
  if(todo.id === todoId) todo.done = !todo.done;
  return todo;
})

};
/**
 * 
 * @param {String} todoId 
 */
const deleteTodo = (todoId) => {
state.todos = state.todos.filter(todo => todo.id !== todoId)

};

/**
 * 
 * @param {String} todoId 
 */
const deleteCompleted = (todoId) => {
  state.todos = state.todos.filter(todo => todo.done === true)
};

/**
 * 
 * @param {String } newFilter 
 */
const setFilter = (newFilter = Filters.All) => {
  state.filter =  newFilter;
};

const getCurrentFilter = () => {
  return state.filter;
};

export default {
  initStore,
  loadStore,
  addTodo,
  toggleTodo,
  deleteCompleted,
  deleteTodo,
  setFilter,
  getCurrentFilter,
  getTodos,
};
