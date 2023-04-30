import { useState } from 'react'

import useLocalStorage from './hooks/useLocalStorage';

// Componentes customizados
import CustomForm from './components/CustomForm'
import EditForm from './components/EditForm'
import TaskList from './components/TaskList';
import ThemeSwitcher from './components/ThemeSwitcher';

function App() {
    const[task, setTask] = useLocalStorage('react-todo.tasks', []);
    const[previousFocus, setPreviousFocus] = useState(null);
    const[editedTask, setEditedTask] = useState(null);
    const[isEditing, setIsEditing] = useState(false);

    const addTask = (task) => {
        setTask(prevState => [...prevState, task]);
    }

    const deleteTask = (id) => {
        setTask(prevState => prevState.filter(t => t.id !== id));
    }

    const toggleTask = (id) => {
        setTask(prevState => prevState.map(t => (
            t.id === id
            ? {...t, checked: !t.checked} 
            : t
        )))
    }

    const updateTask = (task) => {
        setTask(prevState => prevState.map(t => (
            t.id === task.id
            ? {...t, name: task.name} 
            : t
        )))
        closeEditMode();
    }

    const closeEditMode = () => {
        setIsEditing(false);
        previousFocus.focus();
    }

    const enterEditMode = (task) => {
        setEditedTask(task);
        setIsEditing(true);
        setPreviousFocus(document.activeElement);
    }

    return (
        <div className='container'>
            <header>
                <h1>Lista de Tarefas</h1>
            </header>
            {
                isEditing && (
                    <EditForm
                        editedTask={editedTask}
                        updateTask={updateTask}
                        closeEditMode={closeEditMode}
                    />
                )
            }
            <CustomForm addTask={addTask} />
            {task && (
                <TaskList 
                    tasks={task}
                    deleteTask={deleteTask}
                    toggleTask={toggleTask}
                    enterEditMode={enterEditMode}
                />
            )}
            <ThemeSwitcher />
        </div>
    )
}

export default App
