import './App.css';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import HeaderContextProvider from "./store/header-context";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer/Footer";
import ScrollToTopButton from './components/ScrollToTopButton';

function App() {
  return (
      <Router>
        <HeaderContextProvider>
          <Header/>
            <Routes>
              <Route path="/home" element={<MainContent key='/home/'/>}/>
              <Route path="/" element={<MainContent key='/'/>}/>
              <Route path="/prices" element={<MainContent key='/prices/'/>}/>
              <Route path="/about" element={<MainContent key='/about/'/>}/>
              <Route path="/services" element={<MainContent key='/services/'/>}/>
              <Route path="/contact" element={<MainContent  key='/contact/'/>}/>
              <Route path="/blog" element={<MainContent key='/blog/'/>}/>
              <Route path="/general-english-lesson" element={<MainContent key='/general-english-lesson/'/>}/>
              <Route path="/matura-examination" element={<MainContent key='/matura-examination/'/>}/>
              <Route path="/translation" element={<MainContent key='/translation/'/>}/>
              <Route path="*" element={<MainContent key='/*/'/>}/>
            </Routes>
            <ScrollToTopButton/>
          <Footer/>
        </HeaderContextProvider>
      </Router>
  );
}

export default App;
