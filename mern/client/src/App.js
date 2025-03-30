// import AddUser from './adduser/AddUser';
import './App.css';
import User from './getuser/User';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<User />} />
        {/* <Route path='/add' element={<AddUser />} /> */}
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
