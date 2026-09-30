import "./InternshipCard.css";

function InternshipCard(props){

    function handleSave(){
        const saved =localStorage.getItem("savedInternships");
        const savedList=saved==null ? []:JSON.parse(saved);
        savedList.push(props.internship);
        localStorage.setItem("savedInternships",JSON.stringify(savedList));
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
      </div>
    );
}

export default InternshipCard