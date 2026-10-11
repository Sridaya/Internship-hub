import "./VerifyInternship.css";
import { useState } from "react";

function VerifyInternship() {

    const [companyName, setCompanyName] = useState("");
    const [internshipTitle, setInternshipTitle] = useState("");
    const [applicationLink, setApplicationLink] = useState("");

    const handleVerify = () => {
    if (!companyName.trim() || !internshipTitle.trim() || !applicationLink.trim()) {
        alert("Please fill in all fields");
        return;
    }

    try {
    const url = new URL(applicationLink);

    if (url.protocol !== "https:" && url.protocol !== "http:") {
        alert("Please enter a valid HTTP or HTTPS link");
        return;
    }
} catch {
    alert("Please enter a valid application URL");
    return;
}

const warnings = [];

if (/registration fee|pay to apply|security deposit/i.test(internshipTitle)) {
    warnings.push("The internship title mentions a possible payment requirement.");
}

if (/registration fee|pay to apply|security deposit/i.test(companyName)) {
    warnings.push("The company name contains wording related to payment.");
}

if (warnings.length > 0) {
    alert("⚠️ Potential warning signs:\n\n" + warnings.join("\n"));
} else {
    alert("No obvious warning signs found in the entered details.");
}

    alert("Internship details submitted for verification!");
};

    return (
        <div className="verify-page">
            <h1>🔍 Verify Internship</h1>

            <p className="verify-description">
                Check an internship for potential warning signs
                before applying.
            </p>

            <div className="verify-form">
                <h2>Internship Details</h2>

                <input
    type="text"
    placeholder="Enter company name"
    value={companyName}
    onChange={(e) => setCompanyName(e.target.value)}
/>

                <label>Internship Title</label>
                <input
                    type="text"
                    placeholder="e.g. Software Developer Intern"
                    value={internshipTitle}
                    onChange={(e)=>setInternshipTitle(e.target.value)}
                />

                <label>Application Link</label>
                <input
                    type="url"
                    placeholder="https://example.com/careers"
                    value={applicationLink}
                    onChange={(e)=>setApplicationLink(e.target.value)}
                />

                <button onClick={handleVerify}>Verify Internship</button>
            </div>
        </div>
    );
}

export default VerifyInternship;
