import { Todo } from "../models/todo.model";
import { createTodoHTML } from "./create-todo-html";
let element;

/**
 * 
 * @param {String} elementId 
 * @param {Todo} todos 
 */
export const renderTodos = (elementId,  todos = []) => 
    {
        if (!element) {
            element = document.querySelector(elementId);
            
        }
        
        if (!element) throw new Error(`El Id ${elementId} no se encuentra `)
        element.innerHTML= '';
            todos.forEach(todo => 
            {
            element.append(createTodoHTML(todo))
        });
}