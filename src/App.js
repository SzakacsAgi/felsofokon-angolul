import './App.css';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header/Header";

import HeaderContextProvider from "./store/header-context.jsx";
import Home from "./components/Home.jsx";
import Prices from "./components/Prices.jsx";
import AboutMe from "./components/AboutMe.jsx";
import Services from "./components/Services.jsx";
import Contact from "./components/Contact.jsx";
import Blog from "./components/Blog.jsx";
import ServiceDetails from "./components/ServiceDetails.jsx";

function App() {
  return (
      <Router>
        <HeaderContextProvider>
          <Header/>
          <Routes>
            <Route path="/home" element={<Home/>}/>
            <Route path="/prices" element={<Prices/>}/>
            <Route path="/about" element={<AboutMe/>}/>
            <Route path="/services" element={<Services/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/blog" element={<Blog/>}/>
            <Route path="/general-english-lesson" element={<ServiceDetails/>}/>
            <Route path="/matura-examination" element={<ServiceDetails/>}/>
            <Route path="/translation" element={<ServiceDetails/>}/>
          </Routes>
        </HeaderContextProvider>
      </Router>
  );
}

export default App;
