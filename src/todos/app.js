import todoStore, { Filters } from "../store/todo.store";
import html from "./app.html?raw";
import { renderTodos, renderPending } from "./use-cases";

const ElementIds = {
  TodoList: ".todo-list",
  NewTodoInput: "#new-todo-input",
  DeleteButton: ".destroy",
  ClearCompletedButton: ".clear-completed",
  TodoFilters: ".filtro",
  PendingTodos: '#pending-count',
};

/**
 *
 * @param {String} elementId
 */
export const App = (elementId) => {
  if (!elementId) throw new Error("Se requiere el elemento HTML");

  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    //console.log(todos);
    renderTodos(ElementIds.TodoList, todos);
    updatePendingCount();
  };

  const updatePendingCount =  () =>{
    renderPending(ElementIds.PendingTodos); 

  }
  

  ///Cuando la función App se llama.
  (() => {
    const app = document.createElement("div");
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    
    displayTodos();
   
  })();
  //Referencias HTML
  const newDescriptionInput = document.querySelector(ElementIds.NewTodoInput);
  const todoListUL = document.querySelector(ElementIds.TodoList);
  const clearCompletedButton = document.querySelector(
    ElementIds.ClearCompletedButton
  );
  const filtersUL = document.querySelectorAll(ElementIds.TodoFilters);

  //Listenners
  newDescriptionInput.addEventListener("keyup", (event) => {
    if (event.keyCode !== 13) return;
    if (event.target.value.trim().length === 0) return;
    todoStore.addTodo(event.target.value);
    displayTodos();

    event.target.value = "";
  });
  todoListUL.addEventListener("click", (event) => {
    const element = event.target.closest("[data-id]");
    todoStore.toggleTodo(element.getAttribute("data-id"));
    displayTodos();
  });

  todoListUL.addEventListener("click", (event) => {
    const deleteElement = event.target.className === "destroy";
    const element = event.target.closest("[data-id]");
    if (!elementId || !deleteElement) return;
    if (deleteElement) {
      todoStore.deleteTodo(element.getAttribute("data-id"));
      displayTodos();
      todoStore.loadStore();
    }
  });
  clearCompletedButton.addEventListener("click", () => {
    todoStore.deleteCompleted();
    displayTodos();
  });

  filtersUL.forEach(element => {
    element.addEventListener('click', (element) => {
      filtersUL.forEach(el => el.classList.remove('selected'));
      element.target.classList.add('selected');
      console.log(element.target.text);
      switch (element.target.text) {
        case 'Todos':
          todoStore.setFilter(Filters.All);
          break;
          case 'Pendientes':
          todoStore.setFilter(Filters.Pending);
          break;
          case 'Completados':
          todoStore.setFilter(Filters.Completed)
          break;
      }
      displayTodos();
    })
  })
};
