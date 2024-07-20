import todoStore, { Filters } from "../../store/todo.store";

/**
 *
 * @param {String} elementId
 */
let element;
export const renderPending = (elementId) => {
  if (!element) {
    element = document.querySelector(elementId);
  }

  if (!element) throw new Error(`El Id ${elementId} no se encuentra `);

  element.innerHTML = todoStore.getTodos(Filters.Pending).length;
};
