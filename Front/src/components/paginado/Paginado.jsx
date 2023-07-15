import React from "react";
import styles from "./Paginado.module.css";


export default function Paginado({total, pagAct, setPagAct, inPut, setInput}){

    const handleNext = () =>{
        setInput(inPut + 1 );
        setPagAct( pagAct + 1);
    };

    const handlePrev = () => {
        setInput(inPut - 1);
        setPagAct( pagAct -1 )
    };

    const onChange = (event) => {
        setInput(event.target.value);
    };

    const onKeyDown = event => {
        if(event.keyCode === 13){
            setPagAct(parseInt(event.target.value));
            if(parseInt(event.target.value) < 1 || parseInt(event.target.value) > Math.ceil(total) || isNaN(parseInt(event.target.value))){
                setPagAct(1);
                setInput(1);
            }else{
                setPagAct(parseInt(event.target.value))
            }
        }
    };


    return(
        <div className={styles.containerPaginado}>
           
              <button onClick={handlePrev} disabled={pagAct===1 || pagAct < 1} className={styles.button}> PREV </button>
            
           
               <input type="text" value={inPut} onChange={(event) => onChange(event)} onKeyDown={(event) => onKeyDown(event)} className={styles.input} />
                <p className={styles.contador}> De: {total}</p>            
            
            <button onClick={handleNext} disabled={ pagAct === Math.ceil (total) || pagAct > Math.ceil (total) } className={styles.button}>NEXT</button>
            
        </div>
    )
}