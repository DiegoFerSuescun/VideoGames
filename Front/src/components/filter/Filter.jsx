import React from "react";
import styles from "./Filter.module.css";

export default function Filter({handleByname, handleByRating, handleByCreation, handleByGenres, allGenres}){

  
    return(
        <div className={styles.containerFilters}>
          <div>
            <label htmlFor="allGames">All Games:  
                <select name="ordenCreation" id="allGames" onChange={(event) => handleByCreation(event)}>
                    <option value="DEFAULT" disabled selected hidden>GAMES</option>
                    <option value="exisiting">AVAILABLE</option>
                    <option value="Created"> CREATED </option>
                </select>
            </label>
          </div>
          
          <div>
            <label htmlFor="allGenres">All Genres:
            <select name="ordenGenres" id="allGenres" onChange={(event) => handleByGenres(event)}>
                <option value="DEFAULT" disabled selected hidden>GENRES</option>
                <option value="Action">ACTION</option>
                <option value="Adventure">ADVENTURE</option>
                <option value="Arcade">ARCADE</option>
                <option value="Board Games">BOARD GAMES</option>
                <option value="Card">CARD</option>
                <option value="Casual">CASUAL</option>
                <option value="Educational">EDUCATIONAL</option>
                <option value="Family">FAMILY</option>
                <option value="Fighting">FIGHTING</option>
                <option value="Indie">INDIE</option>
                <option value="Massively Multiplayer">MASSIVELY MULTIPLAYER</option>
                <option value="Platformer">PLATFORMER</option>
                <option value="Puzzle">PUZZLE</option>
                <option value="Racing">RACING</option>
                <option value="RPG">RPG</option>
                <option value="Shooter">SHOOTER</option>
                <option value="Simulation">SIMULATION</option>
                <option value="Sports">SPORTS</option>
                <option value="Strategy">STRATEGY</option>
                </select>
            </label>
          </div>

          <div>
            <label htmlFor="OrderName">By Name: 
                <select name="ordenName" id="ordenName" onChange={(event) => handleByname(event)}>
                    <option value="" disabled hidden selected>Orden: </option>
                    <option value="ASC" >A-Z</option>
                    <option value="DES" >Z-A</option>
                </select>
            </label>
          </div>


          <div>
            <label htmlFor="ordenRating" id="ordenRating" >By: rating
                <select name="ordenRating" id="ordenRating" onChange={(event) => handleByRating(event)}>
                    <option value="" disabled hidden selected>Rating:</option>
                    <option value="ASC" >Menor</option>
                    <option value="DES" >Mayor</option>

                </select>
            </label>

          </div>
        </div>
    )
}