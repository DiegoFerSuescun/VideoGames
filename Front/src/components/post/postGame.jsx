import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllGames, getAllGenres, postGame } from "../../redux/actions";
import styles from "./postGame.module.css";


export default function PostNGame(props){

    const dispatch = useDispatch();
    const local = useNavigate();
    let platforms = ["PS4", "PS5", "PC", "SEGA", "NINTENDO 64", "NINTENDO SWITCH", "ATARI", "XBOX ONE", "XBOX X", "GAME BOY ADVANCED"];
    const genres = useSelector((state) => state.genres);
    
    const [ form, setForm ] = useState({
        name: '',
        description: '',
        platforms: [],
        released: '',
        rating: 0,
        genres: [],
        background_image: ''
    });
    
    const [ errors, setErrors ] = useState({
        name: '',
        description: '',
        platforms: [],
        released: '',
        rating: 0,
        genres: [],
        background_image: '' 
    })


    useEffect(() => {
        if(!genres.length){
            dispatch(getAllGenres());
        }
    }, [dispatch, genres]);


    const handleChange = (event) => {

        const { name, value } = event.target;
        console.log('este es el name', event.target.name);
        console.log('este es el value', event.target.value);
        setForm({
            ...form,
            [name]: value
        })

        if(!errors.length){
            return setErrors({[name]:''})
        }

    };

    const handleSubmit = (event) => {
        event.preventDefault();      
 
        if(form.name.trim() === '' || form.name > 10){
            return setErrors( { ...errors, name: 'This field is not valid'})
        }else if( !/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|png|gif)/g.test(form.background_image)){
            return setErrors({...errors, background_image: 'Please enter a valid URL'})
        }else if(form.description.trim() === ''){
            return setErrors({...errors, description: 'The description is not vaild'})
        }else if(form.released === ''){
            return setErrors({...errors, released: 'The released is not vaild'})
        }else if(form.rating === 0){
            return setErrors({...errors, rating: 'The rating is not vaild'})
        }else if(form.rating > 5){
            return setErrors({...errors, rating: 'The rating cannot be higher than 5'})
        }else if(form.platforms.length === 0 || form.platforms.length > 5 ){
            return setErrors({...errors, platforms: ' The platforms number is not vaild, must be between 1 and 5'})
        }else if(form.genres.length ===0){
            return setErrors({...errors, genres: 'The genres number is not vaild'})
        }else {
            dispatch(postGame(form));
            
            dispatch(getAllGames());
            local('/home');
        }
    };

    const handleReset = (event) =>{
        event.preventDefault();
        setForm({
            name: '',
            description: '',
            platforms: [],
            released: '',
            rating: 0,
            genres: [],
            background_image: '' 
        })
        document.getElementById('platforms').reset();
    };

    const handleClickGen = (event) => {
        if(event.target.checked){
            setForm({
                ...form,
                genres: [...form.genres, event.target.value]
            });
        }else {
            setForm({
                ...form,
                genres: form.genres.filter((genre) => genre.name !== event.target.value)
            })
        }
        
    };

    const handleClickPla = (event) => {
        if(event.target.checked){
            setForm({
                ...form,
                platforms:[...form.platforms, event.target.value]
            })
        }else{
            setForm({
                ...form,
                platforms: form.platforms.filter((platform) => platform !== event.target.value)
            })
        }
    };


    return(
        <form onSubmit={(event) => handleSubmit(event)} onReset={(event) => handleReset(event)} className={styles.contents}>
            <fieldset>

            <legend className={styles.legend}>CREATE NEW GAME</legend>

            <div className={styles.container}>
                <label htmlFor="name " className={styles.labelName}>Name:</label>
                <input type="text" id="name" value={form.name} name="name" onChange={(event) => handleChange(event)} className={styles.inputName} />
            </div>
                <p className= {styles.errors}>{errors.name}</p>

            <div className={styles.container}>
                <label htmlFor="image" className={styles.labelImage}>Image: </label>
                <input type="text" id="image" value={form.background_image} name="background_image" onChange={(event) => handleChange(event)} className={styles.inputimage}/>
            </div>
                <p className= {styles.errors}>{errors.background_image}</p>

            <div className={styles.containerDescription}>
                <label htmlFor="description" className={styles.labelDescrip}>Description: </label>
                <textarea  id="description" cols="30" rows="10" value={form.description} name="description" onChange={(event) => handleChange(event)} className={styles.inputDesc}/>
                <p className= {styles.errors}>{errors.description}</p>
            </div>

            <div className={styles.containPlat}>
                <label htmlFor="platforms" className={styles.labelPlat}>Platforms: </label>
                {
                    platforms?.sort().map((platform) => {
                        return(
                            <div id="platforms" className={styles.checkPlat}>
                                <input type="checkbox" value={platform} name="platform" onClick={(event) => handleClickPla(event)} />
                                <label htmlFor="platform" >{platform}</label>
                            </div>
                        );
                    })
                }
            </div>
                <p className= {styles.errors}>{errors.platforms}</p>
            
            <div className={styles.container}>
                <label htmlFor="released" className={styles.labelRele}>Released: </label>
                <input type="date" id="realesed" value={form.released} name="released" onChange={(event) => handleChange(event)} className={styles.inputRele} />
                <p className= {styles.errors}>{errors.released}</p>
            </div>

            <div className={styles.container}>
                <label htmlFor="rating" className={styles.labelRating}>Rating: </label>
                <input type="numbre" id="rating" value={form.rating} name="rating" onChange={(event) => handleChange(event)} className={styles.inputRating}/>
            </div>
                <p className= {styles.errors}>{errors.rating}</p>

            <div className={styles.containPlat}>
                <label htmlFor="genres" className={styles.labelPlat}>Genres:</label>
                {
                    genres.sort((a,b) => (a.name > b.name? 1 : -1)).length?
                    genres.map((genre) =>{
                        return(
                            <div className={styles.checkPlat}>
                                <label htmlFor={genre.name} key={genre.id} >{genre.name}</label>
                                <input type="checkbox" id={genre.name} value={genre.name} onClick={(event)=> handleClickGen(event)} />
                            </div>
                        )
                    }):<div></div>
                }
                <p className= {styles.errors}>{errors.genres}</p>
            </div>
            </fieldset>
            <div className={styles.conytainButtons}>
                <input type="submit" value="Create Game" className={styles.buttonSubmit} />
                <input type="reset" value="Reset Form" className={styles.buttonSubmit} />
            </div>
       </form>
    )
}

