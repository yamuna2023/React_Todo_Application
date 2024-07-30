import React, { useState, useEffect } from 'react';
import Task from './components/MyTasks';
import './App.css';

const sampledata = [
  {
    "id": 1,
    "title": "Task 1",
    "description": "Description for Task 1",
    "completed": false,
    "timestamp": "2024-07-29T10:00:00Z"
  },
  {
    "id": 2,
    "title": "Task 2",
    "description": "Description for Task 2",
    "completed": false,
    "timestamp": "2024-07-28T14:00:00Z"
  }
]

function App() {
  const [tasks, setTasks] = useState(sampledata);
  const [search, setSearch] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  useEffect(() => {
    fetch('../tasks.json')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleCreateTask = () => {
    // Validate the input fields
    if (newTaskTitle.trim() === '' || newTaskDescription.trim() === '') {
      alert('Both title and description are required.');
      return;
    }

    const newTask = {
      id: tasks.length + 1,
      title: newTaskTitle,
      description: newTaskDescription,
      completed: false,
      timestamp: new Date().toISOString(),
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setNewTaskDescription('');
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleUpdateTask = (id, newTitle, newDescription) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, title: newTitle, description: newDescription, timestamp: new Date().toISOString() }
        : task
    ));
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };
  return (
    <div className="container"style={{
      backgroundImage: "url('https://www.aihr.com/wp-content/uploads/employee-task-list-template-cover.jpg')"
    }} >
      <h1 className='mainheading' style={{ fontSize: 30 }}>To-Do List</h1>

      <div className="container2" style={{ height: '100%' }}>
        <input
          className='commontextinpustyle'
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={handleSearchChange}
        />
        <h2 className='mainheading'>Create Task</h2>
        <input
          className='commontextinpustyle'
          type="text"
          placeholder="Title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}

        />
        <textarea
          name="postContent"
          rows={4}
          cols={20}
          placeholder="Description"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />


        <div style={{ width: '100%',marginTop:10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

          <button style={{ width: '30%' }} className='ButtomStyle' onClick={handleCreateTask}>Add Task</button>
        </div>


        <ul>
          {filteredTasks.map(task => (
            <Task
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
