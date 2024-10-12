// Wait for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Initialize tasks array
    let tasks = [];

    // Load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        // If no tasks are found, initialize with predefined tasks
        if (storedTasks.length === 0) {
            const defaultTasks = [
                "Schedule a dentist appointment",
                "Walk the dog",
                "Study for the exam"
            ];
            defaultTasks.forEach(taskText => addTask(taskText, false)); // Load default tasks
            tasks = defaultTasks; // Update the tasks array
            saveTasksToStorage(); // Save the default tasks to Local Storage
        } else {
            storedTasks.forEach(taskText => addTask(taskText, false)); // Load stored tasks
            tasks = storedTasks; // Update the tasks array
        }
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        // Create a new list item and set its text
        const li = document.createElement('li');
        li.textContent = taskText;

        // Add a class to the list item for styling
        li.classList.add('task-item');

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Add click event to the remove button
        removeButton.onclick = function() {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText); // Remove from Local Storage
        };

        // Append the button to the list item and the item to the list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Update tasks array and save to Local Storage
        if (save) {
            tasks.push(taskText);
            saveTasksToStorage();
        }

        // Clear the input field
        taskInput.value = "";
    }

    // Save tasks to Local Storage
    function saveTasksToStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        tasks = tasks.filter(task => task !== taskText);
        saveTasksToStorage(); // Update Local Storage
    }

    // Add event listeners
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText); // Add new task
        } else {
            alert("Please enter a task.");
        }
    });

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText !== "") {
                addTask(taskText); // Add new task
            } else {
                alert("Please enter a task.");
            }
        }
    });

    // Load tasks from Local Storage on page load
    loadTasks();
});
