import { useState } from "react"

import PropTypes from 'prop-types';

let idCount = 0;

export function NewTaskForm({ setData }) {
    const [value, setValue] = useState('');
    const [min, setMin] = useState('');
    const [sec, setSec] = useState('');

    const onChangeInput = (event) => setValue(event.target.value);
    const onChangeMin = (event) => setMin(event.target.value);
    const onChangeSec = (event) => setSec(event.target.value);

    const addItem = (event) => {
        if (event.code === 'Enter') {
            if (value.trim() === '') return;

            const minutes = parseInt(min, 10) || 0;
            const seconds = parseInt(sec, 10) || 0;

            setData((data) => [...data, {
                id: ++idCount,
                text: value,
                completed: false,
                hidden: false,
                date: new Date(),
                isRunning: false,
                timer: minutes * 60 + seconds,
            }]);
            setValue('');
            setMin('');
            setSec('');
        }
    };

    return (
        <header className="header">
            <h1>todos</h1>
            <form className="new-todo-form">
                <input
                    className="new-todo"
                    placeholder="What needs to be done?"
                    autoFocus
                    id='new-todo'
                    value={value}
                    onChange={onChangeInput}
                    onKeyDown={addItem}
                />
                <input
                    className="new-todo-form__timer"
                    placeholder="Min"
                    type="number"
                    value={min}
                    onChange={onChangeMin}
                    id="min"
                />
                <input
                    className="new-todo-form__timer"
                    placeholder="Sec"
                    type="number"
                    value={sec}
                    onChange={onChangeSec}
                    id="sec"
                />
            </form>
        </header>
    );
}

NewTaskForm.propTypes = {
    setData: PropTypes.func.isRequired,
};