import React from "react";

import styles from './conferenceitem.module.scss';

const ConferenceItem = (conference) => {
  const { item } = conference;
  console.log(item.id);
  return (
    <div className={styles.item}>
      {item.name}
    </div>
  );
};

export default ConferenceItem;