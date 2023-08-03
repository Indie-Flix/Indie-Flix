import React, {useState} from 'react';
import './styles.scss';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './views/Home';
import UploadForm from './components/UploadForm';
import LogReg from './views/LogReg';
import Theater from './views/Theater';
import EditForm from './components/EditForm';
import Watchlist from './components/WatchList';

const App = () => {
  const [creator, setCreator] = useState('');
  const location = useLocation();
  const userData = location.state;
  return (
    <div>
      <Routes>
        <Route element={<Theater />} path="/videos/:id" />
        <Route element={<Home userData={userData} />} path="/" />
        <Route element={<LogReg />} path="/login" creator ={creator} setCreator ={setCreator}/>
        {/*}  <Route element={<UploadForm />} path="/videos/new" />
            <Route element={<EditForm />} path="/videos/edit/:id" />*/}
      </Routes>
    </ div>
  );
};

export default App;
