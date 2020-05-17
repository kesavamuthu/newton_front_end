class Task {
  constructor(text) {
    this.text = text;
    this.isCompleted = false;
  }
}

class ToDoList {
  constructor() {
    this.task = JSON.parse(localStorage.getItem("tasks")) || [
      { text: "Hit Gym", isCompleted: false },
    ];
    this.body = document.getElementsByTagName("body")[0];

    this.render(this.task);
  }

  render(chosenTaskArray) {
    this.addPromptFormForAddingTasks();
    this.addListWithTasks(chosenTaskArray);
  }

  addPromptFormForAddingTasks() {
    const input = document.createElement("input");
    const button = document.createElement("button");
    input.className = "add-task-input";
    input.autofocus = true;
    input.placeholder = "Add Task";
    button.innerHTML = "Add task";
    button.addEventListener("click", () => {
      this.addTaskToList(input.value);
    });
    this.body.appendChild(input);
    this.body.appendChild(button);
  }

  addTaskToList(text) {
    if (!text.trim()) return;
    this.body.innerHTML = "";
    let tmpTask = new Task(text);
    this.task.push(tmpTask);
    this.render(this.task);
  }

  addListWithTasks(chosenTaskArray) {
    const ul = document.createElement("ul");
    ul.className = "todo-list";
    chosenTaskArray.forEach((element, taskIndex) => {
      const li = document.createElement("li");
      const removeTaskButton = document.createElement("div");

      li.addEventListener("click", (event) => {
        event.target.classList.add("task-completed");
        console.log(event);
        this.task[taskIndex].isCompleted = true;
        this.saveTasksInLocalStorage();
      });

      removeTaskButton.addEventListener("click", () => {
        ul.removeChild(li);
        this.task = this.task
          .slice(0, taskIndex)
          .concat(this.task.slice(taskIndex + 1, this.task.length));
        this.saveTasksInLocalStorage();
      });
      const removeIcon = document.createTextNode("\u0007");

      !element.isCompleted
        ? li.classList.add("task")
        : li.classList.add("task-completed");
      removeTaskButton.className = "delete-task-button";
      removeTaskButton.appendChild(removeIcon);
      li.innerHTML = element.text;
      ul.appendChild(li);
      ul.appendChild(removeTaskButton);
    });
    this.body.appendChild(ul);
    this.saveTasksInLocalStorage();
  }
  saveTasksInLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.task));
  }
}

const todo = new ToDoList();
