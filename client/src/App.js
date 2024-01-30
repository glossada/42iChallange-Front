import './App.css';
import {Routes,Route,} from 'react-router-dom';
import Landing from './views/Landing/Landing'
import Main from './views/Main/Main.jsx'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={< Landing />} />
        <Route path={'/main'} element={< Main />} />
      </Routes>
    </div>
  );
}

export default App;
