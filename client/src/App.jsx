import React, {useState} from 'react';
import '../src/styles.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import UploadForm from '../components/UploadForm';
import LogReg from '../components/LogReg';
import Theater from '../components/Theater';
import EditForm from '../components/EditForm';

const App = () => {
  const [creator, setCreator] = useState('');
  console.log(creator);
  return (
    <BrowserRouter>
      {/* <div className="App"> */}
      <Routes>
        <Route element={<Theater />} path="/videos/:id" />
        <Route element={<Home />} path="/" />
        <Route element={<LogReg />} path="/login" creator ={creator} setCreator ={setCreator}/>
        {/*}  <Route element={<UploadForm />} path="/videos/new" />
          <Route element={<EditForm />} path="/videos/edit/:id" />*/}
      </Routes>
      {/* </div> */}
    </BrowserRouter>
  );
};

export default App;
