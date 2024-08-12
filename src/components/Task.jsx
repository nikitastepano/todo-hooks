import { useState, useEffect } from 'react';

import { formatDistanceToNowStrict } from 'date-fns'

import PropTypes from 'prop-types';

export function Task({ item, setData }) {
    const [formattedDate, setFormattedDate] = useState(formatDistanceToNowStrict(item.date));
    const [timeLeft, setTimeLeft] = useState(item.timer);

    useEffect(() => {
        const interval = setInterval(() => {
            setFormattedDate(formatDistanceToNowStrict(item.date));
            if (item.isRunning && timeLeft > 0) {
                setTimeLeft(prev => prev - 1);
            }
            if (timeLeft <= 0 && item.isRunning) {
                setData(data => data.filter(task => task.id !== item.id));
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [item.date, item.isRunning, timeLeft, setData, item.id]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const changeCompleted = () => {
        setData(data =>
            data.map(task =>
                task.id === item.id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const deleteItem = () => {
        setData(data =>
            data.filter(task => task.id !== item.id)
        );
    };

    const toggleTimer = () => {
        setData(data =>
            data.map(task =>
                task.id === item.id ? { ...task, isRunning: !task.isRunning } : task
            )
        );
    };

    return (
        <li className={`${item.completed ? 'completed' : ''} ${item.hidden ? 'hidden' : ''}`}>
            <div className="view">
                <input className="toggle"
                    type="checkbox"
                    id={item.id}
                    checked={item.completed}
                    onChange={changeCompleted}
                />
                <label htmlFor={item.id}>
                    <span className="title">{item.text}</span>
                    {item.timer > 0 && (
                        <span className="description">
                            {item.isRunning
                                ? <button className="icon icon-pause" onClick={toggleTimer} style={{marginRight: '8px'}} />
                                : <button className="icon icon-play" onClick={toggleTimer} style={{marginRight: '8px'}} />}
                            {formatTime(timeLeft)}
                        </span>
                    )}
                    <span className="description">created {formattedDate} ago</span>
                </label>
                <button className="icon icon-edit"></button>
                <button className="icon icon-destroy" onClick={deleteItem}></button>
            </div>
        </li>
    );
}

Task.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        date: PropTypes.instanceOf(Date).isRequired,
        timer: PropTypes.number.isRequired,
        isRunning: PropTypes.bool.isRequired,
        completed: PropTypes.bool.isRequired,
        hidden: PropTypes.bool
    }).isRequired,
    setData: PropTypes.func.isRequired
};