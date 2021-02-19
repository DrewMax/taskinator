var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function(event) {

    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    console.log(taskTypeInput);

    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //create div to hold task into and add to list item 
    var taskInfoEl = document.createElement("div");
    //giver it a class name
    taskInfoEl.className = "task-info"
    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";

    listItemEl.appendChild(taskInfoEl);
    //add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
};

formEl.addEventListener("submit", createTaskHandler);


// tasksToDoEl;
// document.createElement("li");
// var taskItemEl = document.createElement("li");
// taskItemEl.textContent = "hello";

// tasksToDoEl.appendChild(taskItemEl);
// taskItemEl.className = "task-item";
 
