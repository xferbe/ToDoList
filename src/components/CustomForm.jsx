import { PlusIcon } from '@heroicons/react/24/solid'
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const CustomForm = ({ addTask }) => {
    const[task, setTask] = useState("");

    const handleFormSubmit = (e) => {
        e.preventDefault();
        addTask({
            name: task,
            checked: false,
            id: Date.now()
        });
        setTask("");
    }

    return(
        <form 
            className="todo"
            onSubmit={handleFormSubmit}
            autoComplete="off"
        >
            <div className="wrapper">
                <input 
                    type="text" 
                    id="task"
                    className="input"
                    value={task}
                    onInput={(e) => setTask(e.target.value)}
                    required
                    autoFocus
                    maxLength={60}
                    placeholder="Digite uma tarefa"
                />
                <label
                    htmlFor="task"
                    className="label"
                >Digite uma tarefa</label>
            </div>
            <button 
                className="btn"
                aria-label="Adicionar Tarefa"
                type="submit"
                >
                <PlusIcon />
            </button>
        </form>
    )
}
export default CustomForm