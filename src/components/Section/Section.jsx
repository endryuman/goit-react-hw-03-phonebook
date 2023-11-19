import styles from './Section.module.css';
import React from 'react';

const Section = ({ title, children }) => {
  return (
    <div className={styles.sectionWrapper}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default Section;
