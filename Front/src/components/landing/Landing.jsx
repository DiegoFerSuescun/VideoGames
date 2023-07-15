import styles from './Landing.module.css';
import React from "react";
import { NavLink } from 'react-router-dom'




export default function Landing(props){
    return(
            <div className={styles.fondo}>
                <div className={styles.spinner_container}>
                    <div className={styles.spinner}></div>
                </div>
            <NavLink to='/home' className={styles.link}>
                <button className={styles.boton}>START!!!</button>
            </NavLink>
            </div>
    )
}