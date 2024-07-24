import { Todo } from "../todos/models/todo.model";

export const Filters = {
  All: "all",
  Completed: "Completed",
  Pending: "Pending",
};
const state = {
  todos: [
    new Todo("Piedra del almda"),
    new Todo("Piedra del infinito"),
    new Todo("Piedra de la mente"),
  ],
  filter: Filters.All,
};

const initStore = () => {
  loadStore();
};

const loadStore = () => {
  if (!localStorage.getItem("state")) return;
  const { todos = [], filter = Filters.All } = JSON.parse(
    localStorage.getItem("state")
  );
  state.todos = todos;
  state.filter = filter;
};

const SaveLocal = () => {
  localStorage.setItem("state", JSON.stringify(state));
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
      return state.todos.filter((todo) => todo.done);
    case Filters.Pending:
      return state.todos.filter((todo) => !todo.done);
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
  if (!description) throw new Error("Se requiere la descripción");

  state.todos.push(new Todo(description));
  SaveLocal();
};

/**
 *
 * @param {String} todoId
 */
const toggleTodo = (todoId) => {
  state.todos = state.todos.map((todo) => {
    if (todo.id === todoId) todo.done = !todo.done;
    return todo;
  });
  SaveLocal();
};
/**
 *
 * @param {String} todoId
 */
const deleteTodo = (todoId) => {
  state.todos = state.todos.filter((todo) => todo.id !== todoId);
  SaveLocal();
};

/**
 *
 * @param {String} todoId
 */
const deleteCompleted = (todoId) => {
  state.todos = state.todos.filter((todo) => todo.done === false);
  SaveLocal();
};

/**
 *
 * @param {String } newFilter
 */
const setFilter = (newFilter = Filters.All) => {
  state.filter = newFilter;
  SaveLocal();
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
