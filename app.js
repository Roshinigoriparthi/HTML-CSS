
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const clearBtn = document.getElementById('clear-tasks');
document.addEventListener('DOMContentLoaded', loadTasks);
todoForm.addEventListener('submit', addTask);
todoList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTasks);
function addTask(e) {
    e.preventDefault();
    const task = todoInput.value;
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(task));
    const removeBtn = document.createElement('button');
    removeBtn.appendChild(document.createTextNode('X'));
    li.appendChild(removeBtn);
    todoList.appendChild(li);
    storeTaskInLocalStorage(task);
    todoInput.value = '';
}
function removeTask(e) {
    if (e.target.tagName === 'BUTTON') {
        if (confirm('Are you sure you want to delete this task?')) {
            const li = e.target.parentElement;
            li.remove();
            removeTaskFromLocalStorage(li.firstChild.textContent);
        }
    }
}
function clearTasks() {
    todoList.innerHTML = '';
    clearTasksFromLocalStorage();
}
function loadTasks() {
    const tasks = getTasksFromLocalStorage();
        tasks.forEach(function(task) {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(task));
        const removeBtn = document.createElement('button');
        removeBtn.appendChild(document.createTextNode('X'));
        li.appendChild(removeBtn);

        todoList.appendChild(li);
    });
}
function storeTaskInLocalStorage(task) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function getTasksFromLocalStorage() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}
function removeTaskFromLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();

    tasks.forEach(function(storedTask, index) {
        if (storedTask === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function clearTasksFromLocalStorage() {
    localStorage.removeItem('tasks');
}
