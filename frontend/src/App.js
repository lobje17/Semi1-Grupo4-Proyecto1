import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard";

import './App.css'
//<Route path="/ListaSub" exact element={<ListaSubProcesos />} />
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          
        </Routes>
      </Router>
    </>

  );
}

export default App;