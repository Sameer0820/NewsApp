import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const pageSize = 10;
  const apiKey = process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(10)
  return (
    <div>
      <Router>
        <Navbar />
        <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}
        />
        <Routes>
          <Route exact path="/" element={<News apiKey={apiKey} setProgress={setProgress} key="general" pageSize={pageSize} country='us' category="general" />}></Route>
          <Route exact path="/business" element={<News apiKey={apiKey} setProgress={setProgress} key="business" pageSize={pageSize} country='us' category="business" />}></Route>
          <Route exact path="/entertainment" element={<News apiKey={apiKey} setProgress={setProgress} key="entertainment" pageSize={pageSize} country='us' category="entertainment" />}></Route>
          <Route exact path="/general" element={<News apiKey={apiKey} setProgress={setProgress} key="general" pageSize={pageSize} country='us' category="general" />}></Route>
          <Route exact path="/health" element={<News apiKey={apiKey} setProgress={setProgress} key="health" pageSize={pageSize} country='us' category="health" />}></Route>
          <Route exact path="/science" element={<News apiKey={apiKey} setProgress={setProgress} key="science" pageSize={pageSize} country='us' category="science" />}></Route>
          <Route exact path="/sports" element={<News apiKey={apiKey} setProgress={setProgress} key="sports" pageSize={pageSize} country='us' category="sports" />}></Route>
          <Route exact path="/technology" element={<News apiKey={apiKey} setProgress={setProgress} key="technology" pageSize={pageSize} country='us' category="technology" />}></Route>
        </Routes>
      </Router>
    </div>
  )
}
export default App 