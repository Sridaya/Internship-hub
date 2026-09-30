import { useEffect, useState } from "react";
import "./MyApplications.css";

function Myapplications(){
    const [applications,setApplications]=useState([]);

    useEffect(()=>{

       const user = JSON.parse(localStorage.getItem("user"));
       fetch(`http://localhost:4000/api/applications/${user.id}`)
       .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch internships");
                }

                return response.json();
            })
        .then((data)=>{
            setApplications(data);
        })
    },[]);

    return (
    <div className="applications-page">

        <h1>My Applications</h1>

        <div className="applications-container">

            {applications.map((application) => (

                <div className="application-card" key={application.id}>

                    <h3>{application.title}</h3>

                    <p>{application.company}</p>

                    <p>📍 {application.location}</p>

                    <p>📌 {application.status}</p>

                    <p>📅 {application.applied_at}</p>

                </div>

            ))}

        </div>

    </div>
);
}

export default Myapplications;