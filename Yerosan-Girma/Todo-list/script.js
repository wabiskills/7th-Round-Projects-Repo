const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const errorMessage = document.getElementById("error-message");
const taskSummary = document.getElementById("task-summary");

const STORAGE_KEY = "todo-list-items";
const SAMPLE_TASKS = [
  { id: "sample-1", text: "Finish HTML structure", completed: true },
  { id: "sample-2", text: "Style app with CSS", completed: false },
  { id: "sample-3", text: "Add task interactions in JavaScript", completed: false },
];

let tasks = loadTasks();
renderTasks();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask(taskInput.value);
});

function addTask(rawText) {
  const text = rawText.trim();

  if (!text) {
    errorMessage.textContent = "Task cannot be empty.";
    return;
  }

  errorMessage.textContent = "";

  const task = {
    id: crypto.randomUUID(),
    text,
    completed: false,
  };

  tasks.push(task);
  saveTasks();
  renderTasks();
  taskInput.value = "";
  taskInput.focus();
}

function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = `task-item ${task.completed ? "completed" : ""}`;

    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task.text;
    text.setAttribute("role", "button");
    text.setAttribute("tabindex", "0");
    text.title = "Click to mark complete";

    text.addEventListener("click", () => toggleTask(task.id));
    text.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleTask(task.id);
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    item.append(text, deleteBtn);
    taskList.appendChild(item);
  });

  const completedCount = tasks.filter((task) => task.completed).length;
  taskSummary.textContent = `${completedCount} completed out of ${tasks.length} task${tasks.length === 1 ? "" : "s"}.`;
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [...SAMPLE_TASKS];

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];

    const validTasks = parsed.filter(
      (task) =>
        task &&
        typeof task.id === "string" &&
        typeof task.text === "string" &&
        typeof task.completed === "boolean"
    );
    return validTasks.length ? validTasks : [...SAMPLE_TASKS];
  } catch (_error) {
    return [...SAMPLE_TASKS];
  }
}
