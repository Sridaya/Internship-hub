import Login from "./Login"
import Register from "./Register"
import Home from "./Home"
import SavedInternships from "./SavedInternships"
import { Routes,Route,Navigate } from "react-router-dom"
import Landing from './Landing';
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword"
import Myapplications from "./MyApplications";
import Settings from "./Settings"

function App(){

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    return(
        <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route
                path="/home"
                element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
            />
            <Route
                path="/savedinternships"
                element={isLoggedIn ? <SavedInternships /> : <Navigate to="/login" />}
            />
            <Route
                path="/Myapplications"
                element={isLoggedIn ? <Myapplications /> : <Navigate to="/login" />}
            />
             <Route
                path="/Settings"
                element={isLoggedIn ? <Settings /> : <Navigate to="/login" />}
            />
            <Route path="/" element={<Landing />} />
            <Route path="/forgot-password" element={<ForgotPassword />}/>
            <Route path="/reset-password/:token" element={<ResetPassword />}/>
        </Routes>
    )
}

export default App