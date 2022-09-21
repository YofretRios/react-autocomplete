import React from 'react';
import { ReactComponent as ArrowUp } from '../../icons/up-arrow-button-icon.svg';
import { ReactComponent as ArrowDown } from '../../icons/down-arrow-button-icon.svg';
import { ReactComponent as Enter } from '../../icons/enter-button-icon.svg';
import styles from './helpKeys.module.css';

const HelpKeys = () => {
  return (
    <div className={styles.container}>
      <div className={styles.commands}><ArrowUp /> <ArrowDown /> <span>to navigate</span></div>
      <div className={styles.commands}><Enter /> <span>to select</span></div>
    </div>
  );
};

export default HelpKeys;
