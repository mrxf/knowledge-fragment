import React from "react";
import styles from "./index.module.css";
import clsx from "clsx";

const Hello = () => {
  return (
    <div className={styles.helloContainer}>
      <div className={clsx(styles.containerItem, styles.landingPageContainer)}>
        <div className={styles.contentWrapper}>
          <p className={styles.coords}>N 40° 05' 36.78" / E 116° 32' 31.25"</p>
          <div className={styles.ellipsesContainer}>
            <h2 className={styles.greeting}>前端技术积累</h2>
            <div className={clsx(styles.ellipses, styles.ellipsesOuterThin)}>
              <div className={clsx(styles.ellipses, styles.ellipsesOrbit)} />
            </div>
            <div className={clsx(styles.ellipses, styles.ellipsesOuterThick)} />
          </div>
          <div className={styles.scroller}>
            <p className={styles.pageTitle}>home</p>
            <div className={styles.timeline}>
              <span className={styles.timelineUnit} />
              <span className={clsx(styles.timelineUnit, styles.timelineUnitActive)} />
              <span className={styles.timelineUnit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hello;
