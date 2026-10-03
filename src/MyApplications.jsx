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
          {applications.length === 0 ? (
            <p className="noapp">No applications yet.</p>
          ) : (
            applications.map((application) => (
              <div className="application-card" key={application.id}>
                <h3>{application.title}</h3>
                <p>{application.company}</p>
                <p>📍 {application.location}</p>
                <p>📌 {application.status}</p>
                <p>
                    📅 Applied on: {
                        application.applied_at
                            ? new Date(application.applied_at).toLocaleDateString()
                            : "Date unavailable"
                    }
                </p>
                <button
                    onClick={() => window.open(application.apply_link, "_blank")} className="Save"
                >
                    View Application
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    );
}

export default Myapplications;