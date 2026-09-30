const OPENINTERN_API =
    "https://openintern.dev/api/v1/jobs?role=software,frontend,backend,fullstack,ml&limit=20";

async function fetchOpenInternJobs() {
    const response = await fetch(OPENINTERN_API);

    if (!response.ok) {
        throw new Error(`OpenIntern API error: ${response.status}`);
    }

    const data = await response.json();

    return data.jobs || [];
}

function normalizeOpenInternJobs(jobs) {
    return jobs.flatMap((job) => {
        return (job.postings || []).map((posting) => ({
            title: posting.title || job.title || "Internship",
            company: job.company?.name || "Unknown Company",

            department: "Software / IT",

            location: posting.location || "Not specified",

            mode: "Not specified",

            stipend: "Not specified",

            duration: "Not specified",

            description:
                posting.title || job.title || "Internship opportunity",

            apply_link: posting.apply_url || "",

            source: "OpenIntern",

            verified: 0
        }));
    });
}

module.exports = {
    fetchOpenInternJobs,
    normalizeOpenInternJobs
};