import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard";
import Inicio from "./pages/Inicio";
import Privados from "./pages/ArchivosPrivados";
import IngresarArchivo from "./pages/InsertArchivo";
import './App.css'
//<Route path="/ListaSub" exact element={<ListaSubProcesos />} />
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/Inicio" exact element={<Inicio />} />
          <Route path="/Privados" exact element={<Privados />} />
          <Route path="/InsertArchivo" exact element={<IngresarArchivo />} />
        </Routes>
      </Router>
    </>

  );
}

export default App;