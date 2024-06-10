import './App.css';
import Header from './Components/Header';
import SideNav from './Components/Sidenav';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Teams from './Components/Teams';
import Players from './Components/Players';
import Coaches from './Components/Coaches';
import Stadiums from './Components/Stadiums';


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className='main-content'>
          <SideNav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/players" element={<Players />} />
            <Route path="/coaches" element={<Coaches />} />
            <Route path="/stadiums" element={<Stadiums />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
