import "./VerifyInternship.css";

function VerifyInternship() {
    return (
        <div className="verify-page">
            <h1>🔍 Verify Internship</h1>

            <p className="verify-description">
                Check an internship for potential warning signs
                before applying.
            </p>

            <div className="verify-form">
                <h2>Internship Details</h2>

                <label>Company Name</label>
                <input
                    type="text"
                    placeholder="Enter company name"
                />

                <label>Internship Title</label>
                <input
                    type="text"
                    placeholder="e.g. Software Developer Intern"
                />

                <label>Application Link</label>
                <input
                    type="url"
                    placeholder="https://example.com/careers"
                />

                <button>Verify Internship</button>
            </div>
        </div>
    );
}

export default VerifyInternship;
