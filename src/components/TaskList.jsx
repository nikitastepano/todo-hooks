import { Task } from "./Task"

import PropTypes from 'prop-types';

export function TaskList({ data, setData }) {
    return (
        <ul className="todo-list">
            {data.map((item) => {
                return <Task key={ item.id } item={ item } setData={ setData } />
            })}
        </ul>
    )
}

TaskList.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            date: PropTypes.instanceOf(Date).isRequired,
            timer: PropTypes.number.isRequired,
            isRunning: PropTypes.bool.isRequired,
            completed: PropTypes.bool.isRequired,
            hidden: PropTypes.bool
        }).isRequired
    ).isRequired,
    setData: PropTypes.func.isRequired
};