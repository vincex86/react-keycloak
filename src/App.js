import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import About from "./About"
import './App.css';

function App() {
  return (
  <div className="App">
   <BrowserRouter>
    <Routes>
     <Route path="/" element={<Home />} />
      <Route path="About" element={<About />} />

    </Routes>
   </BrowserRouter>
  </div>

  );
}

export default App;
