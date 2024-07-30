import React, { useState } from 'react';

const Task = ({ task, onToggleComplete, onUpdateTask, onDeleteTask }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);

    const handleExpandToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const handleUpdateClick = () => {
        if (title.trim() === '' || description.trim() === '') {
            alert('Both title and description are required.');
            return;
        }
        onUpdateTask(task.id, title, description);
        setIsEditing(false);
    };

    return (
        <li >
            <div >

                <div style={{ display: 'flex' }}>
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => onToggleComplete(task.id)}
                    />
                    <div onClick={handleExpandToggle} style={{cursor:'pointer' ,flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ textDecorationLine: task.completed && 'line-through'}}>
                            {task.title}
                        </span>
                        <span >
                            <i className={`expand-icon fas ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                        </span>
                    </div>
                </div>

                {isExpanded && (
                    <div  >
                        {isEditing ? (
                            
                            <div  className="editcontainer" >
                                <div style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center'}}>
                                <input
                                    className='editInputinput'
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <textarea
                                    className='editInputinput'
                                    name="postContent"
                                    rows={4}
                                    cols={40}
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div style={{width:'90%',display:'flex',justifyContent:'flex-end'}}>
                                <button className='ButtomStyle' onClick={handleUpdateClick}>Save</button>
                                <button className='ButtomStyle' onClick={() => setIsEditing(false)}>Cancel</button>
                            </div>

                            </div>
                        ) : (
                            <div > 
                                <p className=''>{task.description}</p>
                                <p>Last Updated: {new Date(task.timestamp).toLocaleString()}</p>
                                <button className='ButtomStyle' onClick={() => setIsEditing(true)}>Edit</button>
                                <button className='ButtomStyle' onClick={() => onDeleteTask(task.id)}>Delete</button>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </li>
    );
};

export default Task;
