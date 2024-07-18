import html from './app.html?raw';
/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {
    if (!elementId) throw new Error('Se requiere el elemento HTML')

///Cuando la función App se llama.
(()=> {
const app = document.createElement('div');
app.innerHTML = html;
document.querySelector(elementId).append(app);
})();
}