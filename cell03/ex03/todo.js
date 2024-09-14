// add button
const newButton = document.getElementById('newButton');
const ftList = document.getElementById('ft_list');

// add todo items
function addNewTodo(todoText) {
    const todoDiv = document.createElement('div');
    todoDiv.className = 'todo-item';
    todoDiv.textContent = todoText;

    // new todo on top
    ftList.prepend(todoDiv);

    // event listener for delete
    todoDiv.addEventListener('click', function() {
        if (confirm('Do you want to remove this ToDo?')) {
            todoDiv.remove();
            saveTodos();  // Save after removing
        }
    });
}

// new todo creation
newButton.addEventListener('click', function() {
    const todoText = prompt('Enter your new ToDo:');
    if (todoText && todoText.trim()) {
        addNewTodo(todoText);
        saveTodos();  // Save after adding
    }
});

// save todo to cookie
function saveTodos() {
    const todos = [];
    document.querySelectorAll('.todo-item').forEach(todo => {
        todos.push(todo.textContent);
    });
    document.cookie = `todos=${JSON.stringify(todos)}; path=/;`;
}

// load todo for cookie
function loadTodos() {
    const cookies = document.cookie.split(';');
    let todos = [];
    cookies.forEach(cookie => {
        const [name, value] = cookie.split('=');
        if (name.trim() === 'todos') {
            todos = JSON.parse(decodeURIComponent(value));
        }
    });

    // reverse list to newest first
    todos.reverse().forEach(todo => addNewTodo(todo));
}

// load todo when open 
window.onload = function() {
    loadTodos();
};
