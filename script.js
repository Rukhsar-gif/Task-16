"use strict";

const todoForm = document.getElementById("todoForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const message = document.getElementById("message");

let tasks = [];

function renderTasks() {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        taskList.innerHTML = `
            <li class="empty-state">
                No tasks added yet.
            </li>
        `;

        taskCount.textContent = "0 tasks";

        return;
    }

    tasks.forEach(function (task, index) {
        const listItem = document.createElement("li");

        listItem.className = "task-item";

        listItem.innerHTML = `
            <span class="task-text"></span>
            <button
                type="button"
                class="delete-button"
                data-index="${index}"
            >
                Delete
            </button>
        `;

        listItem.querySelector(".task-text").textContent = task;

        taskList.appendChild(listItem);
    });

    taskCount.textContent =
        `${tasks.length} ${tasks.length === 1 ? "task" : "tasks"}`;
}

function addTask(task) {
    const trimmedTask = task.trim();

    if (trimmedTask === "") {
        message.textContent = "Please enter a task.";
        return;
    }

    tasks.push(trimmedTask);

    message.textContent = "";

    renderTasks();

    taskInput.value = "";

    taskInput.focus();
}

todoForm.addEventListener("submit", function (event) {
    event.preventDefault();

    addTask(taskInput.value);
});

taskList.addEventListener("click", function (event) {
    const deleteButton =
        event.target.closest(".delete-button");

    if (!deleteButton) {
        return;
    }

    const taskIndex =
        Number(deleteButton.dataset.index);

    tasks.splice(taskIndex, 1);

    renderTasks();
});

renderTasks();