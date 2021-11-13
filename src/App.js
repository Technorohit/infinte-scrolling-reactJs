import './App.css';
import AuthComponent from './Component/AuthComponent/AuthComponent';
import Dashboard from './Component/Dashboard/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {

// const AuthCheck=()=>{
// console.log('....')
// }

  return (
    <div className="App">
       <BrowserRouter> 
        <Routes>
              <Route path="/" element={<AuthComponent />}  />
              <Route path="dashboard" element={<Dashboard />}  />
            </Routes>
            </BrowserRouter>
    </div>
  );
}

export default App;
