import "./VerifyInternship.css";
import { useState } from "react";

function VerifyInternship() {

    const [companyName, setCompanyName] = useState("");
    const [internshipTitle, setInternshipTitle] = useState("");
    const [applicationLink, setApplicationLink] = useState("");
    const [verificationResult, setVerificationResult] = useState(null);

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

try {
    const url = new URL(applicationLink);
    const hostname = url.hostname.toLowerCase();

    const suspiciousHosts = [
        "bit.ly",
        "tinyurl.com",
        "t.co"
    ];

    if (
        suspiciousHosts.some(
            (host) => hostname === host || hostname.endsWith("." + host)
        )
    ) {
        warnings.push(
            "This is a URL-shortening link. Check the final destination before applying."
        );
    }
} catch {
    // URL validation already handles invalid links.
}

if (/registration fee|pay to apply|security deposit/i.test(internshipTitle)) {
    warnings.push("The internship title mentions a possible payment requirement.");
}

if (/registration fee|pay to apply|security deposit/i.test(companyName)) {
    warnings.push("The company name contains wording related to payment.");
}

if (warnings.length > 0) {
    setVerificationResult({
        status: "warning",
        message: "Potential warning signs found.",
        warnings: warnings
    });
} else {
    setVerificationResult({
        status: "clear",
        message: "No obvious warning signs found.",
        warnings: []
    });
}
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
            {verificationResult && (
    <div className={`verification-result ${verificationResult.status}`}>
        <h2>
            {verificationResult.status === "warning"
                ? "⚠️ Warning Signs Found"
                : "✅ No Obvious Warning Signs"}
        </h2>

        <p>{verificationResult.message}</p>

        {verificationResult.warnings.map((warning, index) => (
            <p key={index}>• {warning}</p>
        ))}

        <small>
            This is a preliminary check, not proof that an internship is
            genuine or fraudulent.
        </small>
    </div>
)}
        </div>
    );
}

export default VerifyInternship;
