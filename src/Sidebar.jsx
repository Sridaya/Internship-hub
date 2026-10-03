import { Link,useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar(){

    const navigate = useNavigate();

    function handleLogout(){
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
    }   
    
    return(
        <div className="sidebar">
            <h2>Internship Hub🏢</h2>
            <p><Link to='/home' className='link'>🏠 Home</Link></p>
            <p><Link to="/savedinternships" className='link'>❤️ Saved Internships</Link></p>
            <p><Link to="/Myapplications" className='link'>📋 My Applications</Link></p>
            <p>🛡️ Verify Internship</p>
            <p><Link to="/Settings" className='link'>⚙️ Settings</Link></p>
            <p onClick={handleLogout}>🚪 Logout</p>
        </div>
    )
}

export default Sidebar