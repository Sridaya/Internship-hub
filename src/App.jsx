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
import ThemeLayout from "./ThemeLayout";

function App(){

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    return(
        <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route element={isLoggedIn ? <ThemeLayout /> : <Navigate to="/login" />}>
    <Route path="/home" element={<Home />} />
    <Route path="/savedinternships" element={<SavedInternships />} />
    <Route path="/Myapplications" element={<Myapplications />} />
    <Route path="/Settings" element={<Settings />} />
</Route>
            <Route path="/" element={<Landing />} />
            <Route path="/forgot-password" element={<ForgotPassword />}/>
            <Route path="/reset-password/:token" element={<ResetPassword />}/>
        </Routes>
    )
}

export default App