import React from "react";

import styles from './header.module.scss';

const Header = (props) => {
  const { user, handleBtnAction} = props;

  return (
    <header className={styles.header}>
      <div onClick={handleBtnAction} className={styles.actionBtn}>{user ? 'Log out' : 'Log in'}</div>
    </header>
  );
};

export default Header;