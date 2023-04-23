import React from "react";
import styles from "./conferenceitem.module.scss";

const ConferenceItem = (props) => {
  const { item, showDetails, editConference, deleteConference } = props;

  const handleAction = (isDelete) => {
    isDelete ? deleteConference(item.id) : editConference(item);
  }

  return (
    <div className={styles.item}>
      <div className={styles.content}>
        <h2 className={styles.title}>{item.title}</h2>
        {showDetails && (
          <>
            <div className={styles.details}>
              <p className={styles.date}>Date: {item.date}</p>
              <p className={styles.author}>Author: {item.user_id}</p>
            </div>
            <div className={styles.description}>
              <p>{item.description}</p>
            </div>
          </>
        )}
      </div>
      {showDetails && (
        <div className={styles.actions}>
          <button onClick={() => handleAction(false)} className={styles.editButton}>Edit</button>
          <button onClick={() => handleAction(true)} className={styles.deleteButton}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default ConferenceItem;