// export default function PostNGame(props){
//     /* ------------ESTADOS Y USEEFFECT----------------- */
//     const [ form, setForm ] = useState({
//         name: '',
//         background_image: '',
//         description:'',
//         platforms: [],
//         released: '',
//         rating: 0,
//         genres: []
//     });

//     const [errors, setErrors] = useState({
//         name: '',
//         background_image: '',
//         description:'',
//         platforms: [],
//         released: '',
//         rating: 0,
//         genres: []
//     })

//     let platforms = ["PS4", "PS5", "PC", "SEGA", "NINTENDO 64", "NINTENDO SWITCH", "ATARI", "XBOX ONE", "XBOX X", "GAME BOY ADVANCED"];
    
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const genres = useSelector((state) => state.genres);

  

//     useEffect(() => {
//         if (!genres.length) {
//             dispatch(getAllGenres());
//         }
//     },[dispatch, genres]);
    



//     /* -----------------HANDLERS---------------- */
//     const handleChange = (event) => {
//         const property = event.target.name;
//         const value = event.target.value;
//         setForm({ ...form, [property]: value });
        
//         if(!errors.length){
//            return setErrors({[property]:''}); 
//         }
        
        
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
        
//         if (form.name.trim() === '' || form.name > 10) {
//             return setErrors({...errors, name: 'Please fill this field'});    
//         } else if (!/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|png|gif)/g.test(form.background_image)) {
//             return setErrors({ ...errors,  background_image:'Please put a valid url for a image' });
//         } else if (form.description.trim() === '') {
//             return setErrors({ ...errors,  description:'Please enter a description' });
//         } else if (form.released === '') {
//             return setErrors({ ...errors,  released: 'Please enter a released date' });
//         } else if (form.rating === 0 ) {
//             return setErrors({ ...errors,  rating:'Please put a rating' });
//         } else if (form.rating > 5 ) {
//             return setErrors({ ...errors,   rating:'Please put a rating bethween 1 and 5' });
//         } else if(form.platforms.length === 0 || form.platforms.length > 5 ){
//             return setErrors({ ...errors, platforms:'Please put platforms bethween 1 and 5'});
//         } else if(form.genres.length === 0 || form.genres.length > 4 ){
//             return setErrors({ ...errors,  genres:'Please put a genres bethween 1 and 5'});
//         } else {
//             dispatch(postGame(form));
//             navigate('/home');

