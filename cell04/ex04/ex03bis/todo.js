$(document).ready(function() {
    // เพิ่ม todo items
    function addNewTodo(todoText) {
        const todoDiv = $('<div>').addClass('todo-item').text(todoText);

        // ย้าย todo ใหม่บนสุด
        $('#ft_list').prepend(todoDiv);

        // กดเพื่อลบ
        todoDiv.click(function() {
            if (confirm('Do you want to remove this ToDo?')) {
                $(this).remove();
                saveTodos(); // บันทึกหลังจากที่ลบเสร็จ
            }
        });
    }

    // Handle new todo creation on button click
    $('#newButton').click(function() {
        const todoText = prompt('Enter your new ToDo:');
        if (todoText && $.trim(todoText)) {
            addNewTodo(todoText);
            saveTodos(); // บันทึกตอนกด save
        }
    });

    // เก็บใน cookie
    function saveTodos() {
        const todos = [];
        $('.todo-item').each(function() {
            todos.push($(this).text());
        });
        document.cookie = `todos=${JSON.stringify(todos)}; path=/;`;
    }

    // โหลด todo จาก cookie
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

    
    loadTodos();
});
