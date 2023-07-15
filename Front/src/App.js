import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landing from './components/landing/Landing.jsx';
import Detail from './components/detail/detail';
import { PostContents } from './contents/CreateGame';
import { HomeContents } from './contents/Home';



function App() {
  
  return (
  <div>
    <Routes>
      <Route path='/' element= {<Landing/>}/>
      <Route path='/home' element= {<HomeContents/>}/>
      <Route path='/videogames/:idvideogame' element= {<Detail/>}/>
      <Route path='/postGame' element= {<PostContents/>}/>
    </Routes>
  </div>
  );
}

export default App;
