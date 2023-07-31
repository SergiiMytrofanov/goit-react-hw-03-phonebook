import React from 'react';
import styles from './FilterItem.module.css'

const Filter = ({ filter, onChange }) => {
  return (
    <form className={styles.filterForm}>
      <input className={styles.filterFormInput}
        type="text"
        name="filter"
        placeholder="Пошук за ім'ям"
        value={filter}
        onChange={onChange}
      />
    </form>
  );
};

export default Filter;
