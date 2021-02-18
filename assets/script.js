var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function() {
    var listItemEl = document.createElement("li")
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
};

buttonEl.addEventListener("click", createTaskHandler); 


// tasksToDoEl;
// document.createElement("li");
// var taskItemEl = document.createElement("li");
// taskItemEl.textContent = "hello";

// tasksToDoEl.appendChild(taskItemEl);
// taskItemEl.className = "task-item";
 
