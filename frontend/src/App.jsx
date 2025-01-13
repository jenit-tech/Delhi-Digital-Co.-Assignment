import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import ShowInvoice from './pages/ShowInvoice';
import EditInvoice from './pages/EditInvoice';
import DeleteInvoice from './pages/DeleteInvoice';
import CreateInvoice from './pages/CreateInvoice';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/invoice/create' element={<CreateInvoice />} />
      <Route path='/invoice/details/:id' element={<ShowInvoice />} />
      <Route path='/invoice/edit/:id' element={<EditInvoice/>} />
      <Route path='/invoice/delete/:id' element={<DeleteInvoice />} />
      <Route path='/login' element={<Login />} />
      <Route path='/Signup' element={<Signup />} />
    </Routes>
  );
};

export default App;
