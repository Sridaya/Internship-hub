import { Link } from 'react-router-dom';
import "./Landing.css";

function Landing(){
     return (
       <div className="land">
         <h1>Welcome to Internship Hub 👋</h1>
         <div className="buttons">
           <button>
             <Link to="/login">Login</Link>
           </button>
           <button>
             <Link to="/register">Register</Link>
           </button>
         </div>
       </div>
     );
}

export default Landing