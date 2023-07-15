import React from "react";
import Home from "../components/home/home";
import styles from './Home.module.css';

export const HomeContents = () => {
    return(
        <div className={styles.contents}>
            <Home />
        </div>
    )
}