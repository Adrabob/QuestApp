import './App.css';
import { BrowserRouter as Router, Route,  Routes, Navigate } from 'react-router-dom' ;
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import User from './components/User/User';
import Auth from './components/Auth/Auth';



function App() {
  

  return (
    <div className="App">
      <Router>
      <Navbar></Navbar>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/users/:userId" element={<User />} />
            <Route exact path="/auth" element={localStorage.getItem("currentUser") != null ? <Navigate to="/" replace/> : <Auth />}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
