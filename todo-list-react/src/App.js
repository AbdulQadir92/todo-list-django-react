import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content container">
          <Routes>
            <Route exact path="/" element={ <Home /> }></Route>
            <Route exact path="/login" element={ <Login /> }></Route>
            <Route exact path="/register" element={ <Register />}></Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
