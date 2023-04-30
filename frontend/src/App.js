import logo from "./logo.svg";
import "./App.css";
import Header from './components/Header';
import{Routes,Route} from 'react-router-dom';
import Login from './components/Login'
import Signup from './components/Signup'
import Welcome from './components/Welcome'


function App() {
  return <div className="App">
    <header>
      <Header/>
    </header>
    <main>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/user" element={<Welcome/>}/>

      </Routes>
    </main>
  </div>;
}

export default App;
