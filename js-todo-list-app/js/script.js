let todos = [];

// DOM elements
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoListEl = document.getElementById("todoList");
const emptyMessage = document.getElementById("emptyMessage");
const totalCountSpan = document.getElementById("totalCount");

// Load todos 
function loadTodos() {
  const saved = localStorage.getItem("simpleTodos");
  if (saved) {
    try {
      todos = JSON.parse(saved);
    } catch (e) {
      todos = [];
    }
  } 
}

function saveTodos() {
  localStorage.setItem("simpleTodos", JSON.stringify(todos));
}

// Render all todos
function renderTodos() {
  if (todos.length === 0) {
    todoListEl.innerHTML = "";
    emptyMessage.style.display = "block";
    updateStats();
    return;
  }

  emptyMessage.style.display = "none";
  todoListEl.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className =
      "todo-item d-flex align-items-center justify-content-between";
    li.setAttribute("data-id", todo.id);

    const leftDiv = document.createElement("div");
    leftDiv.className = "d-flex align-items-center flex-grow-1";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-check form-check-input";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => toggleComplete(todo.id));

    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = todo.text;
    if (todo.completed) {
      taskText.classList.add("completed-task");
    }

    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(taskText);

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "task-actions";

    const editIcon = document.createElement("i");
    editIcon.className = "fas fa-pen-to-square";
    editIcon.title = "Edit task";
    editIcon.addEventListener("click", () => editTodo(todo.id));

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fas fa-trash-alt ms-2";
    deleteIcon.title = "Delete task";
    deleteIcon.addEventListener("click", () => deleteTodo(todo.id));

    actionsDiv.appendChild(editIcon);
    actionsDiv.appendChild(deleteIcon);

    li.appendChild(leftDiv);
    li.appendChild(actionsDiv);
    todoListEl.appendChild(li);
  });

  updateStats();
}

// Toggle task completion
function toggleComplete(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
    renderTodos();
  }
}

// Add new todo
function addTodo() {
  const text = todoInput.value.trim();

  if (text === "") {
    return;
  }

  const newTodo = {
    id: Date.now(),
    text: text,
    completed: false,
  };

  todos.push(newTodo);
  saveTodos();
  todoInput.value = "";
  todoInput.focus();
  renderTodos();
}

// Edit todo
function editTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return;

  const newText = prompt("Edit your task:", todo.text);
  if (newText !== null && newText.trim() !== "") {
    todo.text = newText.trim();
    saveTodos();
    renderTodos();
  }
}

// Delete todo
function deleteTodo(id) {
  if (confirm("Delete this task?")) {
    todos = todos.filter((t) => t.id !== id);
    saveTodos();
    renderTodos();
  }
}

// Event listeners
addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});


loadTodos();
renderTodos();
