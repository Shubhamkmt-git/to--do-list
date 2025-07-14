const taskInput = document.getElementById('taskInput');
const dateInput = document.getElementById('dateInput');
const timeInput = document.getElementById('timeInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => createTaskElement(task.title, task.date, task.time, task.completed));
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(item => {
        tasks.push({
            title: item.querySelector('.task-title').innerText,
            date: item.getAttribute('data-date'),
            time: item.getAttribute('data-time'),
            completed: item.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createTaskElement(title, date, time, completed = false) {
    const li = document.createElement('li');
    li.className = 'task-item';
    if (completed) li.classList.add('completed');
    li.setAttribute('data-date', date);
    li.setAttribute('data-time', time);

    const taskDetails = document.createElement('div');
    taskDetails.className = 'task-details';

    const taskTitle = document.createElement('span');
    taskTitle.className = 'task-title';
    taskTitle.innerText = title;
    taskDetails.appendChild(taskTitle);

    if (date || time) {
        const taskMeta = document.createElement('span');
        taskMeta.className = 'task-meta';
        taskMeta.innerText = `${date ? date : ''} ${time ? time : ''}`;
        taskDetails.appendChild(taskMeta);
    }

    li.appendChild(taskDetails);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerText = 'Delete';
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    // Complete toggle
    taskDetails.addEventListener('click', () => {
        li.classList.toggle('completed');
        saveTasks();
    });

    // Delete
    deleteBtn.addEventListener('click', () => {
        li.remove();
        saveTasks();
    });

    saveTasks();
}

addTaskButton.addEventListener('click', () => {
    const title = taskInput.value.trim();
    const date = dateInput.value;
    const time = timeInput.value;

    if (title !== '') {
        createTaskElement(title, date, time);
        taskInput.value = '';
        dateInput.value = '';
        timeInput.value = '';
    }
});

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTaskButton.click();
    }
});

loadTasks();
