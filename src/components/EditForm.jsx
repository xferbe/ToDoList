/* eslint-disable react/prop-types */
import { CheckIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react';

// eslint-disable-next-line react/prop-types
const EditForm = ({ editedTask, updateTask, closeEditMode }) => {
    const[updatedTaskName, setUpdatedTaskName] = useState(editedTask.name);

    useEffect(() => {
        const closeModal = (e) => {
            e.key === 'Escape' && closeEditMode();
        }
        window.addEventListener('keydown', closeModal);

        return () => {
            window.removeEventListener('keydown', closeModal);
        }
    }, [closeEditMode])

    const handleFormSubmit = (e) => {
        e.preventDefault();
        updateTask({...editedTask, name: updatedTaskName});
    }

    return(
        <div 
            role='dialog' 
            aria-labelledby='editTask'
            onClick={(e) => {e.target === e.currentTarget && closeEditMode()}}
            >
            <form 
                className="todo"
                onSubmit={handleFormSubmit}
                autoComplete="off"
            >
                <div className="wrapper">
                    <input 
                        type="text" 
                        id="editTask"
                        className="input"
                        value={updatedTaskName}
                        onInput={(e) => setUpdatedTaskName(e.target.value)}
                        required
                        autoFocus
                        maxLength={60}
                        placeholder="Atualizar tarefa"
                    />
                    <label
                        htmlFor="editTask"
                        className="label"
                    >Atualizar tarefa</label>
                </div>
                <button 
                    className="btn"
                    aria-label={`Confirme a tarefa editada para agora ler ${updatedTaskName}`}
                    type="submit"
                    >
                    <CheckIcon strokeWidth={2} height={24} width={24} />
                </button>
            </form>
        </div>
    )
}
export default EditForm