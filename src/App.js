import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './page/Home';
import AddUser from './page/AddUser';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='add' element={<AddUser/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
