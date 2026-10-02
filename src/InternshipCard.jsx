import "./InternshipCard.css";
import { useState } from "react";

function InternshipCard(props){

   const [applied, setApplied] = useState(
     props.appliedIds.includes(props.internship.id)
   );

    function handleSave(){
        const saved =localStorage.getItem("savedInternships");
        const savedList=saved==null ? []:JSON.parse(saved);
        savedList.push(props.internship);
        localStorage.setItem("savedInternships",JSON.stringify(savedList));
    }

    async function handleApply() {

    const user = JSON.parse(localStorage.getItem("user"));

    const response = await fetch(
        "http://localhost:4000/api/applications",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: user.id,
                internship_id: props.internship.id
            })
        }
    );

    const data = await response.json();

    if (response.ok) {
        setApplied(true);
        window.open(props.internship.apply_link, "_blank");
    } else {
        alert(data.message);
    }
}
    return (
      <div className="Card">
        <h3>{props.title}</h3>
        <h4>{props.company}</h4>
        <p>🎓 {props.department}</p>
        <p>📍 {props.loc}</p>
        <p>💻 {props.mode}</p>
        <p>💰 {props.stipend}</p>
        <p>⏳ {props.duration}</p>
        <button
          className="view"
          onClick={() => window.open(props.internship.apply_link, "_blank")}
        >
          {props.view}
        </button>
        {props.save && (
          <button className="Save" onClick={handleSave}>
            {props.save}
          </button>
        )}
        {props.onRemove && (
          <button
            className="Save"
            onClick={() => props.onRemove(props.internship)}
          >
            Remove
          </button>
        )}
        <button
          className="Apply"
          onClick={handleApply}
          disabled={applied}
      >
          {applied ? "✓ Applied" : "Apply"}
      </button>
      </div>
    );
}

export default InternshipCard