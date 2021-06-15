const tasksEl = document.querySelector('#tasks');
const loadingEl = document.querySelector('#loading');
let loading = false;

const getTasksFromBackend = async () => {
  loading = true;
  const res = await fetch('http://localhost:5000/tasks');
  const data = await res.json();
  loading = false;
  return data;
}

const addTasksToDom = async () => {
  const tasks = await getTasksFromBackend();

  if (!loading) {
    loadingEl.innerHTML = '';
  }

  tasks.forEach(task => {
    const div = document.createElement('div');
    div.className = 'task';
    div.innerHTML = `
      <h3>${task.title}</h3>
      <ul>
        <li><strong>Due Date: </strong> ${task.date}</li>
        <li><strong>Description: </strong> ${task.description}</li>
      </ul>
      <div class="tags">${task.tags}</div>
    `
    tasksEl.appendChild(div);
  })
}

addTasksToDom();