import React from "react";
import PostNGame from "../components/post/postGame";
import NavBar from "../components/navBar/NavBar";
import styles from './CreateGame.module.css';

export const PostContents = () => {
    return(
        <div className={styles.container}>
            <NavBar />
            <PostNGame />
        </div>
    )
}