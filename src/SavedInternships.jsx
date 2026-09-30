import InternshipCard from "./InternshipCard";
import { useState } from "react";
import Sidebar from "./Sidebar";
import "./SavedInternships.css";

function SavedInternships(){

   const saved = localStorage.getItem("savedInternships");
   const [savedList,setSavedList]=useState(saved == null ? [] : JSON.parse(saved));

    function handleRemove(detail) {
       const updatedList = savedList.filter(item=>item.title !== detail.title);
       setSavedList(updatedList);
       localStorage.setItem("savedInternships",JSON.stringify(updatedList));
    }

    return (
      <div className="full">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="home">
          <h1>Saved Internships ❤️</h1>

          {savedList.length === 0 && <h4>No internships saved yet📭</h4>}
          {savedList.map((detail) => (
            <InternshipCard
              key={detail.title}
              title={detail.title}
              company={detail.company}
              department={detail.department}
              loc={detail.loc}
              mode={detail.mode}
              stipend={detail.stipend}
              duration={detail.duration}
              view={detail.view}
              internship={detail}
              onRemove={handleRemove}
            />
          ))}
        </div>
      </div>
    );
}

export default SavedInternships