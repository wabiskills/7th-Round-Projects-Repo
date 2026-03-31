let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

renderTasks();

document.querySelector('.js-btn-add').addEventListener('click', () => {
    addTask();
});

function saveToStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const inputEle = document.querySelector('.js-task-input');
    const inputTask = inputEle.value.trim();

    if(inputTask === '') {
        document.querySelector('.js-input').innerHTML += 
        `
            <p class="error-message js-error-message">
                please enter a task first
            </p>
        `
        setTimeout(() => {
            document.querySelector('.js-error-message').remove();
        }, 2000);
    } else{
        tasks.push({
            id: Date.now(),
            description: inputTask,
            completed: false
        });
    }

    renderTasks();
    inputEle.value = '';
    saveToStorage();
}

function renderTasks() {
    let html = '';

    tasks.forEach((task) => {
        html += 
        `
            <div class="task-container ${task.completed ? 'completed-blur' : ''}">
                <div class="task">
                    <button class="btn-complete js-btn-complete" 
                    data-task-id="${task.id}">
                        ${task.completed 
                            ? '<img src="images/icons8-checkmark-48.png" alt="checkmark icon" width="20" height="20">' 
                            : ''}
                    </button>
                    <p class="task-description ${task.completed ? 'mark-completed' : ''}">
                        ${task.description}
                    </p>
                </div>
                <button class="btn-delete js-btn-delete"
                data-task-id="${task.id}">
                    <img src="images/icons8-delete-24.png" alt="delete icon">
                </button>
            </div>
        `
    });

    document.querySelector('.task-list').innerHTML = html;
    renderRemaining();

    document.querySelectorAll('.js-btn-complete').forEach((btnComplete) => {
        btnComplete.addEventListener('click', () => {
            const {taskId} = btnComplete.dataset;
            
            tasks.forEach((task) => {
                if(task.id === Number(taskId)) {
                    task.completed = !task.completed;
                }
            });
            
            renderTasks();
            saveToStorage();
        });
    });

    document.querySelectorAll('.js-btn-delete').forEach((btnDelete) => {
        btnDelete.addEventListener('click', () => {
            const {taskId} = btnDelete.dataset;
            let deleteIndex;

            tasks.forEach((task, index) => {
                if(task.id === Number(taskId)) {
                    deleteIndex = index;
                }
            });

            tasks.splice(deleteIndex, 1);
            saveToStorage();
            renderTasks();
        });
    });
}

function renderRemaining() {
    let remaining = 0;

    tasks.forEach((task) => {
        if(!task.completed) {
            remaining++;
        }
    });

    document.querySelector('.js-remaining').innerHTML = remaining;
}