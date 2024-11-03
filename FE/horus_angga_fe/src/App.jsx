import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import AddData from './pages/AddData';
import Update from './pages/Update';
import Login from './pages/login';
import Register from './pages/register';
import NotFound from './pages/notFound';


function App() {
  return (
    <div>
       <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/add-data' element={<AddData />} />
          <Route path='/update/:userId' element={<Update />} />
          <Route path='/dashboard' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
       </Router>
    </div>
  )
}

export default App