//         }
//     };
    
//     const handleReset = (event) => {
//         event.preventDefault();
//         setForm({
//             name: '',
//             background_image: '',
//             description:'',
//             platforms: [],
//             released: '',
//             rating: 0,
//             genres: []
//         });
//         document.getElementById("platforms").reset();
//     };
    
//     const handleClickG = (event) => {
//         if (event.target.checked) {
//             setForm({ ...form, genres: [...form.genres, event.target.value] });
//         } else {
//             setForm({ ...form, genres: form.genres.filter((gen) => gen.name !== event.target.value)});
//         }   
//     };
    
//     const handleClickP = (event) => {
//         if (event.target.checked) {
//             setForm({ ...form, platforms: [...form.platforms, event.target.value] });
//         } 
//          else{
//             setForm({ ...form, platforms: form.platforms.filter((platform) => platform !== event.target.value) });
//         }   
//     };
    

//   return (
    
//     <form onSubmit={(event) => handleSubmit(event)} onReset={(event) => handleReset(event)} className={style.form}>
//         <fieldset className={style.fieldset}>
//             <legend className={style.legend}>Create a new Game</legend>

//             <div className={style.container}>
//               <input type="text" id='name' value={form.name} name='name' onChange={(event) => handleChange(event)} className={style.inputtext}/>
//               <label htmlFor="name" className={style.labeltext}>Name: </label>
//               <p className={style.error}>{errors.name}</p>
//             </div>

//             <div className={style.container}>
//               <input type="text" id='image' value={form.background_image} name='background_image' onChange={(event) => handleChange(event)} className={style.inputtext}/>
//               <label htmlFor="image" className={style.labeltext}>Image: </label>
//               <p className={style.error}>{ errors.background_image}</p>
//             </div>

//             <div className={style.textareaContainer}>
//                <label htmlFor="description" className={style.label}>Description: </label>
//                <textarea id="description" cols="30" rows="10" value={form.description} name='description' onChange={(event) => handleChange(event)} className={style.textarea}/>
//                <p className={style.error}>{errors.description}</p>
//             </div>

//             <div>
//                 <label htmlFor="platforms" className={style.labelCb}>Platforms: </label>
//                 {
//                     platforms?.sort().map((platform) => {
//                         return(
//                             <div id="platforms" className={style.checkBox}>
//                                 <input type="checkbox" value={platform} name='platforms' onClick={(event) => handleClickP(event)} className={style.input}/>
//                                 <label htmlFor="platform" className={style.labelsPyG}>{platform}</label>
//                             </div>
//                         );
//                     })
//                 }
//                 <p className={style.error}>{errors.platforms}</p>
//             </div>

//             <div>
//                 <label htmlFor="released" className={style.label}>Released: </label>
//                <input type="date" id="released" value={form.released} name='released' onChange={(event) => handleChange(event)} className={style.input}/>
//                <p className={style.error}>{ errors.released}</p>
//             </div>

//             <div>
//                <label htmlFor="rating" className={style.labelCb}>Rating: </label>
//                <input type="number" id="rating" value={form.rating} name='rating' onChange={(event) => handleChange(event)} min='0' step='0.5' className={style.input}/>
//                <p className={style.error}>{errors.rating}</p>
//             </div>

//             <div>
//             <label htmlFor="genres" className={style.labelCb}>Genres: </label>
//                 {   genres.sort((a,b) => (a.name > b.name ? 1 : -1)).length ?
//                     genres.map((genre) => {
//                         return(
//                             <div className={style.checkBox}>
//                                 <label htmlFor={genre.name} key={genre.id} className={style.labelsPyG}>{genre.name}</label>
//                                 <input type="checkbox" id={genre.name} value={genre.name} onClick={(event) => handleClickG(event)}  className={style.input}/>
                                
//                             </div>
//                         );
//                     }) : <div className={style.hypnotic}></div>
//                 }
//                 <p className={style.error}>{errors.genres}</p>
//             </div>
            
//         </fieldset>
//         <input type="submit" value="Create Game" className={style.buttons} />
//         <input type="reset" value="Reset Form" className={style.buttons} />
//     </form>
//   );
// };
