import styles from './Filter.module.css';
export const Filter = ({ value, onChange }) => {
  return (
    <div className={styles.filterWrapper}>
      <label htmlFor="filter">Find contacts by name</label>
      <input
        id="filter"
        type="text"
        name="filter"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
