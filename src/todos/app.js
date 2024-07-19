import todoStore from "../store/todo.store";
import html from "./app.html?raw";
import { renderTodos } from "./use-cases";

const elementIds = {
  TodoList: ".todo-list",
  NewTodoInput: "#new-todo-input",
};

/**
 *
 * @param {String} elementId
 */
export const App = (elementId) => {
  if (!elementId) throw new Error("Se requiere el elemento HTML");

  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    renderTodos(elementIds.TodoList, todos);
    console.log(todos);
  };

  ///Cuando la función App se llama.
  (() => {
    const app = document.createElement("div");
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
  })();
};


//Referencias HTML

