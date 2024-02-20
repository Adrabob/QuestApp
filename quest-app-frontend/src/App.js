import './App.css';
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import User from './components/User/User';


function App() {
  return (
    <div className="App">
      <Router>
      <Navbar></Navbar>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/users/:userId" element={<User />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
