import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import CreateMovie from './pages/CreateMovie';
import EditMovie from './pages/EditMovie';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Routes>
          <Route path="/signup" element={<SignUp />} /> 
          <Route path="/signin" element={<SignIn />} />
          {/* <Route path="/" element={<SignUp />} /> */}
          <Route path="/Home" element={<Home />} />
          <Route path="/create-movie" element={<CreateMovie />} />
          <Route path="/edit-movie/:id" element={<EditMovie />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
