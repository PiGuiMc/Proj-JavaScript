const inputForm = document.querySelector("#inputForm");
const showValues = document.querySelector("#taskList");
const inputText = document.querySelector("#input");

//functions
const saveValue = (text,done=0,save=1) =>{
    const task = document.createElement("div");
    task.classList.add("task");

    const taskTitle = document.createElement("h3");
    taskTitle.innerText = text;
    task.appendChild(taskTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-task");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    task.appendChild(doneBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-task");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    task.appendChild(deleteBtn);

    showValues.appendChild(task);

    if(done){
        task.classList.add("done");
    }
    if(save){
        saveTaskLocalStorage({text, done:0});
    }
    inputText.value ="";
    inputText.focus();
}

//events
inputForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const inputValue = inputText.value;
  
    if (inputValue) {
        saveValue(inputValue);
    }
  });

  document.addEventListener("click", (e)=>{
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");

    let taskTitle;

    if(parentEl && parentEl.querySelector("h3")){
        taskTitle = parentEl.querySelector("h3").innerHTML;
    }

    if(targetEl.classList.contains("finish-task")){
        parentEl.classList.toggle("done");
        updateTaskLocalStorage(taskTitle);
    }

    if(targetEl.classList.contains("remove-task")){
        parentEl.remove();
        console.log(taskTitle)
        removeTaskLocalStorage(taskTitle);
    }
  })

//local storage
const getTasksLocalStorage= () =>{
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    return tasks;
}

const loadTasks = () =>{
    const tasks = getTasksLocalStorage();
    tasks.forEach((task) => {
        saveValue(task.text, task.done,0);
    });
}

const saveTaskLocalStorage = (task) =>{
    const tasks = getTasksLocalStorage();

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const removeTaskLocalStorage= (taskText) =>{
    const tasks = getTasksLocalStorage();

    const filteredTasks = tasks.filter((task) => task.text != taskText);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
}

const updateTaskLocalStorage = (taskText) =>{
    const tasks = getTasksLocalStorage();

    tasks.map((task) => task.text === taskText ? (task.done =!task.done) : null)

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

loadTasks();