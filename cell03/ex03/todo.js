// Select the 'New' button and 'ft_list' container
const newButton = document.getElementById('newButton');
const ftList = document.getElementById('ft_list');

// Function to add new ToDo item
function addNewTodo(todoText) {
    const todoDiv = document.createElement('div');
    todoDiv.className = 'todo-item';
    todoDiv.textContent = todoText;

    // Append the new todo at the top
    ftList.prepend(todoDiv);

    // Add event listener for removing the todo
    todoDiv.addEventListener('click', function() {
        if (confirm('Do you want to remove this ToDo?')) {
            todoDiv.remove();
            saveTodos();  // Save after removing
        }
    });
}

// Function to handle new todo creation
newButton.addEventListener('click', function() {
    const todoText = prompt('Enter your new ToDo:');
    if (todoText && todoText.trim()) {
        addNewTodo(todoText);
        saveTodos();  // Save after adding
    }
});

// Function to save ToDos as cookies
function saveTodos() {
    const todos = [];
    document.querySelectorAll('.todo-item').forEach(todo => {
        todos.push(todo.textContent);
    });
    document.cookie = `todos=${JSON.stringify(todos)}; path=/;`;
}

// Function to load ToDos from cookies
function loadTodos() {
    const cookies = document.cookie.split(';');
    let todos = [];
    cookies.forEach(cookie => {
        const [name, value] = cookie.split('=');
        if (name.trim() === 'todos') {
            todos = JSON.parse(decodeURIComponent(value));
        }
    });
    todos.forEach(todo => addNewTodo(todo));
}

// Load saved ToDos on page load
window.onload = function() {
    loadTodos();
};
