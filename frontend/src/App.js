import logo from "./logo.svg";
import "./App.css";
import Header from './components/Header';
import{Routes,Route} from 'react-router-dom';
import Login from './components/Login'
import Signup from './components/Signup'
import Welcome from './components/Welcome'
import{useSelector} from 'react-redux'

function App() {
  const isLoggedIn=useSelector(state=>state.isLoggedIn);
  console.log(isLoggedIn);
  return <div className="App">
    <header>
      <Header/>
    </header>
    <main>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/user" element={<Welcome/>}/>
        {/* <Route path></Route> */}

      </Routes>
    </main>
  </div>;
}

export default App;
