import { useState } from "react"

import PropTypes from "prop-types";

export function TaskFilter({ handleFilterChange }) {

  const [selected, setSelected] = useState('all');

  const showAll = () => {
    setSelected('all');
    handleFilterChange('all');
  };

  const showActive = () => {
    setSelected('active');
    handleFilterChange('active');
  };

  const showCompleted = () => {
    setSelected('completed');
    handleFilterChange('completed');
  };

  return (
    <ul className="filters">
      <li>
        <button
          className={selected === 'all' ? 'selected' : ''}
          onClick={showAll}
        >All</button>
      </li>
      <li>
        <button
          className={selected === 'active' ? 'selected' : ''}
          onClick={showActive}
        >Active</button>
      </li>
      <li>
        <button
          className={selected === 'completed' ? 'selected' : ''}
          onClick={showCompleted}
        >Completed</button>
      </li>
    </ul>
  );
}

TaskFilter.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
};