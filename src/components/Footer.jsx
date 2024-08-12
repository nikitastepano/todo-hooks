import { TaskFilter } from "./TaskFilter"

import PropTypes from 'prop-types';

export function Footer({ data, setData }) {

  const countItemsLeft = data.filter(element => !element.completed)

  const clearCompleted = () => {
    setData((tasks) => 
      tasks.filter(task => !task.completed)
    )
  }

  const handleFilterChange = (filter) => {
    if (filter === 'all') {
      setData(tasks => tasks.map(task => ({ ...task, hidden: false })));
    } else if (filter === 'completed') {
      setData(tasks => tasks.map(task => ({ ...task, hidden: !task.completed })));
    } else if (filter === 'active') {
      setData(tasks => tasks.map(task => ({ ...task, hidden: task.completed })));
    }
  };

    return (
        <footer className="footer">
          <span className="todo-count">{ countItemsLeft.length } items left</span>
          <TaskFilter handleFilterChange={handleFilterChange} />
          <button className="clear-completed" onClick={clearCompleted}>Clear completed</button>
        </footer>
    )
}

Footer.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      completed: PropTypes.bool.isRequired,
      hidden: PropTypes.bool,
      // Add any other properties of the task object that you use in your component
    }).isRequired
  ).isRequired,
  setData: PropTypes.func.isRequired,
};