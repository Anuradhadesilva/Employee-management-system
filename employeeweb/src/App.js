import { Route,Routes } from 'react-router-dom';
import './App.css';
import Header from './pages/header/Header';
import Dashboard from './pages/dashboard/Dashboard';
import NoMatch from './pages/noMatch/NoMatch';
import CreateUser from './pages/employee/CreateUser';
import UpdateUser from './pages/employee/UpdateUser';

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/employee' element={<CreateUser/>}/>
        <Route path='/employee/:id' element={<UpdateUser/>}/>
        <Route path='*' element={<NoMatch/>}/>
      </Routes>
    </>
  );
}

export default App;
