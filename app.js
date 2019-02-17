const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');



// Load all event lisenters
loadEventListeners();

// Load all event lisenters function

function loadEventListeners(){
  //Dom Load Event
  document.addEventListener('DOMContentLoaded', getTasks);

  form.addEventListener('submit', addTask);

  taskList.addEventListener('click', removeTask);

  clearBtn.addEventListener('click', clearTasks);

  filter.addEventListener('keyup', filterTasks)
}

function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
     // Create li
    const li = document.createElement('li');

    // Add Class
    li.className = 'collection-item';

    // create text and append to li
    li.appendChild(document.createTextNode(task));

    // create link
    const link = document.createElement('a');

    //add class
    link.className = 'delete-item secondary-content';

    // add icon
    link.innerHTML = `<i class="fa fa-remove"></>`;

    // append link to ul
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);
  });
}

function addTask(e){
 if (taskInput.value == '') {
   alert('Please enter task');
 } 
  // Create li
  const li = document.createElement('li');

  // Add Class
  li.className = 'collection-item';

  // create text and append to li
  li.appendChild(document.createTextNode(taskInput.value));

  // create link
  const link = document.createElement('a');

  //add class
  link.className = 'delete-item secondary-content';

  // add icon
  link.innerHTML = `<i class="fa fa-remove"></>`;

  // append link to ul
  li.appendChild(link);

  // append li to ul
  taskList.appendChild(li);

  // Store in Local storage
  storeTaskInLocalStorage(taskInput.value);

  //clear input
  taskInput.value = '';

  e.preventDefault();
}



function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
    }
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index){
    if (taskItem.textContent == task) {
      tasks.splice(index, 1);
    }

  });

  localStorage.setItem('tasks', JSON.stringify(tasks));

}

function clearTasks() {
/*   if (confirm('Are you sure you want to delete all items?')) {
    taskList.innerHTML = '';
  } */
  
 //faster - I don't like
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
  clearTaskFromLocalStorage();
}

function clearTaskFromLocalStorage(){
  localStorage.clear();
}

function filterTasks(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach
  (function(task){
      const item = task.firstChild.textContent;
      if (item.toLowerCase().indexOf(text) != -1){
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    });
}