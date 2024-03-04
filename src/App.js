import './App.css';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import HeaderContextProvider from "./store/header-context.jsx";

import Header from "./components/Header/Header";
import MainContent from "./components/MainContent";

function App() {
  return (
      <Router>
          <HeaderContextProvider>
            <Header/>
            <Routes>
              <Route path="/home" element={<MainContent/>}/>
              <Route path="/" element={<MainContent/>}/>
              <Route path="/prices" element={<MainContent/>}/>
              <Route path="/about" element={<MainContent/>}/>
              <Route path="/services" element={<MainContent/>}/>
              <Route path="/contact" element={<MainContent/>}/>
              <Route path="/blog" element={<MainContent/>}/>
              <Route path="/general-english-lesson" element={<MainContent/>}/>
              <Route path="/matura-examination" element={<MainContent/>}/>
              <Route path="/translation" element={<MainContent/>}/>
            </Routes>
          </HeaderContextProvider>
      </Router>
  );
}

export default App;
