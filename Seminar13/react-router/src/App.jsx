import { Routes, Route, Navigate, Outlet } from 'react-router'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import FAQ from './pages/FAQ'
import NotFound from './pages/NotFound'

function App() {

  let auth = { isLoggedIn: true };


  return (

    auth.isLoggedIn ?

      <div className="App">
        <Navbar />

        <main style={{ padding: "2rem" }}>
          <h2>Current Page Content:</h2>

          <Outlet />

          {/* <Routes>
          <Route path="/" element={<Navigate to="/home" />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/faq" element={<FAQ />}></Route>
          <Route path="/*" element={<NotFound />}></Route>
        </Routes> */}

        </main>
      </div > :
      <div>
        Not authorized
      </div>
  )
}

export default App
