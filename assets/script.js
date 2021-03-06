var pageContentEl = document.querySelector("#page-content");
var taskIdCounter = 0;
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

var tasks = [];

var taskFormHandler = function(event) {

    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    console.log(taskTypeInput);

    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    };
    formEl.reset();

    var isEdit = formEl.hasAttribute("data-task-id");
        if (isEdit) {
            var taskId = formEl.getAttribute("data-task-id");
            completeEditTask(taskNameInput, taskTypeInput, taskId);
        }
    //package up data as an object
    else {
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput,
        status: "to-do"
    };

    //send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
}
};

var completeEditTask = function(taskName, taskType, taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    // this code is already in place
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    //loop through tasks array and task object with new content
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            task[i].type = taskType;
        }
    };

    saveTasks();

// set new values
taskSelected.querySelector("h3.task-name").textContent = taskName;
taskSelected.querySelector("span.task-type").textContent = taskType;

alert("Task Updated!");

formEl.removeAttribute("data-task-id");
document.querySelector("#save-task").textContent = "Add Task";
}

var createTaskEl = function(taskDataObj) {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    listItemEl.setAttribute('data-task-id', taskIdCounter);
    listItemEl.setAttribute("draggable", "true");

    //create div to hold task into and add to list item 
    var taskInfoEl = document.createElement("div");
    //giver it a class name
    taskInfoEl.className = "task-info"
    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    // console.log(taskActionsEl);
    //add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
    taskDataObj.id = taskIdCounter;

    tasks.push(taskDataObj);

    saveTasks();

    taskIdCounter++;

    console.log(taskDataObj);
    console.log(taskDataObj.status)
}
var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    //create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To Do", "In Progress", "Completed"];
    
    for (var i = 0; i < statusChoices.length; i++) {
        //create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        // append to select
        statusSelectEl.appendChild(statusOptionEl)
    }

    return actionContainerEl;
}

formEl.addEventListener("submit", taskFormHandler);

var taskButtonHandler = function(event) {
    var targetEl = event.target;

    //edit button was clicked
    if(targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }

    if(event.target.matches(".delete-btn")) {
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
}

var editTask = function(taskId) {
    // console.log("editing task #" + taskId);

    //get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //get content fromm task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    // console.log(taskName);

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    // console.log(taskType);
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId)
}

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

    // create new array to hold updated list of tasks
    var updatedTaskArr = [];

    //loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }
    //reassign tasks arrray to be the same as updatedTaskArr
    tasks = updatedTaskArr;

    saveTasks();
};

var taskStatusChangeHandler = function(event) {
    // get the task item's id
    var taskId = event.target.getAttribute("data-task-id");
  
    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();
  
    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
      tasksToDoEl.appendChild(taskSelected);
    } 
    else if (statusValue === "in progress") {
      tasksInProgressEl.appendChild(taskSelected);
    } 
    else if (statusValue === "completed") {
      tasksCompletedEl.appendChild(taskSelected);
    }

    // update tasks in tasks array
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            task[i].status = statusValue;
        }
    }
    saveTasks();
  };

  var dragTaskHandler = function(event) {
     var taskId = event.target.getAttribute("data-task-id");
    event.dataTransfer.setData("text/plain", taskId);
    var getId = event.dataTransfer.getData("text/plain");
    console.log("getId:", getId, typeof getId)

  };

  var dropZoneDragHandler = function(event) {
      var taskListEl = event.target.closest(".task-list");
      if (taskListEl) {
      event.preventDefault();
      taskListEl.setAttribute("style", "background: rgba(68, 233, 255, 0.7); border-style: dashed;");
      
      }
  };

  var dropTaskHandler = function(event) {
      var id = event.dataTransfer.getData("text/plain");
      var draggableElement = document.querySelector("[data-task-id='" + id + "']");
     var dropZoneEl = event.target.closest(".task-list");
     var statusType = dropZoneEl.id;
     // set status of task based on dropZone id
     var statusSelectEl = draggableElement.querySelector("select[name='status-change']");
     if (statusType === "tasks-to-do") {
         statusSelectEl.selectedIndex = 0;
     } 
     else if (statusType === "tasks-in-progress") {
         statusSelectEl.selectedIndex = 1;
     }
     else if (statusType === "tasks-completed") {
         statusSelectEl.selectedIndex = 2;
     }
     dropZoneEl.appendChild(draggableElement);
     dropZoneEl.removeAttribute("style");

        // loop through tasks array to find and update the updated tasks status
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(id)) {
            tasks[i].status = statusSelectEl.value.toLowerCase();
        }
    }
    saveTasks();
    console.log(tasks);
  };

  var dragLeaveHandler = function(event) {
      var taskListEl = event.target.closest(".task-list");
      if (taskListEl) {
          taskListEl.removeAttribute("style");
      }
  }

  var saveTasks = function() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  var loadTasks = function() {
      // gets task items from localstorage
      var savedTasks = localStorage.getItem("tasks");
      // converts tasks from the stringified format back into an array of objects
      if (!savedTasks) {
          return false;
      }
      savedTasks = JSON.parse(savedTasks);

      // loop through savedTasks array
      for (var i = 0; i < savedTasks.length; i++) {
          createTaskEl(saveTasks[i])
      }
    }
      // iterates through tasks array and creates task elements on the page from it
      for (var i = 0; i < tasks.length; i++) {
          tasks[i].id = taskIdCounter
      
    var listItemEl = document.createElement("li")
        listItemEl.classname = "task-item";
        listItemEl.setAttribute("data-task-id", tasks[i].id)
        listItemEl.setAttribute("draggable", true) 

    var taskInfoEl = document.createElement("div");
        taskInfoEl.classname = "task-info";
        taskInfoEl.innerHTML = "<h2 class='task.name'>" + tasks[i].name + "</h3><span class='task-type'>" + tasks[i].type + "</span>"
        listItemEl.appendChild(taskInfoEl);
        
            if (tasks[i].status = "to-do") {
                listItemEl.querySelector("select[name='status-change']").selectedIndex = 0;
               tasksToDoEl .appendChild(listItemEl)
            } 
            else if (task[i].status = "in-progress") {
                listItemEl.querySelector("select[name='status-change']").selectedIndex = 1;
                tasksInProgressEl.appendChild(listItemEl)
            } 
            else if (task[i].status = "complete") {
                listItemEl.querySelector("select[name='status-change']").selectedIndex = 2;
               tasksCompletedEl.appendChild(listItemEl)
            }
         tasks.push(tasksLoaded[i]);
         taskIdCounter++
    }

  loadTasks();

pageContentEl.addEventListener("dragleave", dragLeaveHandler)
pageContentEl.addEventListener("drop", dropTaskHandler)
pageContentEl.addEventListener("dragover", dropZoneDragHandler);
pageContentEl.addEventListener("dragstart", dragTaskHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
pageContentEl.addEventListener("click", taskButtonHandler);

